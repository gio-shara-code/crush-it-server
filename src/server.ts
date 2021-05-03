import express from "express";
import config from "./config/index";
import { initLoaders } from "./loaders/index_loader";

async function startServer() {
  const app = express();

  await initLoaders(app);
  
  app.listen(config.port, () => {
    console.log(`The server is running on the port ${config.port}`);
  });
}

startServer();
