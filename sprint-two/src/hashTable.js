var HashTable = function(limit) {
  this._limit = limit || 8;
  this._fill = 0;
  this._storage = LimitedArray(this._limit);
};

HashTable.prototype.insert = function(k, v) {
  var hashTable = this;
  var originalLimit = this._limit;
  var newHashIndex = getIndexBelowMaxForKey(k, hashTable._limit); // number between 0-8
  var keyValuePairArray = [k, v];
  if (!!hashTable._storage.get(newHashIndex)) { // is the newHashIndex already taken in storage array
    hashTable._storage.each(function(storageArrayOfKeyValuePairArrays, storageHashedIndex) {
      if (storageHashedIndex === newHashIndex) {
        var found = false;
        _.each(storageArrayOfKeyValuePairArrays, function(storageKeyValuePairArray) {
          if (storageKeyValuePairArray[0] === k) {
            storageKeyValuePairArray[1] = v;
            found = true;
          }
        });
        if (!found) {
          //debugger;
          storageArrayOfKeyValuePairArrays.push(keyValuePairArray);
          //debugger;
          hashTable.double();
          hashTable._fill++;
        }
      }
    });
  } else {
    hashTable.double();
    //debugger;
    hashTable._storage.set(newHashIndex, [keyValuePairArray]);
    //debugger;
    hashTable._fill++;
  }
  if (originalLimit !== hashTable._limit) {
    hashTable.reHash();
  }
  //debugger;
};


HashTable.prototype.retrieve = function(k) {
  var hashTable = this;
  var index = getIndexBelowMaxForKey(k, hashTable._limit);
  var arrayOfKeyValuePairArrays = hashTable._storage.get(index);
  var val;
  _.each(arrayOfKeyValuePairArrays, function(keyValuePairArray) {
    if (keyValuePairArray[0] === k) {
      // debugger;
      val = keyValuePairArray[1];
    }
  });
  return val;
};

HashTable.prototype.remove = function(k) {
  var hashTable = this;
  var index = getIndexBelowMaxForKey(k, hashTable._limit);
  hashTable._storage.each(function(storageArrayOfKeyValuePairArrays, storageHashedIndex) {
    if (storageHashedIndex === index) {
      _.each(storageArrayOfKeyValuePairArrays, function(storageKeyValuePairArray, i) {
        if (storageKeyValuePairArray[0] === k) {
          storageArrayOfKeyValuePairArrays.splice(i, 1);
          hashTable._fill--;
          hashTable.half();
        }
      });
    }
  });
};

HashTable.prototype.reHash = function() {
  var hashTable = this;
  var newHashTable = new HashTable(hashTable._limit);
  //for each keyvalue pair in hashtable storage
  hashTable._storage.each(function(storageArrayOfKeyValuePairArrays, storageHashedIndex, storage) {
    _.each(storageArrayOfKeyValuePairArrays, function(storageKeyValuePairArray) {
      //for each keyvalue pair in the keyvalue pair
      newHashTable.insert(storageKeyValuePairArray[0], storageKeyValuePairArray[1]);
    });
  });
  this._storage = newHashTable._storage;
};

HashTable.prototype.double = function() {
  if (this._fill / this._limit >= 0.75) {
    this._limit = this._limit * 2;
    return true;
  }
  return false;
};

HashTable.prototype.half = function() {
  if ((this._fill / this._limit < 0.25) && (this._limit > 8)) {
    this._limit = this._limit / 2;
    return true;
  }
  return false;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */


