let points_speed_text, autospeedchange_check, countdown_input

let mainColor = 0
let secondColor = 0
let transparent = 0

let D = 140

let count = 5
let speedRatio = 4
let points_speed = [2, 3, 9, 5, 3]
let points_vals = []
let points = []
let circles = []

let spike_point_size = 0.8
let spike_points_dis = 0.5
spikes_len = 600
spike_vals = []

function setup() {
  createCanvas(800, 500);
  transparent = color(0, 0, 0, 0)
  mainColor = color(204, 102, 0)
  secondColor = color(100, 100, 100)
  
  for (let i = 0; i < count; i++) {
    points_vals[i] = 0;
  }
  
  for (let i = 0; i < spikes_len; i++) {
    spike_vals[i] = -1;
  }
  
  background(230);
  ellipse(width /2, height / 2, D, D)
  stroke(color(204, 102, 0))
  fill(transparent)
  
  
  button = createButton('Change Ratio');
  button.position(10, height + 10);
  button.mousePressed(changeRatio);

  points_speed_text = createElement('p', points_speed.toString());
  points_speed_text.position(10, height + 30);

  countdown_input = createInput('400');
  countdown_input.position(310, height + 11);
  
  textAlign(CENTER);
  textSize(50);
  
  autospeedchange_check = createCheckbox('Auto Change Speed', false); 
  autospeedchange_check.position(120, height + 12);
}

function drawCircles(){
  let wHalf = width / 4
  let hHalf = height / 2
  
  stroke(mainColor)
  noFill()
  ellipse(wHalf, hHalf, D, D)
  
  for(let i = 0; i < count; i++)
  {
    let circleSizeRatio = D / pow(2, 1 + i);
    points_vals[i] += points_speed[i] * speedRatio / 100
    
    let pointStart = createVector(wHalf, hHalf)
    if(i > 0){
      pointStart = createVector(circles[i - 1].x, circles[i - 1].y)
    }
    
    pointX = pointStart.x + circleSizeRatio * sin(points_vals[i])
    pointY = pointStart.y + circleSizeRatio * cos(points_vals[i])
    
    points[i] = createVector(pointX, pointY)
    
    let circleCenter = circleSizeRatio + D / pow(2, 2 + i)
    
    let circleStart = createVector(wHalf, hHalf)
    if(i > 0){
      circleStart = createVector(circles[i - 1].x, circles[i - 1].y)
    }
    circles[i] = createVector(circleStart.x + (circleCenter) * sin(points_vals[i]), circleStart.y + (circleCenter) * cos(points_vals[i]))


    fill(mainColor)
    ellipse(points[i].x, points[i].y, 4, 4)
    
    stroke(mainColor)
    noFill()
    let circleRadius = circleSizeRatio
    ellipse(circles[i].x, circles[i].y, circleRadius, circleRadius)
  }
}

function updateSpikeList(){
  
  for (let i = 1; i < spikes_len; i++) {
    spike_vals[i - 1] = spike_vals[i];
  }
  spike_vals[spikes_len - 1] = points[points.length - 1].y
  
  let distance = (width / 2) / spikes_len
  
  stroke(color(160, 160, 160))
  line(points[points.length - 1].x, points[points.length - 1].y, width / 2 + (spikes_len-1) * distance, points[points.length - 1].y)
  
  stroke(secondColor)
  for (let i = 0; i < spikes_len; i++) {
    pX = width / 2 + i * distance;
    pY = spike_vals[i];
    ellipse(pX, pY, spike_point_size,spike_point_size)
    if(i > 0){
      prevX = width / 2 + (i - 1) * distance;
      prevY = spike_vals[i - 1];
      if(prevY != -1)
        line(prevX, prevY, pX, pY)
    }
  }
}

function drawSignal(){
  let wHalf = width / 2
  let hHalf = height / 2
  
  stroke(color(0, 0, 0))
  line(wHalf, 0, wHalf, height)
  fill(secondColor)
  updateSpikeList();
}

function changeRatio(){
  for (let i = 0; i < count; i++) {
    points_speed[i] = round(random(9)) + 1
  }
  
  points_speed_text.html(points_speed.toString())
}

let cd = 0
function countdown(){
  cd += 1
  if(ct > int(countdown_input.value())){
    changeRatio()
    cd = 0
  }
}

function draw() {
  background(220);
  drawCircles();
  drawSignal();
  if(autospeedchange_check.checked())
    countdown();
}
