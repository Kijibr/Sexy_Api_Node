const createMongoClient = require('../shared/mongoClient');
const { ObjectId } = require('mongodb');

module.exports = async function (context, req) {
    const product = req.body;

    const { client: MongoClient, closeConnectionFn } =
        await createMongoClient();
    const Products = MongoClient.collection('products');

    const res = await Products.findOneAndDelete({ _id: ObjectId(id) });

    closeConnectionFn();
    context.res = {
        status: 200,
        body: res
    };
}