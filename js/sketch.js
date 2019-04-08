let canvas;
let canvas_size = [1000, 350];

// Variables to control timing events
let sketchRunning = false;
let sketchStartTime;
let waitInterval;
let d_waitInterval; // Rate of change of waitInterval
let lastArrowUpdateTime;

let tSize;
let tListStart;

let items = [];

// Object to encapsulate the arrow pointer
// The length of the arrow is given an initial value
// but it will be scaled later based on the text size
let arrow = {
  head: new Array(2),
  len: 200,

  // Current item pointing to (index)
  itemRef: 0,

  draw: function()
  {
    stroke (255);
    line (arrow.head[0], arrow.head[1], arrow.head[0] + arrow.len, arrow.head[1]);
    line (arrow.head[0], arrow.head[1], arrow.head[0]+arrow.len/10, arrow.head[1]+arrow.len/10);
    line (arrow.head[0], arrow.head[1], arrow.head[0]+arrow.len/10, arrow.head[1]-arrow.len/10);
  },

  update: function()
  {
    if (arrow.itemRef == items.length-1)
    {
      arrow.itemRef = 0;
    }
    else
    {
      arrow.itemRef++;
    }
    arrow.head = [tListStart[0] + getMaxWidth(items) + 20, tListStart[1] + arrow.itemRef*tSize + tSize/2];
    lastArrowUpdateTime = millis();
  }
};

function setup()
{
  canvas = createCanvas(canvas_size[0], canvas_size[1]);
  canvas.parent('sketch');
  frameRate(60);

  resetSketch();
  noLoop();
}

function draw()
{
  background(0);

  fill (255);
  items.forEach(function (e, i) {text (e, tListStart[0], tListStart[1] + i*tSize)});

  if (waitInterval > 550)
  {
    sketchRunning = false;
    endMessage();
    noLoop();
  }

  arrow.draw();

  // The non-blocking sleep/wait solution is this:
  // 1) Every time the arrow is updated, record the time in lastArrowUpdateTime
  // 2) In the main drawing loop, check if sufficient time has passed since lastArrowUpdateTime
  // 3) Call arrow.update() if condition is fulfilled
  //
  // Thus incorporating the delay logic inside the main loop ensures that nothing is blocked
  // Note that millis() is a p5 library function that returns the time the program has been running
  if (millis() - lastArrowUpdateTime >= waitInterval)
  {
    arrow.update();
    waitInterval += d_waitInterval;
  }

  decelerationModel();
}

// Called every time the user presses the submit button in form
function resetSketch()
{
  sketchStartTime = millis();
  lastArrowUpdateTime = sketchStartTime;
  waitInterval = 1;
  d_waitInterval = 1;
  background(0);

  tSize = 12;
  tListStart = [30, 30];

  let itemsEl = document.getElementsByClassName('item');
  items = [];
  for (let i = 0; i < itemsEl.length; i++)
  {
    items[i] = itemsEl[i].value;
  }

  textAlign(LEFT, TOP);

  // 100 is chosen arbitrarily as maximum size
  tSize = scaleTextSize(100);
  textSize(tSize);

  // Head of Arrow randomly next to one of the items
  arrow.itemRef = utilities.random(0, items.length);
  arrow.head = [tListStart[0] + getMaxWidth(items) + 20, tListStart[1] + arrow.itemRef*tSize + tSize/2];
  arrow.len = scaleArrowSize(200);
}

// Recursive function to scale the text size both vertically and horizontally
// One drawback of scaling it horizontally is that:
// If the text is shrunk due to horizontal space, there will be space left below the last item
function scaleTextSize(ts)
{
  // The textSize is dynamically computed based on the number of items ;)
  // Make the text the biggest possible but make sure everything fits inside the canvas
  textSize(ts);

  // Horizontally we have to leave minimum 25% of the space for the arrow
  if (tListStart[1] + items.length*ts > canvas_size[1] || tListStart[0] + getMaxWidth(items) > 0.75*canvas_size[0])
  {
    return scaleTextSize(ts-1)
  }
  else
  {
    return ts;
  }
}

// Same recursive concept of scaleTextSize()
// The 'fins' of the arrow have to be within the particular text line
function scaleArrowSize(as)
{
  if (2*as/10 > tSize)
  {
    return scaleArrowSize(as-1);
  }
  else
  {
    return as;
  }
}

// Accepts a string array and returns the max textWidth()
function getMaxWidth(arr)
{
  let max = textWidth(arr[0]);

  for (let i = 1; i < arr.length; i++)
  {
    let w = textWidth(arr[i]);
    if (w > max)
    {
      max = w;
    }
  }
  return max;
}

function decelerationModel()
{
  if (waitInterval < 50)
  {
    d_waitInterval = 1;
  }
  else if (waitInterval < 100)
  {
    d_waitInterval = 5
  }
  else if (waitInterval < 400)
  {
    d_waitInterval = 20;
  }
  else
  {
    d_waitInterval = 50;
  }
}

// At the end of the animation draw a transparent black screen
// and display the result
function endMessage()
{
  fill(0, 200);
  rect(0, 0, canvas_size[0], canvas_size[1]);

  fill (255);
  textSize(30);
  textAlign(CENTER, CENTER);
  text (items[arrow.itemRef], canvas_size[0]/2, canvas_size[1]/2);
}
