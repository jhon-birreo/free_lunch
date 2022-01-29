import { App } from "./config/app";
import {mongooConnect} from "./config/database";
async function main() {

  await mongooConnect();
  const app = new App();
  app.routes();
  app.listen();

}

main();
