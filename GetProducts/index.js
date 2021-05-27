const createMongoClient = require('../shared/mongoClient');

module.exports = async function (context, req) {
  const { client: MongoClient, closeConnectionFn } =
    await createMongoClient();
  const Products = MongoClient.collection('products');
  const res = await Products.find({}); // traz tudo do banco

  const body = res.toArray();

  closeConnectionFn();
  context.res = {
    status: 200,
    body,
  }
}