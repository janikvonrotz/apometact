const typeDefinitions = {}

typeDefinitions.type = `
type Entity {
  id: String
  name: String
  isOverridable: Boolean
  entries: [Entry]
}
type Entities {
  id: String
  name: String
  count: Int
  preview: String
}
type Entry {
  value: String
  synonyms: [String]
}
input InputEntry {
  value: String
  synonyms: [String]
}
`
typeDefinitions.mutation = `
createEntityEntries(
  id: String!
  entries: [InputEntry]!
): [Entry]
updateEntityEntries(
  id: String!
  entries: [InputEntry]!
): [Entry]
`;

export default typeDefinitions;
