var BinarySearchTree = function(value) {
  //set properties
  this.value = value;
  this.parent = null;
  this.left = null; //bst
  this.right = null; //bst
  this.balance = 0;
};

//prototypal
BinarySearchTree.prototype.insert = function(value) {
  //what do we want to do to value
  var bst = new BinarySearchTree(value);

  //check which side
  if (value > this.value) {
    this.balance++;
    if (this.right !== null) {
      this.right.insert(value);
    } else {
      this.right = bst;
      this.right.parent = this;
    }
  } else {
    this.balance--;
    if (this.left !== null) {
      this.left.insert(value);
    } else {
      this.left = bst;
      this.left.parent = this;
    }
  }
};

//recursively search for value
BinarySearchTree.prototype.contains = function(target) {
  if (target === this.value) {
    return true;
  } else if (target > this.value) {
    //term case
    if (this.right !== null) {
      return this.right.contains(target);
    } 
  } else {
    if (this.left !== null) {
      return this.left.contains(target);
    } 
  }
  return false;
};

//depth first log
BinarySearchTree.prototype.depthFirstLog = function(cb) {
  cb(this.value);
  this.left && this.left.depthFirstLog(cb); 
  this.right && this.right.depthFirstLog(cb);
};


//breadth first log
BinarySearchTree.prototype.breadthFirstLog = function(cb) {
  var treesToCall = [this];
  for (var counter = 0; counter < treesToCall.length; counter++) {
    cb(treesToCall[counter].value);
    treesToCall[counter].left && treesToCall.push(treesToCall[counter].left);
    treesToCall[counter].right && treesToCall.push(treesToCall[counter].right);
  }
  
};

BinarySearchTree.prototype.reBalance = function() {

};

BinarySearchTree.prototype.rotateLeft = function() {

};

BinarySearchTree.prototype.rotateRight = function() {

};

/*
 * Complexity: What is the time complexity of the above functions?
 */
