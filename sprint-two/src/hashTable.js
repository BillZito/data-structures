var HashTable = function(limit) {
  this._limit = limit || 8;
  this._fill = 0;
  this._storage = LimitedArray(this._limit);
};

HashTable.prototype.insert = function(k, v) {
  var hashTableStorage = this._storage;
  var hashTableLimit = this._limit;
  var hashTableFill = this._fill;
  var newHashIndex = getIndexBelowMaxForKey(k, hashTableLimit); // number between 0-8
  var keyValuePair = {};
  keyValuePair[k] = v;
  if (!!hashTableStorage.get(newHashIndex)) { // is the newHashIndex already taken in storage array
    hashTableStorage.each(function(storageKeyValuePair, storageHashedIndex, storage) {
      if (storageHashedIndex === newHashIndex) {
        if (!!storageKeyValuePair[k]) {
          hashTableStorage.set(newHashIndex, keyValuePair); //overwrite
        } else {
          var combinedKeyValuePair = _.extend(storageKeyValuePair, keyValuePair);
          // debugger;
          if (hashTableFill / hashTableLimit >= 0.75) {
            hashTableLimit = hashTableLimit * 2;
          }
          hashTableStorage.set(newHashIndex, combinedKeyValuePair);
          hashTableFill++;
          //console.log('hashFill', hashTableFill);
        }
      }
    });
  } else {
    if (hashTableFill / hashTableLimit >= 0.75) {
      hashTableLimit = hashTableLimit * 2;
      //this = this.reHash(hashTableLimit);
    }
    hashTableStorage.set(newHashIndex, keyValuePair);
    hashTableFill++;
    //console.log('hashFill', hashTableFill);
  }
  //this._limit = hashTableLimit;
  this._fill = hashTableFill;
  this = this.reHash(hashTableLimit);

  //console.log('limit fill', hashTableLimit, this._fill);
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
  var hashTableLimit = this._limit;
  var hashTableFill = this._fill;
  var index = getIndexBelowMaxForKey(k, hashTableLimit);
  hashTableStorage.each(function(storageKeyValuePair, storageHashedIndex, storage) {
    if (storageHashedIndex === index) {
      delete storage[storageHashedIndex];
      hashTableFill--;
      // console.log('hashFill', hashTableFill);

      if (hashTableFill / hashTableLimit < 0.25) {
        hashTableLimit = hashTableLimit / 2;
        //this = this.reHash(hashTableLimit);
      }
    }
  });
  //this._limit = hashTableLimit;
  this._fill = hashTableFill;
  this = this.reHash(hashTableLimit);
  //console.log('limit fill', this._limit, this._fill);

};

HashTable.prototype.reHash = function(limit) {
  var hashTableStorage = this._storage;
  var hashTableLimit = limit;
  var newHashTable = new HashTable(hashTableLimit);
  hashTableStorage.each(function(storageKeyValuePair, storageHashedIndex, storage) {
    //for each keyvalue pair in hashtable storage
    _.each(storageKeyValuePair, function(storageValue, storageKey, storageKeyValuePairs) {
      //for each keyvalue pair in the keyvalue pair
      newHashTable.insert(storageKey, storageValue);
    });
  });
  return newHashTable;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */


