var DoublyLinkedList = function() {
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value) {
    var node = new Node(value);
    if (this.tail) {
      node.previous = this.tail;
      this.tail.next = node;  
    } else {
      this.head = node;
    }
    this.tail = node;
  };

  list.addToHead = function(value) {
    var node = new Node(value);
    if (this.head) {
      node.next = this.head;
      this.head.previous = node;
    } else {
      this.tail = node;
    }
    this.head = node;
  };

  list.removeTail = function() {
    var removedTail = null;
    if (this.tail) {
      removedTail = this.tail.value;
      this.tail = this.tail.previous;
      if (this.tail) { 
        this.tail.next = null; 
      } else {
        this.head = null;
      }
    }
    return removedTail;
  };

  list.removeHead = function() {
    var oldHead = null;
    if (this.head) {
      if (!this.head.next) {
        this.tail = null;
      } else {
        this.head.next.previous = null;
      }
      oldHead = this.head.value;
      this.head = this.head.next;
    }
    return oldHead;
  };

  list.contains = function(target) {
    var pointer;
    if (this.head) {
      pointer = this.head;
    } 
    while (pointer) {
      if (pointer.value === target) {
        return true;
      }
      pointer = pointer.next;
    }
    return false;
  };

  return list;
};

var Node = function(value) {
  var node = {};

  node.value = value;
  node.next = null;
  node.previous = null;

  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
