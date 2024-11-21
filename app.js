require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.HOST_PORT;
const domain = process.env.HOST_DOMAIN;

const homepageRouter = require("./routers/homepage");
const postsRouter = require("./routers/posts");

app.use(express.static("public"));

app.use("/", homepageRouter);
app.use("/posts", postsRouter);

app.listen(port, () => {
  console.log(`Example app listening at ${domain}${port}`);
});

console.log("Server del mio blog");
