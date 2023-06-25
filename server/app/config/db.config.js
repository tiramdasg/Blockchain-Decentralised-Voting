module.exports = {
    HOST: "localhost",
    PORT:3306,
    USER: "root",
    PASSWORD: process.env.DB_PASSWORD || "Pass@1234",
    DB: process.env.DB_NAME || "dbtest1"
  };