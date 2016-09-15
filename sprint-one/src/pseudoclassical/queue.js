var Queue = function() {
  this.counter = 0;
  this.processed = 0;
  this.storage = {};
};

Queue.prototype.enqueue = function(value) {
  this.storage[this.counter] = value;
  this.counter++;
};

Queue.prototype.dequeue = function() {
  if (this.processed < this.counter) {
    var result = this.storage[this.processed];
    delete this.storage[this.processed];
    this.processed++;
  }
  return result;
};

Queue.prototype.size = function() {
  var size = this.counter - this.processed;
  return size;
};

var queue = new Queue();