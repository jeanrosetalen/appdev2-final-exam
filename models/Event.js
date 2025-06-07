const mongoose = require('mongoose')

const eventSchema = mongoose.Schema(
    {
        title: {
            type: String
        },
        location: {
            type: String
        },
        date: {
            type: Date
        },
        desciption: {
            type: String
        },
        userId: {
            type: mongoose.Types.ObjectId(),
            ref: 'User',
        }

    }
)