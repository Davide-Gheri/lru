
export type Key = any;

export class Node {
  constructor(
    public key: Key,
    public value: any,
    public next?: Key,
    public prev?: Key,
  ) {}
}
