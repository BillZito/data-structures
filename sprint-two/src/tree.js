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
  return !!this.traverseBFS(function(treeValue) {
    if (treeValue === target) {
      return true;
    }
  });
};

treeMethods.removeFromParent = function() {
  var toBeRemoved = this;
  var result;
  _.each(this.parent.children, function(child, i, children) {
    if (child === toBeRemoved) {
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
    if (cb(allTrees[i].value)) {
      return true;
    }
    for (var j = 0; j < allTrees[i].children.length; j++) {
      allTrees.push(allTrees[i].children[j]);
    }
  }
};

treeMethods.traverseDFS = function(cb) {
  // call cb on current node
  if (cb(this.value)) {
    return true;  //this could also be return 'potatoes'
  }
  // loop through children and call traverseDFS on each one
  for (var i = 0; i < this.children.length; i++) {
    if (this.children[i].traverseDFS(cb)) {
      return true;
    }
  }
};


/*
 * Complexity: What is the time complexity of the above functions?
 */
