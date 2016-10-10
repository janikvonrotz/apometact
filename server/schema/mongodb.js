
const typeDefinitions = {}

typeDefinitions.type = `
type Deal {
  id: String
  title: String
  description: String
  categoryId: String
  category: Category
  productDetails: String
  itemUrl: String
  imageUrl: String
  qrImageUrl: String
  pointOfSale: [String]
  publishAt: Date,
  expiresAt: Date,
  createdAt: Date
}
type Category {
  id: String
  label: String
  createdAt: Date
}
type User{
  facebookId: String
  firstName: String
  lastName: String
  gender: String
  savedDeals: [String]
}
`;

typeDefinitions.mutation = `
createDeal(
  title: String
  description: String
  categoryId: String
  productDetails: String
  itemUrl: String
  imageUrl: String
  qrImageUrl: String
  pointOfSale: [String]
  categoryId: String
  publishAt: Date
  expiresAt: Date
  createdAt: Date
): Deal
deleteDeal(
  id: String
): String
updateDeal(
  id: String
  title: String
  description: String
  categoryId: String
  productDetails: String
  itemUrl: String
  imageUrl: String
  qrImageUrl: String
  pointOfSale: [String]
  categoryId: String
  publishAt: Date
  expiresAt: Date
  createdAt: Date
): String

createCategory(
  label: String
): Category
deleteCategory(
  id: String
): String
updateCategory(
  id: String
  label: String
): String
`;

export default typeDefinitions;
