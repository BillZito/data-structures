var HashTable = function(limit) {
  this._limit = limit || 8;
  this._fill = 0;
  this._storage = LimitedArray(this._limit);
};

HashTable.prototype.insert = function(k, v) {
  var hashTable = this;
  var originalLimit = this._limit;
  var newHashIndex = getIndexBelowMaxForKey(k, hashTable._limit); // number between 0-8
  var keyValuePair = {};
  keyValuePair[k] = v;
  if (!!hashTable._storage.get(newHashIndex)) { // is the newHashIndex already taken in storage array
    hashTable._storage.each(function(storageKeyValuePair, storageHashedIndex, storage) {
      if (storageHashedIndex === newHashIndex) {
        if (!!storageKeyValuePair[k]) {
          hashTable._storage.set(newHashIndex, keyValuePair); //overwrite
        } else {
          var combinedKeyValuePair = _.extend(storageKeyValuePair, keyValuePair);
          hashTable.double();
          hashTable._storage.set(newHashIndex, combinedKeyValuePair);
          hashTable._fill++;
        }
      }
    });
  } else {
    hashTable.double();
    hashTable._storage.set(newHashIndex, keyValuePair);
    hashTable._fill++;
  }
  if (originalLimit !== hashTable._limit) {
    hashTable.reHash();
  }
};


HashTable.prototype.retrieve = function(k) {
  var hashTable = this;
  var index = getIndexBelowMaxForKey(k, hashTable._limit);
  var keyValuePair = hashTable._storage.get(index);
  if (!keyValuePair) {
    return undefined;
  }
  return keyValuePair[k];
};

HashTable.prototype.remove = function(k) {
  var hashTable = this;
  var index = getIndexBelowMaxForKey(k, hashTable._limit);
  hashTable._storage.each(function(storageKeyValuePair, storageHashedIndex, storage) {
    if (storageHashedIndex === index) {
      delete storage[storageHashedIndex];
      hashTable._fill--;
      hashTable.half();
    }
  });
};

HashTable.prototype.reHash = function() {
  var hashTable = this;
  var newHashTable = new HashTable(hashTable._limit);
  //for each keyvalue pair in hashtable storage
  hashTable._storage.each(function(storageKeyValuePair, storageHashedIndex, storage) {
    _.each(storageKeyValuePair, function(storageValue, storageKey, storageKeyValuePairs) {
      //for each keyvalue pair in the keyvalue pair
      newHashTable.insert(storageKey, storageValue);
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


