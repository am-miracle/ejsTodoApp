const express = require("express")
const bodyParser = require("body-parser");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static("public"))

const port = 3000;
let items = ["Wake Up", "Pray", "Learn Blockchain"]
let workItems = []

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
        listTitle: day,
        newListItems: items
    })

})

app.post("/", (req, res) => {
    let item = req.body.newItem

    if(req.body.list === "Work"){
        workItems.push(item)
        res.redirect('/work')
    } else{
        items.push(item)
        res.redirect('/')
    }
})

app.get("/work", (req, res) => {
    res.render('list', {
        listTitle: "Work List",
        newListItems: workItems
    });
})

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})