import dotenv from 'dotenv';
import OracleDB from 'oracledb';
dotenv.config();

export class DbConfig {
    public connConfig: OracleDB.ConnectionAttributes;

    constructor (user?: string, password?: string, connectString?: string) {
      this.connConfig = {
        user: user || process.env.NODE_ORACLEDB_USER || '<YOUR DATABASE USER HERE>',
        password: password || process.env.NODE_ORACLEDB_PASSWORD || '<YOUR DATABASE PASSWORD HERE>',
        connectString: connectString || process.env.NODE_ORACLEDB_CONNECTIONSTRING || '<YOUR DATABASE CONNECT STRING HERE>'
      };
    }
}
