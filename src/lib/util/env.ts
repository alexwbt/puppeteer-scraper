import dotenv from "dotenv";

export const getEnv = (key: string): string | undefined =>
  process.env[key];

export const getEnvString = (key: string, defaultValue: string = ""): string =>
  getEnv(key) || defaultValue;

export const getEnvNumber = (key: string, defaultValue: number = 0): number =>
  Number(getEnv(key)) || defaultValue;

export const getEnvBoolean = (key: string, defaultValue: boolean = false): boolean => {
  const value = getEnv(key);
  if (typeof value === "undefined")
    return defaultValue;
  return value === "true";
};

export const getEnvStringRequired = (key: string): string => {
  const value = getEnv(key);
  if (typeof value === "undefined")
    throw new Error(`Required variable ${key} is not provided.`);
  return value;
};

export const ENV = getEnvString("ENV");

dotenv.config({
  path: `env/${ENV}.env`,
});
