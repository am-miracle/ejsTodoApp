const express = require("express")
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const _ = require("lodash");
dotenv.config({ path: '.env' });
// const date = require(__dirname + "/date.js")

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static("public"))

dotenv.config({ path: '.env' });

mongoose.connect(process.env.CONNECTION_URL);


const itemSchema = {
    name: String
}

const Item = mongoose.model("Item", itemSchema)

const item1 = new Item({
    name: "Wake up, and say a prayer"
})
const item2 = new Item({
    name: "Learn Web dev"
})
const item3 = new Item({
    name: "Learn Blockchain dev"
})

const defaultItem = [item1, item2, item3]

const listSchema = {
    name: String,
    items: [itemSchema]
}

const List = mongoose.model("List", listSchema)

const port = 3000;

app.get("/", (req, res) => {

    Item.find({}, (err, foundItems) =>{
        if (foundItems.length === 0) {
            Item.insertMany(defaultItem, (err) => {
                if (err) {
                    console.log(err)
                } else{
                    console.log("Successfully added to the database")
                }
            })
            res.redirect("/");
        } else {
            res.render('list', {
                // listTitle: day,
                listTitle: "Today",
                newListItems: foundItems
            })
        }
    })
    // let day = date.getDate();

})

app.get("/:customListName", (req, res) => {
    const customListName = _.capitalize(req.params.customListName);

    List.findOne({ name: customListName}, (err, foundList) => {
        if(!err){
            if(!foundList){
                // create a new list
                const list = new List({
                    name: customListName,
                    items: defaultItem
                })
                list.save();
                res.redirect("/" + customListName)
            }
            else{
                // show an existing list
                res.render("list", {listTitle: foundList.name , newListItems: foundList.items})
            }
        }
    })
})

app.post("/", (req, res) => {
    const itemName = req.body.newItem;
    const listName = req.body.list;

    const item = new Item({name: itemName});

    if(listName === "Today"){
        item.save()
        res.redirect("/")
    }
    else{
        List.findOne({name: listName}, (err, foundList) => {
            foundList.items.push(item);
            foundList.save();
            res.redirect("/" + listName)
        })
    }

    // if(req.body.list === "Work"){
    //     workItems.push(item)
    //     res.redirect('/work')
    // } else{
    //     items.push(item)
    //     res.redirect('/')
    // }
})

app.post("/delete", (req, res) => {
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;

    if (listName === "Today") {
        Item.findByIdAndRemove(checkedItemId, (err) => {
            if(!err) {
                console.log("Successfully deleted item");
                res.redirect("/")
            }
        })
    } else {
        List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, (err, foundList) => {
            if(!err){
                res.redirect("/" + listName)
            }
        })
    }
})

// app.get("/work", (req, res) => {
//     res.render('list', {
//         listTitle: "Work List",
//         newListItems: workItems
//     });
// })



app.listen(port, () => {
    console.log(`server running on port ${port}`)
})