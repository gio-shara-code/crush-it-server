import dotenv from "dotenv";
// config() will read your .env file, parse the contents, assign it to process.env.
dotenv.config();
if (!process.env.JWT_SECRET_KEY) {
  console.log("JWT_SECRET_KEY is undefined in .env file");
  process.exit();
}

export default {
  jWTSecretKey: process.env.JWT_SECRET_KEY,
  port: process.env.PORT || 300,
  db: {
    username: "gio_shara123",
    password: "Qrx97JvqgGHLvtH9",
    name: "demo-database",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
  },
};
