var Queue = function() {
  var queue = Object.create(Queue.prototype);
  queue.counter = 0;
  queue.processed = 0;
  queue.storage = {};
  return queue;
};

Queue.prototype.size = function() {
  var size = this.counter - this.processed;
  return size;
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
