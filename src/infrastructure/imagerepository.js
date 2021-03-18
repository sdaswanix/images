import Redis from "ioredis";
import { Image } from "../domain/image.js";
const oneDayInSeconds = 24 * 60 * 60;

export class ImageRepository {
  constructor() {
    this._redis = new Redis();
  }

  async add(image) {
    await this._redis.set(image.id, image.buffer, "EX", oneDayInSeconds);
  }

  async get(id) {
    const buffer = await this._redis.getBuffer(id);
    const img = Object.create(Image.prototype);
    return Object.assign(img, { id, buffer });
  }

  async remove(image) {
    await this._redis.del(image.id);
  }

  async dispose() {
    await this._redis.quit();
  }
}
