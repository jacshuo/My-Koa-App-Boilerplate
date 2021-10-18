import dotenv from "dotenv";

dotenv.config({path: ".env"});

export interface IConfig {
  port: number;
  debug: boolean;
  databaseUrl: string;
  jwtSecret: string;
  cronJobExpression: string;
  logJSONFormat: boolean;
  logFileDir: string;
  logFileName: string;
  logDatePattern: string;
  logZipArchive: boolean;
  logMaxSize: number;
  logMaxFiles: number;
}

const isDevMode = process.env.NODE_ENV === "development";

const config: IConfig = {
  port: +(process.env.PORT || 9000),
  debug: isDevMode,
  jwtSecret: process.env.JWT_SECRET || "",
  databaseUrl: process.env.DATABASE_URL || "",
  cronJobExpression: "0 * * * *",
  logJSONFormat: process.env.LOG_FORMAT_JSON === "true",
  logFileDir: process.env.LOG_FILE_DIR || "",
  logFileName: process.env.LOG_FILE_NAME || "",
  logDatePattern: process.env.LOG_DATE_PATTERN || "",
  logZipArchive: process.env.LOG_ZIP_ARCHIVE === "true",
  logMaxSize: +(process.env.LOG_MAX_SIZE || 0) || 3,
  logMaxFiles: +(process.env.LOG_MAX_FILES || 0) || 5,
};
export default config;
