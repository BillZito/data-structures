var Queue = function() {
  var someInstance = {};
  var counter = 0;
  // Use an object with numeric keys to store values
  var storage = {};

  // Implement the methods below

  someInstance.enqueue = function(value) { 
    storage[counter] = value;
    counter++; 
  };

//{0:a, 1:b}
//deque--> remove a--> {0:b}
//add c and dequee --> {0:b, 1:c} then {0:c}
  someInstance.dequeue = function() {
    if (counter > 0){
      counter--;
      var ans = storage[0];
      for (var i = 0; i < counter; i++){
        storage[i] = storage[i +1];
      }
      return ans;
    }
  };

  someInstance.size = function() {
    return counter;
  };

  return someInstance;
};
