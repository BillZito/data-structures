var Tree = function(value) {
  var newTree = {};
  newTree.value = value;

  // your code here
  newTree.children = [];  // fix me
  _.extend(newTree, treeMethods);
  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value) {
  var childTree = new Tree(value);
  this.children.push(childTree);

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
    //if this were a binary tree: we could run left.contains || right.contains
  }
  return found;
};



/*
 * Complexity: What is the time complexity of the above functions?
 */
