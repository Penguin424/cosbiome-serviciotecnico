import mysql from "promise-mysql";

export const connection = mysql.createConnection({
  host: "138.197.209.230",
  user: "cosbiome",
  port: 3306,
  password: "Ac03901582",
  database: "cosbiomeserviciotecnico",
});
