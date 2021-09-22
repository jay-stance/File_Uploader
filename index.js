const express = require("express");
const bodyParser = require("body-parser")
const upload = require("./multer");

const app = express();
app.use(express.static("public"))
app.set("view engine", 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req,res) => {
    res.render("index")
});

app.post("/upload", upload.single("image"), async(req, res) => {
    console.log(req.file);
    res.send("done")
});



const PORT = process.argv[2] || 7100
app.listen(PORT, () => {
    console.log(`server  listening on ${PORT}`)
})