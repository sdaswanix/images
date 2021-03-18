import fs from "fs";

let _config;

export function config() {
  if (!process.env.IMAGES_CONFIG) {
    throw new Error("IMAGES_CONFIG environment variable is not set");
  }
  if (!_config) {
    try {
      const file = fs.readFileSync(process.env.IMAGES_CONFIG);
      _config = JSON.parse(file);
    } catch (err) {
      throw new Error(`Could not load ${process.env.IMAGES_CONFIG}`);
    }
  }
  return _config;
}
