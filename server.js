const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("config");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000"
}));

// Database
mongoose.connect(config.get("mongoURI"), {
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useFindAndModify: false
})
.then(() => console.log("MongoDB connected..."))
.catch(err => console.log(err));

// Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
    process.stdout.write('\033c');
    console.log(`Server started on port ${port}....`);
});
