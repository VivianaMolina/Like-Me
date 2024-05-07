const { Pool } = require("pg");

const config = {
    host: "localhost",
    port: 5432,
    database: "likeme",
    user: "postgres",
    password: "1234",
};
const pool = new Pool(config);

const insertar = async (datos) => {
        const insert = {
            text: "INSERT INTO posts (titulo, img, descripcion, likes) values ($1, $2, $3, 0)",
            values: datos,
        };

        const registro = await pool.query(insert); 
        return registro;
};

const consultar= async () => {

        const result = await pool.query("SELECT * FROM posts");
        return result.rows; //importante .rows!!!
};

const editar = async (id) => {
        const result = await pool.query(`UPDATE posts SET likes = likes + 1 WHERE id = '${id}'`);      
        return result;        
};


module.exports = { insertar, consultar, editar }