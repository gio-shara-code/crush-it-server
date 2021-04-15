import express from "express";
import config from "./config/index";
import * as loaders from "./loaders/index_loader";

async function startServer() {
  const app = express();

  await loaders.init(app);

  app.listen(config.port, () => {
    console.log(`The server is running on the port ${config.port}`);
  });
}

startServer();
