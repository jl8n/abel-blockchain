import { createHash } from "crypto";

export class Block  {
    public index: number;
    public timestamp: string;
    public data: string;
    public previousHash: string;
    public hash: string;

    constructor(index: number, timestamp: string, data: string, previousHash: string, hash: string) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = hash;
    }

    calculateHash(): string {
      return createHash('sha256').update(
        this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).digest('hex');
    }
}