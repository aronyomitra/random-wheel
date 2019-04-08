let canvas;
let canvas_size = [1000, 350];

let sketchRunning = false;
let sketchStartTime;

let tSize;
let tListStart;

let items = [];

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

  items.forEach(function (e, i) {text (e, tListStart[0], tListStart[1] + i*tSize)});
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

  // 100 is chosen arbitrarily as default size
  tSize = scaleTextSize(100);
  textSize(tSize);
  fill (255);
}

// Recursive function to scale the text size both vertically and horizontally
// One drawback of scaling it horizontally is that:
// If the text is shrunk due to horizontal space, there will be space left below the last item
function scaleTextSize(ts)
{
  console.log(ts);
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
