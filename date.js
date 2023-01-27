

const getDate = () => {
    const today = new Date();

    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'short'
    }

    let day = today.toLocaleDateString("en-US", options);

    return day
}
module.exports.getDate =  getDate


const getDay = () => {
    let today = new Date();

    let options = {
        weekday: 'long'
    }

    let day = today.toLocaleDateString("en-US", options)

    return day
}

module.exports.getDay = getDay