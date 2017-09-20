var mongoose = require('mongoose');
const MongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/shoeStock";
console.log(MongoURL);
mongoose.connect(MongoURL, {
  useMongoClient: true
});


var storeShoes = mongoose.model('storeShoes', {
  color: String,
  brand: String,
  price: Number,
  size: Number,
  in_stock: Number
 });

module.exports = storeShoes;
