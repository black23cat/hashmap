import Node from './node.js';

export default class LinkedList {
  constructor({ head = null } = {}) {
    this._head = head;
    this._tail = this._head;
    this._size = 0;
  }

  append(value, key) {
    this._size++;
    if (this._head === null) {
      this._head = new Node(value, key);
      this._tail = this._head;
      return;
    }
    const newNode = new Node(value, key);
    this._tail.nextNode = newNode;
    this._tail = newNode;
  }

  size() {
    if (this._head === null) return null;

    return this._size;
  }

  head() {
    return this._head;
  }

  tail() {
    if (this._head === null) return null;
    return this._tail;
  }

  remove(key) {
    if (this._head === null) {
      return false;
    }
    // Find index of the key
    const keyIndex = this.getKeyIndex(key);
    if (keyIndex === 0 && this._size === 1) {
      this._head = null;
      this._tail = this._head;
      this._size = 0;
      return true;
    } else if (keyIndex !== null) {
      const prevNode = this.at(keyIndex - 1);
      const nextNode = prevNode.nextNode.nextNode;
      prevNode.nextNode = nextNode;
      return true;
    }
    return false;
  }

  find(key) {
    if (this._head === null) return null;

    let currentNode = this._head;
    while (currentNode !== null) {
      if (currentNode.key === key) return currentNode;
      currentNode = currentNode.nextNode;
    }
    return null;
  }

  getAllKeys() {
    if (this._head === null) return null;
    const keys = [];
    let temp = this._head;
    while (temp !== null) {
      keys.push(temp.key);
      temp = temp.nextNode;
    }
    return keys;
  }

  getAllValues() {
    if (this._head === null) return null;
    const values = [];
    let temp = this._head;
    while (temp !== null) {
      values.push(temp.value);
      temp = temp.nextNode;
    }
    return values;
  }

  getEntriesPair() {
    if (this._head === null) return null;
    const keyValue = [];
    let temp = this._head;
    while (temp !== null) {
      const pairs = [];
      pairs.push(temp.key, temp.value);
      keyValue.push(pairs);
      temp = temp.nextNode;
    }
    return keyValue;
  }

  getKeyIndex(key) {
    if (this._head === null) return null;
    let index = 0;
    let currentNode = this._head;
    while (currentNode !== null) {
      if (currentNode.key === key) {
        return index;
      }
      index += 1;
      currentNode = currentNode.nextNode;
    }
    return 'null';
  }

  at(index) {
    if (index < 0 || index >= this._size) return null;
    if (this._head === null) {
      return null;
    }

    let currentIndex = 0;
    let currentNode = this._head;
    while (currentIndex < index && currentNode.nextNode !== null) {
      currentIndex += 1;
      currentNode = currentNode.nextNode;
    }
    return currentNode;
  }
}

// prepend(value, key) {
//   this._size++;
//   if (this._head === null) {
//     this._head = new Node(value, key);
//     this._tail = this._head;
//     return;
//   } else {
//     const currentHead = new Node(
//       this._head.key,
//       this._head.value,
//       this._head.nextNode
//     );
//     this._head = new Node(value, key);
//     this._head.nextNode = currentHead;
//   }
// }

// removeAt(index) {
//   const currentListSize = this.size();
//   if (index < 0 || index > currentListSize) return 'Index out of bounds';

//   this._size--;
//   if (index === 0 && currentListSize === 1) {
//     this._head = null;
//     this._tail = this._head;
//     return;
//   }
//   if (index === 0) {
//     this._head = this._head.nextNode;
//     return;
//   }
//   const prevNode = this.at(index - 1);
//   const nextNode = prevNode.nextNode.nextNode;
//   prevNode.nextNode = nextNode;
// }

// insertAt(value, key, index) {
//   const currentListSize = this.size();
//   if (index < 0 || index > currentListSize) return 'Index out of bounds';

//   if (index === 0) {
//     this.prepend(value, key);
//     return;
//   }
//   if (index === currentListSize) {
//     this.append(value, key);
//     return;
//   }
//   const prevNode = this.at(index - 1);
//   const nextNode = prevNode.nextNode;
//   const insertedNode = new Node(value, key);
//   prevNode.nextNode = insertedNode;
//   insertedNode.nextNode = nextNode;
//   this._size++;
// }

// at(index) {
//   if (index < 0 || index > this._size) return 'Index out of bounds';
//   if (this._head === null) {
//     return null;
//   }

//   let currentIndex = 0;
//   let currentNode = this._head;
//   while (currentIndex < index && currentNode.nextNode !== null) {
//     currentIndex += 1;
//     currentNode = currentNode.nextNode;
//   }
//   if (index > currentIndex) {
//     return 'Index out of bounds';
//   } else {
//     return currentNode;
//   }
// }

// pop() {
//   let currentNode = this._head;
//   while (currentNode.nextNode.nextNode !== null) {
//     currentNode = currentNode.nextNode;
//   }
//   currentNode.nextNode = null;
//   this._tail = currentNode;
//   this._size--;
// }
