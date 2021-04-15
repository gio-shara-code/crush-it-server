import { Application } from "express";
import { expressLoader } from "./express_loader";
import { mongooseLoader } from "./mongoose_loader";

const init = async (expressApp: Application): Promise<Application> => {
  await mongooseLoader();
  expressLoader(expressApp);
  // ... more loaders can be here
  // ... Initialize agenda
  // ... or Redis, or whatever you want
  return expressApp;
};

export { init };
