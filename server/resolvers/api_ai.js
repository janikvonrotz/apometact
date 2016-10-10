import { Entities } from '../connectors';

const resolver = {
  Query: {
    entities(root, args) {
      return Entities.getAll();
    },
    entity(root, args) {
      return Entities.get(args.id);
    }
  },
  RootMutation: {
    createEntityEntries(root, { id, entries }) {
      return Entities.createEntries(id, entries);
    },
    updateEntityEntries(root, {id, entries}) {
      console.log(id, entries);
      return Entities.updateEntries(id, entries);
    }
  }
}

export default resolver;
