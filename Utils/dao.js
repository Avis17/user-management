const Mongo = require("mongodb");
const { MongoClient, ObjectId } = Mongo;
var db;

//url for local mongo
const uri = "mongodb://localhost:27017";

//url for online mongo
// const uri = "mongodb+srv://";


//mongodb connection
let connect = () => {
  return new Promise((resolve, reject) => {
    try{
      MongoClient.connect(
        uri,
        { useUnifiedTopology: true, useNewUrlParser: true },
        function (err, dbInstance) {
          if (err) return reject(err);
          db = dbInstance.db("user-management");
          return resolve("user-management");
        }
      );
    }catch (error) {
      return reject("Internal Server error");
    }

  });
};

//method to query the documents 
let query = (collectionName, query) => {
  return new Promise((resolve, reject) => {
    let collection = db.collection(collectionName);
    collection.find(query).toArray((err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

//method to insert a single document
let insert = (collectionName, data) => {
  return new Promise((resolve, reject) => {
    let collection = db.collection(collectionName);
    collection.insertOne(data, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

//method to update a single document
let update = (collectionName, query, udpateData) => {
  return new Promise((resolve, reject) => {
    let collection = db.collection(collectionName);
    // console.log("coming");
    collection.updateOne({"_id":new ObjectId(query)}, {$set:udpateData}, (err, result) => {
      // console.log(err, result);
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

//method to delete a single document
let deleteItem = (collectionName, query) => {
  return new Promise((resolve, reject) => {
    let collection = db.collection(collectionName);
    collection.deleteOne({"_id":new ObjectId(query)}, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};


module.exports = {
  connect,
  query,
  insert,
  update,
  deleteItem
};
