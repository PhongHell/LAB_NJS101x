const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {
    constructor(name, email) {
        this.name = name;
        this.email = email
    }

    save() {
        let db = getDb();
        return db.collection('users').insertOne(this);
    }

    static findById(userId) {
        let db = getDb();
        return db.collection('users').findOne({ _id: new ObjectId(userId) });
    }
}

module.exports = User;