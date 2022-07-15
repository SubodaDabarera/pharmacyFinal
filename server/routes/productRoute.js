const router = require("express").Router();
const { model } = require("mongoose");
const productControl = require("../controllers/productControl");

router.get("/products", productControl.getProducts);
router.patch("/products/:id", productControl.reviews);

// get product of categories
router.get("/products/category", productControl.filterProduct);

module.exports = router;
