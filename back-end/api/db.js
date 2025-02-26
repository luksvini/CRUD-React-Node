// if Using Postgresql 

// import pg from "pg";
// import env from "dotenv";

// env.config();

// const db = new pg.Client({
//     user: process.env.PG_USER,
//     host: process.env.PG_HOST,
//     database: process.env.PG_DATABASE,
//     password: process.env.PG_PASSWORD,
//     port: process.env.PG_PORT,
// })

// db.connect();

// db.on('error', (err) => {
//     console.error("Unexpected error", err);
//     process.exit(-1);
// })

// export const query = (text, params) => {
//     if (!text) {
//         console.error("Erro: query SQL está indefinida ou nula!");
//         throw new Error("A query SQL não pode ser nula ou indefinida.");
//     }
//     return db.query(text, params);
// };
