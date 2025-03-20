import LinkedList from './linked-list.js';

export default class HashMap {
  constructor() {
    this._loadFactor = 0.75;
    this._capacity = 16;
    this._size = 0;
    this.buckets = new Array(this._capacity).fill(null);
  }

  set(key, value) {
    const loadFactor = this.#loadFactor();
    if (loadFactor >= this._loadFactor) {
      this.#rehash(key, value);
      return;
    }

    const bucketIndex = this.#findBucket(key);

    if (this.buckets[bucketIndex] === null) {
      this.buckets[bucketIndex] = new LinkedList();
      this.buckets[bucketIndex].append(key, value);
      this._size++;
      return;
    }

    const entry = this.#findEntry(this.buckets[bucketIndex], key);
    if (entry !== null) {
      entry.value = value;
      return;
    }
    this.buckets[bucketIndex].append(key, value);
    this._size++;
  }

  get(key) {
    const bucketIndex = this.#findBucket(key);
    const entry = this.#findEntry(this.buckets[bucketIndex], key);

    if (entry !== null) {
      return entry.value;
    }
    return null;
  }

  has(key) {
    const bucketIndex = this.#findBucket(key);
    const entry = this.#findEntry(this.buckets[bucketIndex], key);
    if (entry === null) {
      return false;
    }
    return true;
  }

  remove(key) {
    const bucketIndex = this.#findBucket(key);
    const findKey = this.buckets[bucketIndex].remove(key);
    if (findKey) {
      this._size--;
      return true;
    }
    return false;
  }

  length() {
    return this._size;
  }

  clear() {
    this._capacity = 16;
    this._size = 0;
    this.buckets = new Array(this._capacity).fill(null);
  }

  keys() {
    const keys = [];
    this.buckets.forEach((bucket) => {
      if (bucket === null) {
        return;
      }
      keys.push(...bucket.getAllKeys());
    });
    return keys;
  }

  values() {
    const values = [];
    this.buckets.forEach((bucket) => {
      if (bucket === null) {
        return;
      }

      values.push(...bucket.getAllValues());
    });
    return values;
  }

  entries() {
    const pairs = [];
    this.buckets.forEach((bucket) => {
      if (bucket === null) {
        return;
      }
      pairs.push(...bucket.getEntriesPair());
    });
    return pairs;
  }

  #findBucket(key) {
    // Generate the hash key and return
    // the bucket
    const hash = this.#hash(key);

    return hash % this.buckets.length;
  }

  #findEntry(bucket, key) {
    // check if there's a value in bucket
    const entry = bucket.find(key);
    if (bucket.head() === null || entry === null) {
      return null;
    }
    return entry;
  }

  #hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  #rehash(key, value) {
    const getAllEntries = this.entries();
    getAllEntries.push([key, value]);
    this._capacity *= 2;
    this._size = 0;
    this.buckets = new Array(this._capacity).fill(null);
    console.log(this._capacity);

    getAllEntries.forEach(([key, value]) => {
      const bucketIndex = this.#findBucket(key);
      if (this.buckets[bucketIndex] === null) {
        this.buckets[bucketIndex] = new LinkedList();
      }
      this.buckets[bucketIndex].append(key, value);
      this._size++;
    });
  }

  #loadFactor() {
    return this._size / this._capacity;
  }
}
