const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const userRouter = require('./routers/user')
const cors = require('cors')

const app = express();
const port = process.env.PORT;

app.use(cors())
app.use(express.json());
app.use(userRouter)


app.listen(port, () => {
  console.log("Server is up on port: " + port);
});
