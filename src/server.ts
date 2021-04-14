import express from "express";
import bodyParser, { json, urlencoded } from "body-parser";
import * as path from "path";
import session from "express-session";
import * as bcrypt from "bcrypt";
const app = express();

app.use(json());

const users: { email: string; password: string }[] = [];

app.get("/users", (req, res) => {});

app.post("/register", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(500).send("Provide neccessary information");
  }
  const foundUser = users.find((user) => user.email === req.body.email);
  if (foundUser) return res.status(409).send("Email already exists");
  try {
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    users.push({
      email: req.body.email,
      password: hashedPass,
    });
    res.status(201).send("User was stored in database");
  } catch {
    res.status(500).send();
  }
});

app.post("/login", async (req, res) => {
  const foundUser = users.find(
    (currentUser) => currentUser.email === req.body.email
  );
  console.log(req.body);
  if (!foundUser) return res.status(404).send("User not found");

  try {
    const success = await bcrypt.compare(req.body.password, foundUser.password);
    if (!success) return res.status(403).send("Wrong password");
    res.status(201).send("You are logged in!");
  } catch {
    res.status(500).send();
  }
});

app.post("/login", async (req, res) => {
  const foundUser = users.find(
    (currentUser) => currentUser.email === req.body.email
  );
  console.log(req.body);
  if (!foundUser) return res.status(404).send("User not found");

  try {
    const success = await bcrypt.compare(req.body.password, foundUser.password);
    if (!success) return res.status(403).send("Wrong password");
    res.status(201).send("You are logged in!");
  } catch {
    res.status(500).send();
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on the port: ${port}`));
