// const canvas = document.getElementById("myCanvas");
// const context = canvas.getContext("2d");

// const playerImage = new Image();
// playerImage.src = 'static/player.png';

// const player = {
//     x: 10,
//     y: canvas.height / 2 - 50,
//     xSpeed: 50,
//     ySpeed: 50,
//     size: 100
// };
// let canShoot = true; 

// const bullets = [];

// function draw() {
//     context.clearRect(0, 0, canvas.width, canvas.height);
//     context.fillStyle = 'green';
//     context.fillRect(0, 0, canvas.width, canvas.height);
//     detectCollision();
//     drawPlayer();
//     drawBullets();
// }

// function drawPlayer() {
//     context.drawImage(playerImage, player.x, player.y, player.size, player.size);
// }

// function movePlayer(event) {
//     switch (event.key) {
//         case 'ArrowUp':
//             player.y -= player.ySpeed;
//             break;
//         case 'ArrowDown':
//             player.y += player.ySpeed;
//             break;
//         case 'ArrowLeft':
//             player.x -= player.xSpeed;
//             break;
//         case 'ArrowRight':
//             player.x += player.xSpeed;
//             break;
//     }
// }

// function drawBullets() {
//     bullets.forEach((bullet, index) => {
//         context.fillStyle = 'black';
//         context.fillRect(bullet.x, bullet.y, bullet.size, bullet.size);
//         bullet.x += 5;
//         if (bullet.x > canvas.width) {
//             bullets.splice(index, 1);
//         }
//     });
// }

// function shootBullet() {
//     if (!canShoot) return;

//     const bullet = {
//         x: player.x + player.size,
//         y: player.y + player.size / 2 - 10, 
//         size: 20,
//     };
//     bullets.push(bullet);
//     canShoot = false;
//     setTimeout(() => {
//         canShoot = true;
//     }, 250);
// }

// function detectCollision() {
//     if (player.x <= 0) {
//         player.x = 0;
//     }
//     if (player.x >= canvas.width - player.size) {
//         player.x = canvas.width - player.size;
//     }
//     if (player.y <= 0) {
//         player.y = 0;
//     }
//     if (player.y >= canvas.height - player.size) {
//         player.y = canvas.height - player.size;
//     }
// }

// document.addEventListener('keydown', function (event) {
//     if (event.code === 'Space') {
//         shootBullet();
//     } else {
//         movePlayer(event);
//     }
// });


// const zombieImage = new Image();
// zombieImage.src = 'static/zombie.png';

// const zombies = [];

// function spawnZombie() {
//     const zombie = {
//         x: Math.random() * canvas.width, 
//         y: -50,
//         size: 80,
//         speed: 1,
//     };
//     zombies.push(zombie);
// }

// function draw() {
//     context.clearRect(0, 0, canvas.width, canvas.height);
//     context.fillStyle = 'green';
//     context.fillRect(0, 0, canvas.width, canvas.height);
//     detectCollision();
//     drawPlayer();
//     drawBullets();
//     drawZombies();
// }

// function drawZombies() {
//     zombies.forEach(zombie => {
//         context.drawImage(zombieImage, zombie.x, zombie.y, zombie.size, zombie.size);
//         moveZombie(zombie);
//         checkBulletZombieCollision(zombie);
//     });
// }

// function moveZombie(zombie) {
//     if (zombie.x < player.x) {
//         zombie.x += zombie.speed;
//     } else if (zombie.x > player.x) {
//         zombie.x -= zombie.speed;
//     }

//     if (zombie.y < player.y) {
//         zombie.y += zombie.speed;
//     } else if (zombie.y > player.y) {
//         zombie.y -= zombie.speed;
//     }

//     if (Math.abs(zombie.x - player.x) < zombie.size && Math.abs(zombie.y - player.y) < zombie.size) {
//         gameOver();
//     }
// }

// function checkBulletZombieCollision(zombie) {
//     bullets.forEach((bullet, bulletIndex) => {
//         if (bullet.x < zombie.x + zombie.size &&
//             bullet.x + bullet.size > zombie.x &&
//             bullet.y < zombie.y + zombie.size &&
//             bullet.y + bullet.size > zombie.y) {
//             bullets.splice(bulletIndex, 1);
//             zombies.splice(zombies.indexOf(zombie), 1);
//         }
//     });
// }

// function gameOver() {
//     alert("Game Over!");
//     document.location.reload();
// }

// setInterval(spawnZombie, 4000);


// function startGame() {
//     setInterval(draw, 10);
// }

// startGame();

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById("myCanvas");
    const context = canvas.getContext("2d");

    const playerImageRight = new Image();
    const playerImageLeft = new Image();
    const playerImageUp = new Image();
    const playerImageDown = new Image();
    const zombieImage = new Image();

    playerImageRight.src = 'static/playerright.png';
    playerImageLeft.src = 'static/playerleft.png';
    playerImageUp.src = 'static/playerup.png';
    playerImageDown.src = 'static/playerdown.png';
    zombieImage.src = 'static/zombie.png';

    let player = {
        x: 10,
        y: canvas.height / 2 - 50,
        xSpeed: 50,
        ySpeed: 50,
        size: 100,
        currentImage: playerImageRight, // Default player image
        direction: 'right' // Initial direction
    };

    let canShoot = true;
    const bullets = [];
    const zombies = [];

    let imagesLoaded = 0;
    const totalImages = 5;
    [playerImageRight, playerImageLeft, playerImageUp, playerImageDown, zombieImage].forEach(img => {
        img.onload = () => {
            imagesLoaded++;
            if (imagesLoaded === totalImages) {
                startGame();
            }
        };
    });

    function detectCollision() {
        if (player.x <= 0) {
            player.x = 0;
        }
        if (player.x >= canvas.width - player.size) {
            player.x = canvas.width - player.size;
        }
        if (player.y <= 0) {
            player.y = 0;
        }
        if (player.y >= canvas.height - player.size) {
            player.y = canvas.height - player.size;
        }
    }
    
    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = 'green';
        context.fillRect(0, 0, canvas.width, canvas.height);
        detectCollision();
        drawPlayer();
        drawBullets();
        drawZombies();
    }

    function drawPlayer() {
        context.drawImage(player.currentImage, player.x, player.y, player.size, player.size);
    }

    function movePlayer(event) {
        switch (event.key) {
            case 'ArrowUp':
                player.y -= player.ySpeed;
                player.currentImage = playerImageUp;
                player.direction = 'up';
                break;
            case 'ArrowDown':
                player.y += player.ySpeed;
                player.currentImage = playerImageDown;
                player.direction = 'down';
                break;
            case 'ArrowLeft':
                player.x -= player.xSpeed;
                player.currentImage = playerImageLeft;
                player.direction = 'left';
                break;
            case 'ArrowRight':
                player.x += player.xSpeed;
                player.currentImage = playerImageRight;
                player.direction = 'right';
                break;
        }
    }

    function drawBullets() {
        bullets.forEach((bullet, index) => {
            context.fillStyle = 'black';
            // Increase the dimensions of the bullet rectangle
            context.fillRect(bullet.x, bullet.y, bullet.size * 2, bullet.size * 2);
            // Move bullet based on its initial direction
            switch(bullet.direction) {
                case 'up':
                    bullet.y -= 5;
                    break;
                case 'down':
                    bullet.y += 5;
                    break;
                case 'left':
                    bullet.x -= 5;
                    break;
                case 'right':
                    bullet.x += 5;
                    break;
            }
            // Remove the bullet if it goes off screen
            if (bullet.x < 0 || bullet.x > canvas.width || bullet.y < 0 || bullet.y > canvas.height) {
                bullets.splice(index, 1);
            }
        });
    }
    

    function shootBullet() {
        if (!canShoot) return; 
        const bullet = {
            x: player.x + player.size / 2, // Start from center of the player
            y: player.y + player.size / 2,
            size: 10,
            direction: player.direction // Store the direction the player is facing when shooting
        };
        bullets.push(bullet);
    
        canShoot = false; 
        setTimeout(() => {
            canShoot = true; 
        }, 250); 
    }

    function spawnZombie() {
        const zombie = {
            x: Math.random() * canvas.width, // Random horizontal position
            y: -50, // Start just above the canvas
            size: 80,
            speed: 1,
        };
        zombies.push(zombie);
    }

    function drawZombies() {
        zombies.forEach(zombie => {
            context.drawImage(zombieImage, zombie.x, zombie.y, zombie.size, zombie.size);
            moveZombie(zombie);
            checkBulletZombieCollision(zombie);
        });
    }

    function moveZombie(zombie) {
        // Basic AI for zombie to chase player
        if (zombie.x < player.x) {
            zombie.x += zombie.speed;
        } else if (zombie.x > player.x) {
            zombie.x -= zombie.speed;
        }
    
        if (zombie.y < player.y) {
            zombie.y += zombie.speed;
        } else if (zombie.y > player.y) {
            zombie.y -= zombie.speed;
        }
    
        // Check if zombie catches the player
        if (Math.abs(zombie.x - player.x) < zombie.size && Math.abs(zombie.y - player.y) < zombie.size) {
            gameOver(); // End game if zombie touches the player
        }
    
        // Ensure zombies don't move off-screen
        if (zombie.x < 0) {
            zombie.x = 0;
        } else if (zombie.x > canvas.width - zombie.size) {
            zombie.x = canvas.width - zombie.size;
        }
    
        if (zombie.y < 0) {
            zombie.y = 0;
        } else if (zombie.y > canvas.height - zombie.size) {
            zombie.y = canvas.height - zombie.size;
        }
    }
    
    
    

    function checkBulletZombieCollision(zombie) {
        bullets.forEach((bullet, bulletIndex) => {
            if (bullet.x < zombie.x + zombie.size &&
                bullet.x + bullet.size > zombie.x &&
                bullet.y < zombie.y + zombie.size &&
                bullet.y + bullet.size > zombie.y) {
                // Remove bullet and zombie
                bullets.splice(bulletIndex, 1);
                zombies.splice(zombies.indexOf(zombie), 1);
            }
        });
    }

    function gameOver() {
        alert("Game Over!");
    
        // Reduce the distance between zombie and player
        zombies.forEach(zombie => {
            // Calculate the direction from zombie to player
            const dx = player.x - zombie.x;
            const dy = player.y - zombie.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
    
            // Move the zombie closer to the player by a certain factor (e.g., half the distance)
            const factor = 0.5;
            zombie.x += dx * factor;
            zombie.y += dy * factor;
        });
    
        // Reload the game or reset the player position, etc.
        document.location.reload();
    }
    

    setInterval(spawnZombie, 4000);

    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space') {
            shootBullet();
        } else {
            movePlayer(event);
        }
    });

    function startGame() {
        setInterval(draw, 10);
    }

    startGame();
});