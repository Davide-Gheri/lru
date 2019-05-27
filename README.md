
# @davidegheri/lru

Tiny Javascript Least Recently Used cache, for both Browsers and NodeJs.
No dependencies needed.

## Installation
```bash
npm install --save @davidegheri/lru
# Or
yarn add @davidegheri/lru
```
## Usage

### Require the module
```javascript
const lru = require('@davidegheri/lru');
```
### Or with imports
```javascript
import lru from '@davidegheri/lru';
```

### Create a new cache instance
```javascript
const maxEntries = 5; // Defaults 10
const cache = lru(maxEntries);
```
### Methods

**get(key): any**

Retrieve a cached element by its key. Moves the element as head of the cache.
```javascript
cache.get('key');
```

**set(key, value): Lru**

Add a new element to the cache if not already present. Moves the element as head of the cache  
```javascript
cache.set('key', 'fooBar');
```

**has(key): boolean**

Check if the given key exists, this not move the element as head of the cache
```javascript
cache.has('key1');
````

**delete(key): Lru**

Remove a cached element by its key. Moves every other elements consequently
```javascript
cache.delete('key');
```

**reset(limit?: number): Lru**

Reset the cache, deletes all cached elements, optionally change the cache limit
```javascript
cache.reset();
```

### Properties

**size: number**

Get the number of cached elements
```javascript
cache.set('key1', 'foo');
cache.set('key2', 'bar');

console.log(cache.size) // 2
```

**head: any**

Get the head element (last used or inserted)
```javascript
cache.set('key1', 'foo');
cache.set('key2', 'bar');

console.log(cache.head); // bar (key2)
console.log(cache.get('key1')); // foo
console.log(cache.head); // foo (key1)
```

**tail: any**

Get the tail element (oldest used or inserted)
```javascript
cache.set('key1', 'foo');
cache.set('key2', 'bar');

console.log(cache.tail); // foo (key1)
console.log(cache.get('key1')); // foo
console.log(cache.tail); // bar (key2)
```
