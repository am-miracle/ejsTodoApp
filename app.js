const express = require("express")
const bodyParser = require("body-parser");

const app = express();
app.set('view engine', 'ejs');

const port = 3000;

app.get("/", (req, res) => {
    const today = new Date();
    const currentDay = today.getDay()
    if(currentDay === 0 || currentDay === 6){
        res.write("<h1>Yeah, it's a weekend!</h1>")
    } else {
         res.sendFile(__dirname + "/index.html")
    }
})



app.listen(port, () => {
    console.log(`server running on port ${port}`)
})