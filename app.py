from flask import Flask, render_template, request, session, g, redirect, url_for, flash, send_file, abort
from database import get_db, close_db
from forms import RegistrationForm, LoginForm
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from functools import wraps

app = Flask(__name__)
app.teardown_appcontext(close_db)
app.config["SECRET_KEY"] = "Masood2024"
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"



@app.before_request
def load_logged_in_user():
    g.user = session.get("user_id", None)


@app.route("/register", methods=["GET", "POST"])
def register():
    form = RegistrationForm()
    
    if form.validate_on_submit():
        user_id = form.user_id.data
        password = form.password.data
        password2 = form.password2.data
        db = get_db()
        
        conflict_user = db.execute("SELECT * FROM users WHERE user_id = ?", (user_id,)).fetchone()
        
        if conflict_user is not None:
            form.user_id.errors.append("Username already taken!!")
        else:
            db.execute("INSERT INTO users (user_id, password) VALUES (?, ?)", (user_id, generate_password_hash(password)))
            db.commit()
            return redirect(url_for("login"))
    
    return render_template("register.html", form=form)



@app.route("/login", methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user_id = form.user_id.data
        password = form.password.data
        
        db = get_db()
        user = db.execute(
            "SELECT * FROM users WHERE user_id = ?;", (user_id,)
        ).fetchone()
        
        if user is None:
            form.user_id.errors.append("No such username!")
        elif not check_password_hash(user["password"], password):
            form.password.errors.append("Incorrect password!")
        else:
            session.clear()
            session["user_id"] = user_id
            next_page = request.args.get("next")
            if not next_page:
                next_page = url_for("index")
            return redirect(next_page)
        
    return render_template("login.html", form=form)

def login_required(view):
    @wraps(view)
    def wrapped_view(*args, **kwargs):
        if g.user is None:
            return redirect(url_for("login", next=request.url))
        return view(*args, **kwargs)
    return wrapped_view

@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("index"))

@app.route('/')
def index():
    return render_template("index.html")