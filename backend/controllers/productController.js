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

// TODO:CODIGO SACADO DE CLAUDE 
// const removeProduct = async (req, res) => {
//   try {
//     const { id } = req.body;
    
//     // Verificar si se proporcionó un ID
//     if (!id) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Product ID is required" 
//       });
//     }

//     // Verificar si el producto existe antes de intentar eliminarlo
//     const product = await productModel.findById(id);
//     if (!product) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Product not found" 
//       });
//     }

//     // Eliminar el producto
//     await productModel.findByIdAndDelete(id);
    
//     // También podrías eliminar las imágenes de Cloudinary aquí
//     if (product.image && product.image.length > 0) {
//       try {
//         await Promise.all(
//           product.image.map(async (imageUrl) => {
//             // Extraer el public_id de la URL de Cloudinary
//             const publicId = imageUrl.split('/').pop().split('.')[0];
//             await cloudinary.uploader.destroy(publicId);
//           })
//         );
//       } catch (cloudinaryError) {
//         console.error('Error deleting images from Cloudinary:', cloudinaryError);
//         // Continuar ya que el producto se eliminó correctamente
//       }
//     }

//     res.json({ 
//       success: true, 
//       message: "Product removed successfully" 
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ 
//       success: false, 
//       message: error.message 
//     });
//   }
// };

//controller function for single  product details
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

export { addProduct, removeProduct, singleProduct, listProduct };
