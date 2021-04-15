import dotenv from "dotenv";
// config() will read your .env file, parse the contents, assign it to process.env.
dotenv.config();
if (!process.env.SECRET_KEY) {
  console.log("SECRET_KEY is undefined in .env file");
  process.exit();
}

export default {
  jWTSecretKey: process.env.SECRET_KEY,
  port: process.env.PORT || 300,
  db: {
    username: "gio_shara123",
    password: "shara123",
    name: "demo-database",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
  },
};
