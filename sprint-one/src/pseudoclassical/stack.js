var Stack = function() {
  this.counter = 0;
  this.storage = {};
};

Stack.prototype.pop = function() {
  if (this.counter > 0) {
    this.counter--;
  }
  var result = this.storage[this.counter];
  return result;
};

Stack.prototype.push = function(value) {
  this.storage[this.counter] = value;
  this.counter++;
};

Stack.prototype.size = function() {
  return this.counter;
};

var stack = new Stack();