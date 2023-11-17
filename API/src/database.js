import { Client } from 'pg'
const connect = new Client({
  user: 'postgres',
  password: 'admin',
  host: 'localhost',
  port: 5432, // Cổng mặc định của PostgreSQL là 5432
  port: 3001, // Cổng mặc định của PostgreSQL là 5432
  database: 'DUAN_BAN_SACH',
});
export default connect