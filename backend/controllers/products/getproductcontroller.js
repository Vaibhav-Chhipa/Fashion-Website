const mongoose = require("mongoose");
const ProductCollection = require("../../models/ProductSchema");
const getproductcontroller = async (req, res) => {
  try {
    const { category, name, sub_category, id } = req.params;
    let products;
    if (category) {
      const searchcatagory = category.toLowerCase();
      products = await ProductCollection.find({
        category: { $regex: new RegExp(searchcatagory,"i") },
      });
    }
    else if (name) {
      const searchname = name.toLowerCase();
      products = await ProductCollection.find({
        name: { $regex: new RegExp(searchname,"i") },
      });
    }
    else if (sub_category) {
      const searchsubcategory = sub_category.toLowerCase();
      products = await ProductCollection.find({
        sub_category: { $regex: new RegExp(searchsubcategory,"i") },
      });
    }
    else if (id) {
      products = await ProductCollection.find({
        _id: id,
      });
    }
    else if (req.path.includes("/random")) {
      products = await ProductCollection.aggregate([
        {
          $sample: {
            size : 9,
          },
        },
      ]);
    }
    else if (req.path.includes("/top-rated")) {
      products = await ProductCollection.find().sort({rating:-1}).limit(9);
    }
    else if (req.path.includes("/lowtohigh")) {
      products = await ProductCollection.find().sort({new_price: 1}).limit(9);
    }
    else if (req.path.includes("/hightolow")) {
      products = await ProductCollection.find().sort({new_price: -1}).limit(9);
    }
    else {
      products = await ProductCollection.find()
      console.log("Product Fetched Successfully");
    }
    if(!products || products.length === 0)
    return res.status(404).send({
    message:"Product not found"
    });
    res.status(200).send(products)
  } catch (error) {
    res.status(504).send({
      message: "Error fetching products",
    });
    console.log(`Error Occured : ${error}`)
  }
};
module.exports = getproductcontroller;