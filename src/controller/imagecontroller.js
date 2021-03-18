import { ImageApplication } from "../application/imageapplication.js";
import multer from "multer";
import express from "express";

class ImageController {
  static async add(req, res) {
    const imageApplication = new ImageApplication();
    try {
      const data = await imageApplication.add(req.file.buffer);
      res.status(201).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).end();
    } finally {
      imageApplication.dispose();
    }
  }
  static async save(req, res) {
    const imageApplication = new ImageApplication();
    try {
      const data = await imageApplication.save(req.body.id);
      res.status(201).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).end();
    } finally {
      imageApplication.dispose();
    }
  }
}

export function createImageController(app) {
  const upload = multer();
  app.post("/upload", upload.single("image"), ImageController.add);
  app.post("/save", express.json(), ImageController.save);
}
