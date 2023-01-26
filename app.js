const express = require("express")
const bodyParser = require("body-parser");

const app = express();
app.set('view engine', 'ejs');

const port = 3000;

app.get("/", (req, res) => {
    const today = new Date();
    const currentDay = today.getDay()
    let day = ''

    switch (currentDay) {
        case 0:
            day = 'Sunday'
            break
        case 1:
            day = 'Monday'
            break
        case 2:
            day = 'Tuesday'
            break
        case 3:
            day = 'Wednesday'
            break
        case 4:
            day = 'Thursday'
            break
        case 5:
            day = 'Friday'
            break
        case 6:
            day = 'Saturday'
            break
        default:
            console.log(`Error: current day is equal to: ${currentDay}`);
            //  throw Error;
    }

    // if(currentDay === 0){
    //     day = 'Sunday'
    // }
    // else if(currentDay === 1){
    //     day = 'Monday'
    // }
    // else  if(currentDay === 2){
    //     day = 'Tuesday'
    // }
    // else  if(currentDay === 3){
    //     day = 'Wednesday'
    // }
    // else  if(currentDay === 4){
    //     day = 'Thursday'
    // }
    // else  if(currentDay === 5){
    //     day = 'Friday'
    // }
    // else  if(currentDay === 6){
    //     day = 'Saturday'
    // }
    res.render('list', {KindOfDay: day})

})



app.listen(port, () => {
    console.log(`server running on port ${port}`)
})