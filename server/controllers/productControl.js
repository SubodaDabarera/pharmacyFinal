const Products = require("../models/productModel");
const Inventories = require("../models/InventoryModel");

const productControl = {
  getProducts: async (req, res) => {
    try {
      // const products = await Products.find()

      // res.json({products})

      const products = await Inventories.find();
      res.json({ products });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  reviews: async (req, res) => {
    try {
      const { rating } = req.body;

      if (rating && rating !== 0) {
        const product = await Inventories.findById(req.params.id);

        if (!product)
          return res.status(400).json({ msg: "Product does not exist." });

        let num = product.numReviews;
        let rate = product.rating;

        await Inventories.findOneAndUpdate(
          { _id: req.params.id },
          {
            rating: rate + rating,
            numReviews: num + 1,
          }
        );
        res.json({ msg: "Update success", rate, num });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  filterProduct: async (req, res) => {
    const { condition } = req.query;
    console.log(condition);
    try {
      const result = await Inventories.find({ category: condition });
      console.log(result);
      res.json(result);
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  },
};

module.exports = productControl;
