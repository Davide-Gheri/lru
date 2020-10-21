import { Lru } from './Lru';

export default function lru(limit = 10): Lru {
  return new Lru(limit);
}
