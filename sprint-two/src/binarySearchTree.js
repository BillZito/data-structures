var BinarySearchTree = function(value) {
  //set properties
  this.value = value;
  this.left = null; //bst
  this.right = null; //bst
};

//prototypal
BinarySearchTree.prototype.insert = function(value) {
  //what do we want to do to value
  var bst = new BinarySearchTree(value);

  //check which side
  if (value > this.value) {
    //term case
    if (this.right !== null) {
      this.right.insert(value);
    } else {
      this.right = bst;
    }
  } else {
    if (this.left !== null) {
      this.left.insert(value);
    } else {
      this.left = bst;
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
/*
 * Complexity: What is the time complexity of the above functions?
 */
