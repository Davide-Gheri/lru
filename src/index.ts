import { Lru } from './Lru';

export default function lru(limit: number = 10): Lru {
  return new Lru(limit);
}
