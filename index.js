class Node{
  constructor(key, value){
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class LinkedList{
  constructor(){
    this.head = null;
    this.tail = this.head;
    this.length = 0;
  }

  append(key, value){
    const newNode = new Node(key, value);
    this.length++;
    // if empty list
    if (this.head == null){
      this.head = newNode;
      this.tail = this.head;
      return;
    }
    this.tail.next = newNode;
    this.tail = newNode;
  }

  prepend(key, value){
    const newNode = new Node(key, value);
    newNode.next = this.head
    this.head = newNode;
    this.length++;
  }

  getNode(index){
    let currentNode = this.head;
    let counter = 0;
    while (counter != index){
      currentNode = currentNode.next;
      counter++;
    }
    return currentNode;
  }

  insert(key, value, index){
    if (index <= 0){
      this.prepend(key, value);
      return;
    }
    if (index >= this.length){
      this.append(key, value);
      return;
    }
    const newNode = new Node(key, value);
    let nodeToTheLeft = this.getNode(index - 1);
    let nodeToRight = nodeToTheLeft.next;
    newNode.next = nodeToRight;
    nodeToTheLeft.next = newNode;
    this.length++;
  }

  remove(index){
    // if head
    if (index == 0){
      // if only one node on list
      if (this.head == this.tail){
        this.head = null;
        this.tail = null;
        this.length = 0;
        return;
      }
      let nodeToRight = this.head.next;
      this.head.next = null;
      this.head = nodeToRight;
      this.length--;
      return;
    }
    let nodeToTheLeft = this.getNode(index - 1);
    let nodeToDelete = nodeToTheLeft.next;
    let nodeToRight = nodeToDelete.next;
    // if tail
    if (nodeToRight == null){
      this.tail = nodeToTheLeft;    
    }
    nodeToDelete.next = null;
    nodeToTheLeft.next = nodeToRight;
    this.length--;
  }

  printList(){
    const arrayOfLinkListValues = [];
    let currentNode = this.head;
    while (currentNode != null){
      arrayOfLinkListValues.push([currentNode.key, currentNode.value]);
      currentNode = currentNode.next;
    }
    return arrayOfLinkListValues;
  }

  reverse(){
    if (!this.head || !this.head.next){
      return;
    }
    let firstNode = this.head;
    let secondNode = this.head.next;
    this.tail = this.head;
    while (secondNode){
      let tempNode = secondNode.next;
      secondNode.next = firstNode;
      firstNode = secondNode;
      secondNode = tempNode;
    }
    this.head.next = null;
    this.head = firstNode;
  }

  search(key){
    var currentNode = this.head;
    while (currentNode){
      if (currentNode.key == key){
        return currentNode;
      }
      currentNode = currentNode.next;
    }
    return undefined;
  }

}

class HashTable{
  
  constructor(size){
    this.data = new Array(size);
    for (let i = 0; i < size; i++){
      this.data[i] = new LinkedList();
    }
  }
  
  //Its fast so we assume O(1)
  _hash(key){
    let hash = 0;
    for (let i = 0; i < key.length; i++){
      hash = (hash + key.charCodeAt(i) * i) % this.data.length;
    }
    return hash;
  }
  
  // O(1) values get added on random order
  set(key, value){
    let address = this._hash(key);
    if (!this.data[address]){
      this.data[address] = new LinkedList();
    }
    this.data[address].append(key, value);
    return this.data;
  }
  
  //O(1) if no collision else O(n)
  get(key){
    let address = this._hash(key);
    const currentBucket = this.data[address];
    if(currentBucket){
      return currentBucket.search(key);
    }
    else
      return undefined;
  }

  //O(n) loops through entire object to get the data
  printHashTable(){
    if(!this.data){
      return undefined;
    }
    for (let i = 0; i < this.data.length; i++){
      if (this.data[i].head != null){
        console.log(this.data[i].printList());
        console.log('\n');
      }
    }
  }
  
}

// const myLinkedList = new LinkedList(50);
// myLinkedList.append(70);
// myLinkedList.append(80);
// myLinkedList.prepend(10);
// myLinkedList.insert(60,2);
// myLinkedList.insert(40,0);
// myLinkedList.remove(1);
// myLinkedList.remove(1);
// myLinkedList.remove(0);
// myLinkedList.reverse();
// console.log(myLinkedList);
// console.log(myLinkedList.printList());
const myHashTable = new HashTable(2);
myHashTable.set('apple',1);
myHashTable.set('mango',2);
myHashTable.set('orange',3);
myHashTable.set('pineapple',4);
myHashTable.printHashTable();
console.log(myHashTable.get('mango'));
console.log(myHashTable);


