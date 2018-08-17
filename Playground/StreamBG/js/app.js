let bubbles = [];
let bgColor = "#130a20";
let hTitle;
let hSubtitle;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(bgColor);
  console.log('%c Repository : https://github.com/Re3ker/Re3ker.github.io ', 'color: #ffffff; -webkit-text-stroke: 1px #391e61; font-size: 28px; font-weight: bold;');

  hTitle = document.querySelector('#title');
  hTitle.innerHTML = decodeURI(gup('title'));

  hSubtitle = document.querySelector('#subtitle');
  hSubtitle.innerHTML = decodeURI(gup('subtitle'));

  for (let i = 0; i < 750; i++) {
    let bubble = new Bubble({
      pos: createVector(random(0, width), random(0, height)),
      size: {
        min: 1,
        max: 10
      },
      speed: {
        min: 3,
        max: 8
      },
      scalar: {
        min: 0,
        max: 5
      },
      angleInc: {
        min: 0.01,
        max: 0.1
      },
      colors: ["#7742c5", "#572e95", "#391e61"]
    });

    bubbles.push(bubble);
  }
}

function draw() {
  background(bgColor);

  bubbles.forEach(bubble => {
    bubble.update();
    bubble.draw();
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function gup(name, url) {
  if (!url) url = location.href;
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(url);
  return results == null ? null : results[1];
}

class Bubble {
  constructor(options) {
    this.options = options;
    this.angle = 0;
    this.color = random(this.options.colors);
    this.pos = createVector(this.options.pos.x, this.options.pos.y);
    this.size = random(this.options.size.min, this.options.size.max);
    this.speed = random(this.options.speed.min, this.options.speed.max);
    this.scalar = random(this.options.scalar.min, this.options.scalar.max);
    this.angleInc = random(this.options.angleInc.min, this.options.angleInc.max);
  }

  update() {
    this.pos.y -= this.speed;
    if (this.pos.y + this.size / 2 < 0) {
      this.pos.y = height + this.size;
      this.pos.x = random(0, width - this.size);
      this.speed = random(this.options.speed.min, this.options.speed.max);
      this.size = random(this.options.size.min, this.options.size.max);
      this.scalar = random(this.options.scalar.min, this.options.scalar.max);
      this.angleInc = random(this.options.angleInc.min, this.options.angleInc.max);
      this.angle = this.angleInc;
    }

    this.pos.x = this.pos.x + this.scalar * (cos(this.angle));

    if (this.angle >= 359) {
      this.angle = 0;
    } else {
      this.angle += this.angleInc;
    }
  }

  draw() {
    fill(this.color);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }
}
