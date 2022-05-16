const mongoose = require('mongoose');

const info = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true
    },
    project: {
        type: String,
    }
}, {
    timestamps: true
}
);

const Info = mongoose.model("Info", info);
module.exports = Info;

