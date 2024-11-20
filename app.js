const express = require("express");
const app = express();
const port = 3000;
const homepageRouter = require("./routers/homepage");
const postsRouter = require("./routers/posts");

app.use(express.static("public"));

app.use("/", homepageRouter);
app.use("/posts", postsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

console.log("Server del mio blog");
