import { Users, Deals, Categories } from '../connectors';

const resolvers = {
  Query: {
    deals(root, args){
      return Deals.find({}).then((items) => {
        return items.map((item) => {
          item.id = item._id;
          return item;
        });
      });
    },
    deal(root, args){
      return Deals.findOne({_id: args.id}).then((item) => {
        // console.log("get expiresAt", item.expiresAt)
        item.id = item._id;
        return item;
      });
    },

    categories(root, args){
      return Categories.find({}).then((items) => {
        return items.map((item) => {
          item.id = item._id;
          return item;
        });
      });
    },
    category(root, args){
      return Categories.findOne({_id: args.id}).then((item) => {
        item.id = item._id;
        return item;
      });
    },

    users(root, args){
      return Users.find({}).then((items) => {
        return items.map((item) => {
          return item;
        });
      });
    },
  },

  Deal: {
    category(deal){
      return Categories.findOne({_id: deal.categoryId}).then((item) => {
        item.id = item._id;
        return item;
      });
    }
  },

  Date: {
    __parseValue(value) {
      return new Date(value); // value from the client
    },
    __serialize(value) {
      return value.toUTCString(); // value sent to the client
    },
    __parseLiteral(ast) {
      return ast.value;
    },
  },

  RootMutation: {
    createDeal(root, args){
      var item = new Deals(args);
      item.createdAt = new Date();
      // item.publishAt.setHours(0,0,0,0);
      // item.expiresAt.setHours(0,0,0,0);
      return item.save().then((response) => {
        return {id: response._id}
      });
    },
    deleteDeal(root, args){
      return Deals.findOne({_id: args.id}).then((item) => {
        return item.remove().then( (response) => {
          return "success"
        })
      });
    },
    updateDeal(root, args){
      return Deals.findOne({_id: args.id}).then((item) => {
        item = Object.assign(item, args);
        // item.publishAt.setHours(0,0,0,0);
        // item.expiresAt.setHours(0,0,0,0);
        // console.log("update expiresAt", item.expiresAt)
        return item.save().then((response) => {
          return "success"
        })
      });
    },

    createCategory(root, args){
      var item = new Categories(args);
      item.createdAt = new Date()
      return item.save().then((response) => {
        return {id: response._id}
      });
    },
    deleteCategory(root, args){
      return Categories.findOne({_id: args.id}).then((item) => {
        return item.remove().then( (response) => {
          return "success"
        })
      });
    },
    updateCategory(root, args){
      return Categories.findOne({_id: args.id}).then((item) => {
        item = Object.assign(item, args)
        return item.save().then((response) => {
          return "success"
        })
      });
    },
  }
};

export default resolvers;
