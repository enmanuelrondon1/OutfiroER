import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

//controller function for adding a products

const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, popular } =
      req.body;

    //Extracting images if provided
    const image1 = req.files.image1?.[0];
    const image2 = req.files.image2?.[0];
    const image3 = req.files.image3?.[0];
    const image4 = req.files.image4?.[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    //Upload images to cloudinary or use a default image
    let imagesUrl;
    if (images.length > 0) {
      imagesUrl = await Promise.all(
        images.map(async (item) => {
          const result = await cloudinary.uploader.upload(item.path, {
            resource_type: "image",
          });
          return result.url;
        })
      );
    } else {
      //default image URL if no image is provided
      imagesUrl = ["https://via.placeholder.com/150"];
    }
    //create product data
    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      popular: popular === "true" ? true : false,
      sizes: sizes ? JSON.parse(sizes) : [], // Default to empty array if sizes nor provided
      image: imagesUrl,
      date: Date.now(),
    };

    console.log(productData);

    const product = new productModel(productData);
    await product.save();
    res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// controller function for removing a product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};



const singleProduct = async (req, res) => {
  try {
    const {productId} = req.body
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//controller function for product list
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// controller function for updating a product
const updateProduct = async (req, res) => {
  try {
    const { _id, name, description, price, category, subCategory, sizes, popular } = req.body;

    // Verifica si se proporcionaron nuevas imágenes
    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imagesUrl;
    if (images.length > 0) {
      // Subir nuevas imágenes a Cloudinary
      imagesUrl = await Promise.all(
        images.map(async (item) => {
          const result = await cloudinary.uploader.upload(item.path, {
            resource_type: "image",
          });
          return result.url;
        })
      );
    }

    // Crear el objeto con los datos actualizados
    const updateData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      popular: popular === "true" ? true : false,
      sizes: sizes, // No necesitas convertir a JSON, ya es un array
      date: Date.now(),
    };

    // Si hay nuevas imágenes, agregarlas al objeto de actualización
    if (imagesUrl) {
      updateData.image = imagesUrl;
    }

    // Actualizar el producto en la base de datos
    const updatedProduct = await productModel.findByIdAndUpdate(
      _id,
      updateData,
      { new: true } // Devuelve el documento actualizado
    );

    res.json({ success: true, message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, removeProduct, singleProduct, listProduct, updateProduct };
