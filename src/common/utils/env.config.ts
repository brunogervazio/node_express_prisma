import dotenv from "dotenv";
import { cleanEnv, host, port, str } from "envalid";

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ["development", "production"] }),
  HOST: host(),
  PORT: port(),
  SECRET_KEY: str()
});