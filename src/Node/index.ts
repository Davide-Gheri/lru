
export class Node<K = any, V = any> {
  constructor(
    public key: K,
    public value: V,
    public next?: K,
    public prev?: K,
  ) {}
}
