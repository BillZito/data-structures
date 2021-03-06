var Stack = function() {
  var stack = {};
  stack.storage = {};
  stack.counter = 0;
  _.extend(stack, stackMethods);
  return stack;
};

var stackMethods = {};

stackMethods.pop = function() {
  if (this.counter > 0) {
    this.counter--;
  }
  var result = this.storage[this.counter];
  return result;
};

stackMethods.push = function(value) {
  this.storage[this.counter] = value;
  this.counter++;
};

stackMethods.size = function() {
  return this.counter;
};