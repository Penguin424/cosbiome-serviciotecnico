import mysql from "promise-mysql";

export const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "",
  database: "cosbiomeserviciotecnico",
});
