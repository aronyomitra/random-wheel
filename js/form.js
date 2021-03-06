/*  No two input fields or buttons can have the same id
    Once an id has been added (or deleted) no other element can have the same ID again.
    Hence it is required to track the highest id so far with the variable:
*/
var highestInputId = 2;

function addField()
{
  /*  Browsers automatically add a whitespace between two inline elements
      eg: <input ...>
          <input ...>
      will  automatically print a space between the two input elements.
      This is however not true when elements are dynamically added using the DOM.
      Hence when adding input elements (which are inline) in the form, it is required to insert an additional space.
  */
  let itemCount = document.getElementsByClassName('item').length;

  // The first input field is the base from which additional ones are copied
  let newfield = document.getElementById('i1').cloneNode(true);
  highestInputId++;
  newfield.id = 'i' + highestInputId;
  newfield.value = '';

  let db = document.getElementById('db1').cloneNode(true);
  db.id = 'db' + highestInputId;

  let br = document.createElement("br");
  let sp = document.createElement("span");
  sp.innerHTML = '&nbsp';

  let addBtn = document.getElementById('addBtn');
  let submit = document.getElementById('submit');
  document.getElementById('itemform').appendChild(newfield);
  document.getElementById('itemform').appendChild(sp);
  document.getElementById('itemform').appendChild(db);
  document.getElementById('itemform').appendChild(br);
  document.getElementById('itemform').appendChild(addBtn);
  document.getElementById('itemform').appendChild(submit);
  newfield.focus();
}

// The button element is passed as an arg
function delField(el)
{
  let itemCount = document.getElementsByClassName('item').length;

  let id = el.id;

  // Converts string from dbn to in [n = {1, 2, 3, 4 ...}]
  let tid = 'i' + id.slice(2,);

  /*  tinput is the input field element
      sp is the whitespace
      br is the newline
  */
  let tinput = document.getElementById(tid);
  let sp = document.getElementById(tid).nextSibling;
  let br = document.getElementById(id).nextSibling;

  // The first field cannot be deleted because it is required for adding new fields
  if (itemCount > 2 && id != 'db1')
  {
    document.getElementById('itemform').removeChild(el);
    document.getElementById('itemform').removeChild(sp);
    document.getElementById('itemform').removeChild(tinput);
    document.getElementById('itemform').removeChild(br);
  }
}

function findResult()
{
  document.getElementById('sketch').style.display = 'block';
  resetSketch();
  if (!sketchRunning)
  {
    loop();
    sketchRunning = true;
  }

  return false;
}
