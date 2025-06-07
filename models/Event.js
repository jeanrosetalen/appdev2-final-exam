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
        _userId: {
            type: new mongoose.Types.ObjectId(),
            ref: 'User',
        }

    }
)

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;