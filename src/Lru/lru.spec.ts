import { Lru } from './index';
import { Node } from '../Node';

describe('Lru set', () => {
  let lru: Lru;

  beforeEach(() => {
    lru = new Lru();
  });

  it('should add 3 elements in the correct order', () => {
    lru.set('key1', 1);
    lru.set('key2', 2);
    lru.set('key3', 3);

    expect(lru.headKey).toEqual('key3');
    const values = lru.values;

    const key1Value = values.get('key1') as Node;
    const key2Value = values.get('key2') as Node;
    const key3Value = values.get('key3') as Node;

    expect(key1Value.next).toEqual('key2');
    expect(key1Value.prev).toBeUndefined();
    expect(key2Value.next).toEqual('key3');
    expect(key2Value.prev).toEqual('key1');
    expect(key3Value.next).toBeUndefined();
    expect(key3Value.prev).toEqual('key2');

    expect(lru.tailKey).toEqual('key1');
  });

  it('should update an old key and move it as head', () => {
    lru.set('key1', 1);
    lru.set('key2', 2);
    lru.set('key3', 3);

    lru.set('key2', 4);

    expect(lru.headKey).toEqual('key2');
    const values = lru.values;
    const key1Value = values.get('key1') as Node;
    const key2Value = values.get('key2') as Node;
    const key3Value = values.get('key3') as Node;

    expect(key1Value.prev).toBeUndefined();
    expect(key1Value.next).toEqual('key3');
    expect(key2Value.prev).toEqual('key3');
    expect(key2Value.next).toBeUndefined();
    expect(key3Value.prev).toEqual('key1');
    expect(key3Value.next).toEqual('key2');
  });

  it('should update the tail', () => {
    lru.set('key1', 1);
    lru.set('key2', 2);
    lru.set('key3', 3);

    lru.set('key1', 1);

    const values = lru.values;
    const key2Value = values.get('key2') as Node;
    expect(lru.tailKey).toEqual('key2');
    expect(key2Value.prev).toBeUndefined();
    expect(key2Value.next).toEqual('key3');
  });
});

describe('Lru get', () => {
  let lru: Lru;

  beforeEach(() => {
    lru = new Lru();
  });

  it('should return te correct key and move it on head position', () => {
    lru.set('key1', 1);
    lru.set('key2', 2);
    lru.set('key3', 3);

    const res = lru.get('key2');
    expect(res).toEqual(2);
    expect(lru.headKey).toEqual('key2');
  });

  it('should return undefined if no key is found', () => {
    lru.set('key1', 1);
    lru.set('key2', 2);
    lru.set('key3', 3);
    const res = lru.get('notAKey');
    expect(res).toBeUndefined();
  });
});

describe('Lru delete', () => {
  let lru: Lru;

  beforeEach(() => {
    lru = new Lru();
  });

  it('should delete the key and rearranging the others', () => {
    lru.set('key1', 1);
    lru.set('key2', 2);
    lru.set('key3', 3);

    lru.delete('key3');

    const values = lru.values;
    const key2Value = values.get('key2') as Node;
    const key3Value = values.get('key3');

    expect(key3Value).toBeUndefined();
    expect(lru.headKey).toEqual('key2');
    expect(lru.tailKey).toEqual('key1');
    expect(key2Value.next).toBeUndefined();
    expect(key2Value.prev).toEqual('key1');
  });

  it('should delete the key and rearranging the others - 2', () => {
    lru.set('key1', 1);
    lru.set('key2', 2);
    lru.set('key3', 3);

    lru.delete('key2');
    const values = lru.values;
    const key3Value = values.get('key3') as Node;
    const key2Value = values.get('key2');

    expect(key2Value).toBeUndefined();
    expect(lru.headKey).toEqual('key3');
    expect(lru.tailKey).toEqual('key1');
    expect(key3Value.next).toBeUndefined();
    expect(key3Value.prev).toEqual('key1');
  });

  it('should delete the key and rearranging the others - 3', () => {
    lru.set('key1', 1);
    lru.set('key2', 2);
    lru.set('key3', 3);

    lru.delete('key1');
    const values = lru.values;
    const key1Value = lru.get('key1');
    const key2Value = values.get('key2') as Node;

    expect(key1Value).toBeUndefined();
    expect(lru.headKey).toEqual('key3');
    expect(lru.tailKey).toEqual('key2');
    expect(key2Value.prev).toBeUndefined();
    expect(key2Value.next).toEqual('key3');
  });
});

describe('Lru getters', () => {
  let lru: Lru;

  beforeEach(() => {
    lru = new Lru();
  });

  it('should return the Head value', () => {
    lru.set('key1', 1);
    lru.set('key2', 2);
    lru.set('key3', 3);

    expect(lru.head).toEqual(3);
  });

  it('should return the Tail value', () => {
    lru.set('key1', 1);
    lru.set('key2', 2);
    lru.set('key3', 3);

    expect(lru.tail).toEqual(1);
  });

  it('should return the lru size', () => {
    lru.set('key1', 1);
    lru.set('key2', 2);
    lru.set('key3', 3);

    expect(lru.size).toEqual(3);
  });
});

describe('Lru ensure max length', () => {
  let lru: Lru;

  beforeEach(() => {
    lru = new Lru(3);
  });

  it('should remove the last record when inserting the fourth element', () => {
    lru.set('key1', 1);
    lru.set('key2', 2);
    lru.set('key3', 3);

    expect(lru.tailKey).toEqual('key1');

    lru.set('key4', 4);

    expect(lru.tailKey).toEqual('key2');

    expect(lru.get('key1')).toBeUndefined();
  });
});

describe('Lru reset', () => {
  let lru: Lru;

  beforeEach(() => {
    lru = new Lru(3);
  });

  it('should reset', () => {
    lru.set('key1', 1);
    lru.set('key2', 2);
    lru.set('key3', 3);

    expect(lru.size).toEqual(3);
    expect(lru.headKey).toEqual('key3');
    expect(lru.tailKey).toEqual('key1');
    lru.reset();
    expect(lru.size).toEqual(0);
    expect(lru.headKey).toBeUndefined();
    expect(lru.tailKey).toBeUndefined();

    expect(lru['limit']).toEqual(3);
  });

  it('should reset with new limit', () => {
    lru.set('key1', 1);
    lru.set('key2', 2);
    lru.set('key3', 3);
    expect(lru.size).toEqual(3);
    lru.reset(2);
    expect(lru.size).toEqual(0);
    expect(lru['limit']).toEqual(2);
  });
});
