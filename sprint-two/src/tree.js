var Tree = function(value) {
  var newTree = {};
  newTree.value = value;
  newTree.parent = null;

  // your code here
  newTree.children = [];  // fix me
  _.extend(newTree, treeMethods);
  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value) {
  var childTree = new Tree(value);
  this.children.push(childTree);
  childTree.parent = this;
};

treeMethods.contains = function(target) {
  //check tree itself
  var found = false;
  if (this.value === target) {
    return true;
  }
  //check it's children recursively
  if (!found) {
    _.each(this.children, function(childTree) {
      found = found || childTree.contains(target);
      if (found) {
        return true;
      }
    });
  }
  return found;
};

treeMethods.removeFromParent = function() {
  var toBeRemoved = this;
  var result;
  _.each(this.parent.children, function(child, i, children) {
    if (child === toBeRemoved) {
      // debugger; 
      toBeRemoved.parent = null;      
      result = children.splice(i, 1)[0];
    }
  });
  return result;
};

treeMethods.traverseBFS = function(cb) {
  //first create an array with first item in it
  var allTrees = [this];
  //and then, were gonna like iterate through its children adding to array and calling it on them
  for (var i = 0; i < allTrees.length; i++) {
    cb(allTrees[i].value);
    for (var j = 0; j < allTrees[i].children.length; j++) {
      allTrees.push(allTrees[i].children[j]);
    }
  }
};

treeMethods.traverseDFS = function(cb) {
  // call cb on current node
  cb(this.value);
  // loop through children and call traverseDFS on each one
  for (var i = 0; i < this.children.length; i++) {
    this.children[i].traverseDFS(cb);
  }
};


/*
 * Complexity: What is the time complexity of the above functions?
 */
