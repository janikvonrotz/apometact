import Mongoose, { Schema } from 'mongoose';
import config from '/imports/config.js';

Mongoose.Promise = global.Promise;
const mongo = Mongoose.connect(`mongodb://${config.MONGODB.USER}@${config.MONGODB.URL}`);

var DealsSchema = new Schema({
  title: String,
  description: String,
  productDetails: String,
  categoryId: {type: mongo.Schema.ObjectId, ref : 'Categories' },
  itemUrl: String,
  imageUrl: String,
  qrImageUrl: String,
  pointOfSale: [String],
  publishAt: Date,
  expiresAt: Date,
  createdAt: Date
});
var Deals = mongo.model('Deals', DealsSchema);

var CategoriesSchema = new Schema({
  label: String,
  createdAt: Date
});
var Categories = mongo.model('Categories', CategoriesSchema);

var UsersSchema = new Schema({
  facebookId: String,
  firstName: String,
  lastName: String,
  gender: String,
  savedDeals: [{type : mongo.Schema.ObjectId, ref : 'Deals' }]
})
var Users = mongo.model('User', UsersSchema);

export { Deals, Categories, Users };
