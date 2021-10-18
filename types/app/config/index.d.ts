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
declare const config: IConfig;
export default config;
//# sourceMappingURL=index.d.ts.map