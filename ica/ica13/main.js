// setup canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Ball {
    constructor(x, y, velX, velY, color, size) {
      this.x = x;
      this.y = y;
      this.velX = velX;
      this.velY = velY;
      this.color = color;
      this.size = size;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }
    // function to move ball aka update its position
    update() {
        // check whether ball has reached edge of canvas, if so, reverse polarity and travel in the opposite direction

        //is the ball going towards right edge?
        if (this.x + this.size >= width) {
          this.velX = -this.velX;
        }
        //is it going to the left edge?
        if (this.x - this.size <= 0) {
          this.velX = -this.velX;
        }
        //is it going off the bottom edge?
        if (this.y + this.size >= height) {
          this.velY = -this.velY;
        }
        //is it going off the top edge?
        if (this.y - this.size <= 0) {
          this.velY = -this.velY;
        }
    
        this.x += this.velX;
        this.y += this.velY;
      }

      /*collisionDetect() {
        for (const ball of balls) {
          if (this !== ball) {
            const dx = this.x - ball.x;
            const dy = this.y - ball.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
    
            if (distance < this.size + ball.size) {
              ball.color = this.color = randomRGB();
            }
          }
        }
      }*/

      collisionDetect() {
        for (const ball of balls) {
          if (this !== ball) {
            const dx = this.x - ball.x;
            const dy = this.y - ball.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
      
            // check if balls are colliding
            if (distance < this.size + ball.size) {
              // calculate direction of collision
              const nx = dx / distance;
              const ny = dy / distance;
              

              const relativeVelX = this.velX - ball.velX;
              const relativeVelY = this.velY - ball.velY;
              

              const normalVelocity = relativeVelX * nx + relativeVelY * ny;

              if (normalVelocity > 0) {
                continue;
              }
              

              const bounce = normalVelocity;
              

              this.velX -= bounce * nx;
              this.velY -= bounce * ny;
              ball.velX += bounce * nx;
              ball.velY += bounce * ny;
            }
          }
        }
      }
    
  }

  const balls = [];

while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size,
)

  balls.push(ball);
}


function loop() {
    ctx.fillStyle = "rgb(0 0 0 / 25%)";
    ctx.fillRect(0, 0, width, height);
  
    for (const ball of balls) {
      ball.draw();
      ball.update();
      ball.collisionDetect();
    }
  
    requestAnimationFrame(loop);
  }

  loop();