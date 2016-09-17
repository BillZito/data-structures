describe('binarySearchTree', function() {
  var binarySearchTree;

  beforeEach(function() {
    binarySearchTree = new BinarySearchTree(5);
  });

  it('should have methods named "insert", "contains", and "depthFirstLog', function() {
    expect(binarySearchTree.insert).to.be.a('function');
    expect(binarySearchTree.contains).to.be.a('function');
    expect(binarySearchTree.depthFirstLog).to.be.a('function');
  });

  it('should insert values at the correct location in the tree', function() {
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    binarySearchTree.insert(6);
    expect(binarySearchTree.left.right.value).to.equal(3);
    expect(binarySearchTree.right.left.value).to.equal(6);
  });

  it('should have a working "contains" method', function() {
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    expect(binarySearchTree.contains(7)).to.equal(true);
    expect(binarySearchTree.contains(8)).to.equal(false);
  });

  it('should execute a callback on every value in a tree using "depthFirstLog"', function() {
    var array = [];
    var func = function(value) { array.push(value); };
    binarySearchTree.insert(2);
    binarySearchTree.insert(6);
    binarySearchTree.insert(3);
    binarySearchTree.depthFirstLog(func);
    expect(array).to.eql([5, 2, 3, 6]);
  });

  it('should execute a callback on every value in a tree using "breadthFirstLog"', function() {
    var array = [];
    var func = function(value) { array.push(value); };
    binarySearchTree.insert(2);
    binarySearchTree.insert(7);
    binarySearchTree.insert(1);
    binarySearchTree.insert(4);
    binarySearchTree.insert(6);
    binarySearchTree.insert(8);
    binarySearchTree.insert(3);
    binarySearchTree.breadthFirstLog(func);
    expect(array).to.eql([5, 2, 7, 1, 4, 6, 8, 3]);
  });

  it('should have calculated balance factors and parents', function() {
    expect(binarySearchTree.balance).to.equal(0);
    binarySearchTree.insert(2);
    expect(binarySearchTree.balance).to.equal(-1);
    expect(binarySearchTree.left.parent.value).to.equal(5);
    binarySearchTree.insert(7);
    expect(binarySearchTree.balance).to.equal(0);
    binarySearchTree.insert(1);
    expect(binarySearchTree.balance).to.equal(-1);
    expect(binarySearchTree.left.balance).to.equal(-1);
    expect(binarySearchTree.left.left.parent.value).to.equal(2);
    binarySearchTree.insert(4);
    expect(binarySearchTree.balance).to.equal(-2);
  });

  it('should rotate left', function() {
    binarySearchTree.insert(6);
    expect(binarySearchTree.balance).to.equal(1);
    binarySearchTree.insert(7);
    expect(binarySearchTree.balance).to.equal(2);
    binarySearchTree.rotateLeft();
    expect(binarySearchTree.balance).to.equal(0);
    expect(binarySearchTree.parent).to.equal(6);
    expect(binarySearchTree.parent.right).to.equal(7);
  });

  it('should rotate right', function() {
    binarySearchTree.insert(4);
    expect(binarySearchTree.balance).to.equal(-1);
    binarySearchTree.insert(3);
    expect(binarySearchTree.balance).to.equal(-2);
    binarySearchTree.rotateRight();
    expect(binarySearchTree.balance).to.equal(0);
    expect(binarySearchTree.parent).to.equal(4);
    expect(binarySearchTree.parent.left).to.equal(3);
  });

  it('should rebalance as soon as the max depth is more than twice the minimum depth', function() {
    expect(false).to.equal(true);
  });
});
