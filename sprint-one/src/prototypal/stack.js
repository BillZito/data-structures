var Stack = function() {
  var stack = Object.create(Stack.prototype);
  stack.counter = 0;
  stack.storage = {};
  return stack;
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