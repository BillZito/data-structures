var Stack = function() {
  var someInstance = {};
  var counter = 0;
  // Use an object with numeric keys to store values
  var storage = {};

  // Implement the methods below
  someInstance.push = function(value) {
    storage[counter] = value;
    counter++;
  };
//0: a, 1:b
  someInstance.pop = function() {
    if (counter > 0) {
      counter--;
      var val = storage[counter];
      return val;
    } 
  };

  someInstance.size = function() {
    return counter;
  };

  return someInstance;
};
