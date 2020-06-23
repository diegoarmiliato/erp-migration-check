import OracleDB from 'oracledb';
import { DbConfig } from '@database/DbConfig';

export class Connect {
  // Instantiate the Connection variable that will be returned
  private conn = <OracleDB.Connection>{};

  async open (user?: string, password?: string, connectString?: string): Promise<OracleDB.Connection> {
    // Gets the Connection Parameters variable mounted
    const dbconfig: DbConfig = new DbConfig(user, password, connectString);
    // Tries to Open Database Connection
    try {
      this.conn = await OracleDB.getConnection(dbconfig.connConfig);
      // Queries for the Database Name id Order to LOG it
      const query = await this.conn.execute('select * from global_name')
        .then((result) => {
          // Log the Connected SCHEMA and DBNAME
          console.log(`Connected to Schema ${user} on Database ${result}`);
        });
    } catch (err) {
      // Returns any kind of exception upon connecting the Database or querying for the DBNAME
      console.log(err);
    }
    // Returns the Connection object
    return this.conn;
  }

  async getConnection (): Promise<OracleDB.Connection> {
    return this.conn;
  }
}
