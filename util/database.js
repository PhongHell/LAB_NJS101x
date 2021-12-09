const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect('mongodb+srv://ThanhPhong:23lOQy6qMnphokd2@cluster0.n29hy.mongodb.net/funix_course?retryWrites=true&w=majority')
    .then((results) => {
      console.log('connected');
      callback(results);
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = mongoConnect;
