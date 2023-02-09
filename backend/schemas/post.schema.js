const {Schema, model} = require("mongoose");

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, "A post title is required for all posts"],
    },
    content:{
        type: String,
        required: [true, "A post content should never be empty"],
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: [true, "User must be attached to all posts made"],
    },

}, {timestamps});


module.exports = model("Post", postSchema);