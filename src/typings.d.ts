import { Lru } from './Lru';

export * from './Lru';
export * from './Node';

export default function lru(limit?: number): Lru;
