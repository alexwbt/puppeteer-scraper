import dotenv from "dotenv";
import startApp from "./app";
import { getEnvNumber, getEnvString } from "./lib/util/env";

dotenv.config({
  path: `env/${getEnvString("ENV")}.env`,
});

const PORT = getEnvNumber("PORT", 3000);
const CONTEXT_PATH = getEnvString("CONTEXT_PATH", "/");

startApp(PORT, CONTEXT_PATH);
