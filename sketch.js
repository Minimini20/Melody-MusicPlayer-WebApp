

function setup() {
    let canvas = createCanvas(210, 300);
    let a = $(".sketch-container")[0];
    canvas.parent(a);
    angleMode(DEGREES);
  }

  
  function draw() {
    translate(100, 150);
    rotate(-90);
    fill(40);
    noStroke();
    circle(0,0,200);
    let hr = hour();
    let mn = minute();
    let sc = second();
  
    strokeWeight(3);
    stroke(135,206,250);
    noFill();
    let secondAngle = map(sc, 0, 60, 0, 360);
    arc(0, 0, 197, 197, 0, secondAngle);
  
    stroke(255, 100, 150);
    let minuteAngle = map(mn, 0, 60, 0, 360);
    arc(0, 0, 183, 183, 0, minuteAngle);
  
    stroke(150, 255, 100);
    let hourAngle = map(hr % 12, 0, 12, 0, 360);
    arc(0, 0, 170, 170, 0, hourAngle);
  
    push();
    rotate(secondAngle);
    stroke(135,206,250);
    line(0, 0, 75, 0);
    pop();
  
    push();
    rotate(minuteAngle);
    stroke(255, 100, 150);
    line(0, 0, 55, 0);
    pop();
  
    push();
    rotate(hourAngle);
    stroke(150, 255, 100);
    line(0, 0, 40, 0);
    pop();
  
    stroke(255);
    point(0, 0);
  
    //  fill(255);
    //  noStroke();
    //  text(hr + ':' + mn + ':' + sc, 10, 200);
  }