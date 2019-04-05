function addField()
{
  let itemCount = document.getElementsByClassName('item').length;

  let newfield = document.createElement("input");
  newfield.type = 'text';
  newfield.className = 'item';
  itemCount++;
  newfield.name = 'i' + itemCount;

  let br = document.createElement("br");

  let addBtn = document.getElementById('addBtn');
  document.getElementById('itemform').appendChild(newfield);
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
