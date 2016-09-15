var HashTable = function() {
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
};

HashTable.prototype.insert = function(k, v) {
  var hashTableStorage = this._storage;
  var newHashIndex = getIndexBelowMaxForKey(k, this._limit); // number between 0-8
  var keyValuePair = {};
  keyValuePair[k] = v;
  if (!!hashTableStorage.get(newHashIndex)) { // is the newHashIndex already taken in storage array
    hashTableStorage.each(function(storageKeyValuePair, storageHashedIndex, storage) {
      if (storageHashedIndex === newHashIndex) {
        if (!!storageKeyValuePair[k]) {
          hashTableStorage.set(newHashIndex, keyValuePair); //overwrite
        } else {
          var combinedKeyValuePair = _.extend(storageKeyValuePair, keyValuePair);
          hashTableStorage.set(newHashIndex, combinedKeyValuePair);
        }
      }
    });
  } else {
    hashTableStorage.set(newHashIndex, keyValuePair);
  }
};


HashTable.prototype.retrieve = function(k) {
  var hashTableStorage = this._storage;
  var index = getIndexBelowMaxForKey(k, this._limit);
  var keyValuePair = hashTableStorage.get(index);
  if (!keyValuePair) {
    return undefined;
  }
  return keyValuePair[k];
};

HashTable.prototype.remove = function(k) {
  var hashTableStorage = this._storage;
  var index = getIndexBelowMaxForKey(k, this._limit);
  hashTableStorage.each(function(storageKeyValuePair, storageHashedIndex, storage) {
    if (storageHashedIndex === index) {
      delete storage[storageHashedIndex];
    }
  });
};



/*
 * Complexity: What is the time complexity of the above functions?
 */


