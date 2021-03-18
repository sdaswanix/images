import { Image } from "../domain/image.js";
import { v4 as uuidv4 } from "uuid";
import { ImageRepository } from "../infrastructure/imagerepository.js";
import { RepositoryCloudinary } from "../infrastructure/repositorycloudinary.js";

export class ImageApplication {
  constructor() {
    this._imageRepository = new ImageRepository();
    this._repositoryCloudinary = new RepositoryCloudinary();
  }
  async add(buffer) {
    // Conexión con el dominio
    const image = new Image();
    image.id = uuidv4();
    image.buffer = buffer;
    // Conexión con la infraestructura
    await this._imageRepository.add(image);
    // DTO
    return { id: image.id };
  }

  async save(id) {
    const image = await this._imageRepository.get(id);
    const imageCloudinary = await this._repositoryCloudinary.add(image.buffer);
    // Conexión con la infraestructura
    await this._imageRepository.remove(image);
    const { asset_id, public_id, url } = imageCloudinary;
    return { asset_id, public_id, url };
  }

  async dispose() {
    await this._imageRepository.dispose();
  }
}
