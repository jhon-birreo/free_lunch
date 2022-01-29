import * as dotenv from "dotenv";
import { App } from "./config/app";
import {mongooConnect} from "./config/database";
async function main() {

  await mongooConnect();
  const app = new App();
  await app.listen();

  app.routes();
}

main();
