let bubbles = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    background("#130a20");
    console.log('%c What are you looking for? ', 'background: #391e61; color: #ffffff');

    for (let i = 0; i < 750; i++) {
        let bubble = new Bubble(random(10, width - 10), random(0, height - 10), random(1, 10));
        bubbles.push(bubble);
    }

}

function mousePressed() {
    glitch = (glitch) ? false : true;
}

function draw() {
    background("#130a20");

    bubbles.forEach(bubble => {
        bubble.move();
        bubble.draw();
    });
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

class Bubble {
    constructor(x, y, size) {
        this.pos = createVector(x, y);
        this.size = size;
        this.speed = random(3, 8);
        let colors = ["#7742c5", "#572e95", "#391e61"];
        this.color = random(colors);
        this.angle = 0;

        this.scalar = random(10, 30);
        this.angleRate = random(0.05, 0.5);
    }

    move() {
        this.pos.y -= this.speed;
        if (this.pos.y + this.size / 2 < 0) {
            this.pos.y = height + this.size;
            this.pos.x = random(0, width - 10);
            this.speed = random(3, 8);
            this.size = random(1, 10);

            this.scalar = random(0, 30);
            this.angleRate = random(0.05, 0.1);
            this.angle = this.angleRate;

        }

        this.pos.x = (this.pos.x + this.scalar * (cos(this.angle) * 0.3));

        if (this.angle >= 359) {
            this.angle = 0;
        } else {
            this.angle += this.angleRate;
        }
    }

    draw() {
        fill(this.color);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }
}

class ShootingStar {
    constructor(x, y, size) {
        this.pos = createVector(x, y);
        this.speed = random(80, 200);
        this.color = "#ffffff";
        this.range = random(10, 300);
        this.size = size;
    }

    draw() {
        stroke(this.color);
        strokeWeight(this.size);
        line(this.pos.x - this.range, this.pos.y, this.pos.x, this.pos.y);
    }

    move() {
        this.pos.x += this.speed;
    }

}


// class Planet {
//     constructor(x, y, size) {
//         this.pos = createVector(x, y);
//         this.size = size;
//         this.speed = random(1, 2);
//         let colors = ["#090507", "#090004", "#0E1212", "#101712"];
//         this.color = random(colors);
//     }

//     move() {
//         this.pos.x += this.speed;
//     }

//     draw() {
//         fill(this.color);
//         noStroke();
//         ellipse(this.pos.x, this.pos.y, this.size, this.size);
//     }
// }