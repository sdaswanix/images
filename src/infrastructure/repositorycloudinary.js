import cloudinary from "cloudinary";
import { ImageCloudinary } from "../domain/imagecloudinary.js";
import streamifier from "streamifier";
import { config } from "../config/config.js";

cloudinary.v2.config(config());

export class RepositoryCloudinary {
  async add(image) {
    let streamUpload = (image) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.v2.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });

        streamifier.createReadStream(image).pipe(stream);
      });
    };
    const { asset_id, public_id, url } = await streamUpload(image);
    // Conexión con el dominio
    const imageCloudinary = Object.create(ImageCloudinary.prototype);
    return Object.assign(imageCloudinary, { asset_id, public_id, url });
  }
}
