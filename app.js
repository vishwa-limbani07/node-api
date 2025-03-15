const express = require("express");
const app = express();
const mongoose = require("mongoose");
const url = 'mongodb://localhost/UsersDb';
mongoose.connect(url, {useNewUrlParser: true});

const con = mongoose.connection;
con.on('open', () => {
    console.log('connected');
});
app.use(express.json());
const userRouter = require("./routers/user");
app.use('/user',userRouter);


app.listen(9000, () => {
    console.log("server started");
})
