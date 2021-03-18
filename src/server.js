import express from "express";
import { createImageController } from "./controller/imagecontroller.js";

const PORT = process.env.PORT || 8082;
const app = express();

app.use(express.static("public"));

createImageController(app);

app.listen(PORT, function () {
  console.log(`Listening in http://localhost:${PORT}`);
});
