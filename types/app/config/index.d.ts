export interface IConfig {
    port: number;
    debug: boolean;
    databaseUrl: string;
    jwtSecret: string;
    cronJobExpression: string;
}
declare const config: IConfig;
export default config;
//# sourceMappingURL=index.d.ts.map