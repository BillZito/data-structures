var LinkedList = function() {
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value) {
    var node = new Node(value);
    if (this.tail) {
      this.tail.next = node;  
    }
    this.tail = node;
    if (!this.head) {
      this.head = node;
    }
  };

  list.removeHead = function() {
    if (this.head) {
      if (!this.head.next) {
        this.tail = this.head.next;
      }
      var oldHead = this.head.value;
      this.head = this.head.next;
    }
    return oldHead;
  };

  list.contains = function(target) {
    var pointer;
    if (this.head) {
      pointer = this.head;
    } else {
      pointer = this;
    }
    if (pointer) {
      if (pointer.value === target) {
        return true;
      }
      if (pointer.next) {
        return list.contains.call(pointer.next, target);
      }
    }
    return false;
  };

  return list;
};

var Node = function(value) {
  var node = {};

  node.value = value;
  node.next = null;

  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
