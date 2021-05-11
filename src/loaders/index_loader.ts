import {Application} from "express"
import {expressLoader} from "./express_loader"
import {mongooseLoader} from "./mongoose_loader"

const initLoaders = async (expressApp: Application): Promise<Application> => {
  await mongooseLoader()
  expressLoader(expressApp)
  // ... more loaders can be here
  // ... Initialize agenda (Scheduling tasks. Doing cron job)
  // ... or Redis, or whatever you want (Redis -> Database cache used for fast queries.)
  return expressApp
}

export {initLoaders}
