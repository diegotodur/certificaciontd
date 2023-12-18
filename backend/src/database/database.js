import pkg from 'pg';

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.USERNAME || 'postgres',
  host: 'localhost',
  database: process.env.DATABASE || 'bicicletas',
  password: process.env.PASSWORD || 'postgres',
  port: 5432,
});

pool.connect()
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err);
  });

export default pool;
