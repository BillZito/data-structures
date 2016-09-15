var Queue = function() {
  var queue = {};
  queue.counter = 0;
  queue.processed = 0;
  queue.storage = {};
  _.extend(queue, queueMethods);
  return queue;
};

var queueMethods = {};

queueMethods.size = function() {
  var size = this.counter - this.processed;
  return size;
};

queueMethods.enqueue = function(value) {
  this.storage[this.counter] = value;
  this.counter++;
};

queueMethods.dequeue = function() {
  if (this.processed < this.counter) {
    var result = this.storage[this.processed];
    delete this.storage[this.processed];
    this.processed++;
  }
  return result;
};