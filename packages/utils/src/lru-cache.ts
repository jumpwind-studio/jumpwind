class Node<K, V> {
  key: K;
  value: V;
  prev: Node<K, V> | null;
  next: Node<K, V> | null;

  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

export class LruCache<K, V> {
  private capacity: number;
  private cache: Map<K, Node<K, V>>;
  private head: Node<K, V>;
  private tail: Node<K, V>;

  constructor(capacity: number) {
    if (capacity <= 0) {
      throw new Error("Capacity must be greater than 0");
    }

    this.capacity = capacity;
    this.cache = new Map();

    // Initialize dummy head and tail nodes
    this.head = new Node(null! as K, null! as V);
    this.tail = new Node(null! as K, null! as V);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  /**
   * Get value by key. Returns undefined if key doesn't exist.
   * Time complexity: O(1)
   */
  get(key: K): V | undefined {
    const node = this.cache.get(key);
    if (!node) {
      return undefined;
    }

    // Move accessed node to head (most recently used)
    this.moveToHead(node);
    return node.value;
  }

  /**
   * Put key-value pair into cache.
   * If key exists, update value. If cache is full, remove LRU item.
   * Time complexity: O(1)
   */
  put(key: K, value: V): void {
    const existingNode = this.cache.get(key);

    if (existingNode) {
      // Update existing node
      existingNode.value = value;
      this.moveToHead(existingNode);
    } else {
      // Create new node
      const newNode = new Node(key, value);

      if (this.cache.size >= this.capacity) {
        // Remove least recently used item (tail's previous)
        const lru = this.tail.prev!;
        this.removeNode(lru);
        this.cache.delete(lru.key);
      }

      // Add new node to head
      this.addToHead(newNode);
      this.cache.set(key, newNode);
    }
  }

  /**
   * Check if key exists in cache.
   * Time complexity: O(1)
   */
  has(key: K): boolean {
    return this.cache.has(key);
  }

  /**
   * Delete key from cache.
   * Time complexity: O(1)
   */
  delete(key: K): boolean {
    const node = this.cache.get(key);
    if (!node) {
      return false;
    }

    this.removeNode(node);
    this.cache.delete(key);
    return true;
  }

  /**
   * Clear all items from cache.
   * Time complexity: O(1)
   */
  clear(): void {
    this.cache.clear();
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  /**
   * Get current size of cache.
   * Time complexity: O(1)
   */
  get size(): number {
    return this.cache.size;
  }

  /**
   * Get maximum capacity of cache.
   * Time complexity: O(1)
   */
  get maxSize(): number {
    return this.capacity;
  }

  /**
   * Get all keys in order from most recently used to least recently used.
   * Time complexity: O(n)
   */
  keys(): K[] {
    const keys: K[] = [];
    let current = this.head.next;
    while (current && current !== this.tail) {
      keys.push((current as any).key);
      current = (current as any).next;
    }
    return keys;
  }

  /**
   * Get all values in order from most recently used to least recently used.
   * Time complexity: O(n)
   */
  values(): V[] {
    const values: V[] = [];
    let current = this.head.next;
    while (current && current !== this.tail) {
      values.push((current as any).value);
      current = (current as any).next;
    }
    return values;
  }

  /**
   * Get all entries in order from most recently used to least recently used.
   * Time complexity: O(n)
   */
  entries(): Array<[K, V]> {
    const entries: Array<[K, V]> = [];
    let current = this.head.next;
    while (current && current !== this.tail) {
      entries.push([(current as any).key, (current as any).value]);
      current = (current as any).next;
    }
    return entries;
  }

  // Private helper methods
  private addToHead(node: Node<K, V>): void {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next!.prev = node;
    this.head.next = node;
  }

  private removeNode(node: Node<K, V>): void {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
  }

  private moveToHead(node: Node<K, V>): void {
    this.removeNode(node);
    this.addToHead(node);
  }
}

// Usage example:
/*
const cache = new LruCache<string, number>(3);

cache.put('a', 1);
cache.put('b', 2);
cache.put('c', 3);

console.log(cache.get('a')); // 1 (moves 'a' to most recent)
console.log(cache.keys());   // ['a', 'c', 'b'] - 'a' is now most recent

cache.put('d', 4); // evicts 'b' (least recently used)
console.log(cache.has('b')); // false
console.log(cache.keys());   // ['d', 'a', 'c']

console.log(cache.size);     // 3
console.log(cache.maxSize);  // 3
*/
