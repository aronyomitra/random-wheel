function addField()
{
  let itemCount = document.getElementsByClassName('item').length;

  let newfield = document.getElementById('i1').cloneNode(true);
  itemCount++;
  newfield.id = 'i' + itemCount;

  let db = document.getElementById('db1').cloneNode(true);
  db.id = 'db' + itemCount;

  let br = document.createElement("br");

  let addBtn = document.getElementById('addBtn');
  document.getElementById('itemform').appendChild(newfield);
  document.getElementById('itemform').appendChild(db);
  document.getElementById('itemform').appendChild(br);
  document.getElementById('itemform').appendChild(addBtn);
}

function readFields()
{
  let items = document.getElementsByClassName('item');
  values = [];

  for (let i = 0; i < items.length; i++)
  {
    values[i] = items[i].value
  }
  console.log(values);
}

function delField(el)
{
  let itemCount = document.getElementsByClassName('item').length;

  let id = el.id;
  let tid = 'i' + id.slice(2,);
  let tinput = document.getElementById(tid);
  let br = document.getElementById(id).nextSibling;
  if (itemCount > 2 && id != 'db1')
  {
    document.getElementById('itemform').removeChild(el);
    document.getElementById('itemform').removeChild(tinput);
    document.getElementById('itemform').removeChild(br);
  }
}
