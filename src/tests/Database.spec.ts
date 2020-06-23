import { Connect } from '@database/Connect';
import OracleDB from 'oracledb';

const connect = new Connect();
let conn: OracleDB.Connection;

beforeAll(async () => {
  conn = await connect.open('TRERP', 'TRERP', '127.0.0.1:1521/DOCKER');
});

describe('Validate Connected Database', () => {
  it('Should connect to fixed Local Database', async (done) => {
    expect(conn).toBeDefined();
    done();
  });

  it('Should return a Simple Query', async (done) => {
    await conn.execute("SELECT 'TEST' FROM DUAL")
      .then((res) => {
        const compare = [['TEST']];
        expect(res.rows).toMatchObject(compare);
        done();
      });
  });
});
