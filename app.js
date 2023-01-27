const express = require("express")
const bodyParser = require("body-parser");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static("public"))

const port = 3000;
let items = ["Wake Up", "Pray", "Learn Blockchain"]

app.get("/", (req, res) => {
    const today = new Date();
    const currentDay = today.getDay()
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'short'
    }
    let day = today.toLocaleDateString("en-US", options);

    res.render('list', {
        KindOfDay: day,
        newListItems: items
    })

})

app.post("/", (req, res) => {
    let item = req.body.newItem
    items.push(item)
    res.redirect('/')
})

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})