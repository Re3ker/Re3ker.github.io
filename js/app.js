let stars = [];
let sStars = [];
// let planets = [];

let glitch = false;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background("#00171F");

    for (let i = 0; i < 1000; i++) {
        let star = new Star(random(10, width - 10), random(0, height - 10), random(1, 10));
        stars.push(star);
    }

}

function mousePressed() {
    glitch = (glitch) ? false : true;
}

function draw() {
    if (!glitch) {
        background("#00171F");
    }

    // if (random(0, 10000) > 9990) {
    //     let pSize = random(100, 500);
    //     let planet = new Planet(-pSize, random(0, height), pSize);
    //     planets.push(planet);
    // }

    // for (let i = 0; i < planets.length; i++) {
    //     planets[i].move();
    //     planets[i].draw();
    //     if (planets[i].pos.x - planets[i].size / 2 > width) {
    //         planets.splice(i, 1);
    //     }
    // }


    if (random(0, 10000) > 9900) {
        sStars.push(new ShootingStar(-10, random(0, height - 10), random(1, 2)));
    }

    for (let i = 0; i < sStars.length; i++) {
        sStars[i].move();
        sStars[i].draw();
        if (sStars[i].pos.x - sStars[i].range > width) {
            sStars.splice(i, 1);
        }
    }

    stars.forEach(star => {
        star.move();
        star.draw();
    });
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

class Star {
    constructor(x, y, size) {
        this.pos = createVector(x, y);
        this.size = size;
        this.speed = random(3, 8);
        let colors = ["#003459", "#007EA7", "#00A8E8"];
        this.color = random(colors);
    }

    move() {
        this.pos.x += this.speed;
        if (this.pos.x + this.size / 2 > width) {
            this.pos.x = -this.size;
            this.pos.y = random(0, height - 10);
            this.speed = random(3, 8);
            this.size = random(1, 10);
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