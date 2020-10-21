import { Node } from '../Node';

export class Lru<K = any, V = any> {
  values = new Map<K, Node<K, V>>();

  public headKey?: K;
  public tailKey?: K;

  constructor(
    private limit = 10,
  ) {}

  get head(): V | undefined {
    return this.headKey ? this.get(this.headKey) : undefined;
  }

  get tail(): V | undefined {
    return this.tailKey ? this.get(this.tailKey) : undefined;
  }

  get size(): number {
    return this.values.size;
  }

  reset(limit?: number): this {
    this.values.clear();
    this.headKey = undefined;
    this.tailKey = undefined;
    if (limit) {
      this.limit = limit;
    }
    return this;
  }

  has(key: K): boolean {
    return this.values.has(key);
  }

  set(key: K, value: V): this {
    if (this.has(key)) {
      const item = this.values.get(key) as Node<K, V>;
      item.value = value;
      if (this.headKey !== key) {
        const oldHead = this.headKey && this.values.get(this.headKey);

        if (oldHead) {
          oldHead.next = key;
        }

        this.updateItemNextPrev(item);

        item.next = undefined;
        item.prev = this.headKey;

        this.headKey = key;
      }
    } else {
      if (this.limit > 0 && this.limit === this.size) {
        this.removeLast();
      }
      const oldHead = this.headKey && this.values.get(this.headKey);
      if (oldHead) {
        oldHead.next = key;
      }
      const item = new Node(key, value, undefined, this.headKey);
      this.headKey = key;
      this.values.set(key, item);
      if (this.size === 1) {
        this.tailKey = key;
      }
    }
    return this;
  }

  get(key: K): V | undefined {
    if (this.has(key)) {
      const item = this.values.get(key) as Node<K, V>;
      this.set(key, item.value);

      return item.value;
    }
    return undefined;
  }

  delete(key: K): this {
    if (this.has(key)) {
      const item = this.values.get(key) as Node<K, V>;
      this.values.delete(key);

      this.updateItemNextPrev(item);

      if (this.headKey === key) {
        this.headKey = item.prev;
      }
    }
    return this;
  }

  private updateItemNextPrev(item: Node): void {
    const oldNext = this.values.get(item.next);
    const oldPrev = this.values.get(item.prev);
    if (this.tailKey === item.key) {
      this.tailKey = item.next;
    }
    if (oldNext) {
      oldNext.prev = item.prev;
    }
    if (oldPrev) {
      oldPrev.next = item.next;
    }
  }

  private removeLast(): this {
    if (this.tailKey) {
      const item = this.values.get(this.tailKey) as Node<K, V>;
      this.values.delete(this.tailKey);
  
      const oldNext = item.next && this.values.get(item.next) as Node<K, V>;
  
      if (oldNext) {
        this.tailKey = item.next;
        oldNext.prev = undefined;
      }
    }
    return this;
  }
}
