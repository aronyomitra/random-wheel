/*
This is a collection of utility functions that make other jobs simple.
The idea is to treat this module as a Black Box
*/

// Creating a subset of the global namespace:
// To call any of these functions from outside the module.. utilities.functionName()
var utilities = {

  // Function to compare equality between two arrays[1D] (or two primitive types)
  isEqual: function(arr1, arr2)
  {
    if (arr1 == arr2)
      return true;

    let resp = true;
    let type = Object.prototype.toString.call(arr1);

    // If the two objects are not the same type
    if (!(Array.isArray(arr1) && (Array.isArray(arr2))))
      resp = false;

    if (arr1.length != arr2.length)
        resp = false;

    for (let i = 0; i < Math.min(arr1.length, arr2.length); i++)
    {
      if (arr1[i] != arr2[i])
        resp = false;
    }
    return resp;
  },

  // Constructor to create 'color' objects
  Color: function(r, g, b)
  {
    this.rgb = [r, g, b];
  },

  // Return an array of adjacent cells on a matrix
  // a -> only adjacent
  // d -> only diagonal
  // ad-> both adjacent and diagonal
  getSurrounding: function(arr, pos, op)
  {
    let r = arr.length;
    let c = arr[0].length;
    let list = [];

    if (pos[0] < 0 || pos[0] >= r || pos[1] < 0 || pos[1] >= c)
    {
      console.log('Invalid coordinates passed');
      return undefined;
    }

    switch(op)
    {
      case 'a':
      // Up
      if (pos[0] - 1 >= 0 && pos[0] < r)
      {
        list.push([pos[0] - 1, pos[1]]);
      }
      // Right
      if (pos[1] + 1 < c)
      {
        list.push([pos[0], pos[1] + 1]);
      }
      // Down
      if (pos[0] + 1 < r)
      {
        list.push([pos[0] + 1, pos[1]]);
      }
      // Left
      if (pos[1] - 1 >= 0)
      {
        list.push([pos[0], pos[1] - 1]);
      }
      break;

      case 'd':
      // Up + Left
      if (pos[0] - 1 >= 0 && pos[1] - 1 >= 0)
      {
        list.push([pos[0] - 1, pos[1] - 1]);
      }
      // Up + Right
      if (pos[0] - 1 >= 0 && pos[1] + 1 < c)
      {
        list.push([pos[0] - 1, pos[1] + 1]);
      }
      // Down + Right
      if (pos[0] + 1 < r && pos[1] + 1 < c)
      {
        list.push([pos[0] + 1, pos[1] + 1]);
      }
      // Down + Left
      if (pos[0] + 1 < r && pos[1] - 1 >= 0)
      {
        list.push([pos[0] + 1, pos[1] - 1]);
      }
    }
    return list;
  },

  // Returns a random integer between a and b (both inclusive)
  random: function(a, b)
  {
    return Math.floor(Math.random()*b + a);
  }
}
