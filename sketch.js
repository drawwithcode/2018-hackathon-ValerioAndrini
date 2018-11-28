var mySong;
var analyzer;
var myImage;
var lightning;
var lightning2;
var rot;

function preload() {
  mySong = loadSound("./assets/the_flash_theme.mp3");
  myImage = loadImage("./assets/flash.png");
  lightning = loadImage("./assets/effect.png");
  lightning2 = loadImage("./assets/effect2.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong);
}

function draw() {
  background(225, 71, 73);

  var volume = 0;
  if (mouseX > width / 2) {
    if (mySong.isPlaying() == false) {
      mySong.play();
    }
    volume = analyzer.getLevel();
    volume = map(volume, 0, 1, 0, height);
  } else {
    mySong.pause();
  }

  if (volume > 220) {
    image(lightning, random(0, width), random(0, height), lightning.width, lightning.height);
    image(lightning2, random(0, width), random(0, height), lightning2.width, lightning2.height);
  }

  noStroke();
  fill(0, 0, 0, 30)
  rect(width / 2, 0, width / 2, height);

  if (mySong.isPlaying()) {
    push();
    translate(width / 2, height / 2);
    rotate(frameCount / 180);
    rot = frameCount / 180;
    imageMode(CENTER);
    image(myImage, 0, 0, myImage.width + volume / 2, myImage.height + volume / 2);
    pop();
  } else {
    push();
    translate(width / 2, height / 2);
    rotate(rot);
    imageMode(CENTER);
    image(myImage, 0, 0, myImage.width + volume / 2, myImage.height + volume / 2);
    pop();
  }

  push();
  fill('white');
  textStyle(BOLD);
  text('Pause', width / 2 - 45, height - 20);
  text('Play', width / 2 + 10, height - 20);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
