const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;


const ImageSchema = new Schema({
    url: String,
    filename: String
}) 

ImageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/uploads', '/uploads/w_200/');
})
ImageSchema.virtual('card').get(function(){
    return this.url.replace('/uploads', '/uploads/ar_5:3,c_crop/');
})

const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
]
});

CampgroundSchema.post('findOneAndDelete', async function(campground){
    if(campground.reviews.length){
       await Review.deleteMany({_id: {$in: campground.reviews}});
    }
})


module.exports = mongoose.model('Campground', CampgroundSchema);