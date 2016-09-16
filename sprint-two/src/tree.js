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

/*
 * Complexity: What is the time complexity of the above functions?
 */
