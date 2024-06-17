const mongoose = require('mongoose');
const Campground = require('../models/campground'); 
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')

const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl)
    .then(() => {
        console.log("DATABASE CONNECTED :)")
    })
    .catch((err) => {
        console.log("ERROR!!!")
        console.log(err)
    })

const name = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i=0; i<50; i++){
        const rand = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: '664c2e730a0637baeb3e473c',
            location: `${cities[rand].city}, ${cities[rand].state}`,
            title: `${name(descriptors)}  ${name(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
            price,
            images:[
                {
                    url: 'https://res.cloudinary.com/dvew2wzga/image/upload/v1716445419/YelpCamp/ozzuvnr2uxfycez1wwvi.jpg',
                    filename: 'YelpCamp/ozzuvnr2uxfycez1wwvi'
                },
                {
                    url: 'https://res.cloudinary.com/dvew2wzga/image/upload/v1716445419/YelpCamp/mfrf6fqiedpz9elpxgpi.jpg',
                    filename: 'YelpCamp/mfrf6fqiedpz9elpxgpi'
                }
            ]
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})

