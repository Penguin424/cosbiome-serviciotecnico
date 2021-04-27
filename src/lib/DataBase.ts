import mysql from "promise-mysql";

export const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cosbiomeserviciotecnico",
});
