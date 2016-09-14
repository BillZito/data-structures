var Queue = function() {
  var someInstance = {};
  var counter = 0;
  var processed = 0;
  // Use an object with numeric keys to store values
  var storage = {};

  // Implement the methods below

  someInstance.enqueue = function(value) { 
    storage[counter] = value;
    counter++; 
  };

  someInstance.dequeue = function() {
    if (processed < counter) {
      var result = storage[processed];
      delete storage[processed];
      processed++;
      return result;
    }
  };

  someInstance.size = function() {
    var size = counter - processed;
    return size;
  };

  return someInstance;
};
