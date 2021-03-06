const createMongoClient = require('../shared/mongoClient');
const { ObjectId } = require('mongodb');

module.exports = async function (context, req) {
    const { id } = req.params;
    const product = req.body;

    const { client: MongoClient, closeConnectionFn } =
        await createMongoClient();
    const Products = MongoClient.collection('products');
    const res = await Products.findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: product },
    );

    closeConnectionFn();
    context.res = {
        status: 301,
        body: res
    }
}