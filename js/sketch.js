let canvas;
let canvas_size = [1000, 350];

let sketchRunning = false;
let sketchStartTime;

let tSize;
let tListStart;

let items = [];

let arrow = {
  head: new Array(2),
  len: 200,

  draw: function()
  {
    stroke (255);
    line (arrow.head[0], arrow.head[1], arrow.head[0] + arrow.len, arrow.head[1]);
    line (arrow.head[0], arrow.head[1], arrow.head[0]+arrow.len/10, arrow.head[1]+arrow.len/10);
    line (arrow.head[0], arrow.head[1], arrow.head[0]+arrow.len/10, arrow.head[1]-arrow.len/10);
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
  arrow.draw();
}

function resetSketch()
{
  sketchStartTime = millis();
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
  arrow.head = [tListStart[0] + getMaxWidth(items) + 20, tListStart[1] + utilities.random(0, items.length)*tSize + tSize/2];
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

  // Horizontally we have to leave 25% of the space for the arrow
  if (tListStart[1] + items.length*ts > canvas_size[1] || tListStart[0] + getMaxWidth(items) > 0.75*canvas_size[0])
  {
    return scaleTextSize(ts-1)
  }
  else
  {
    return ts;
  }
}

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
