import cartM from "../models/CartM.js";
import dotenv from 'dotenv';
import ProduitM from "../models/ProductM.js";

/*
// Add a product to a cart
async function addToCart(req, res) {
  try {
    const cartId = req.body.cartId;
    const productId = req.body.productId;

    // Check if the cart and product exist
    const cart = await CartM.findById(cartId);
    const product = await ProductM.findById(productId);

    if (!cart || !product) {
      res.status(404).json({ message: 'Cart or product not found' });
      return;
    }

    // Set the product in the cart's 'product' attribute
    cart.product = product;
    await cart.save();

    res.status(200).json({
      message: 'Product added to cart successfully',
      cart,
    });
  } catch (error) {
    res.status(500).json('An error has occurred');
  }
}

// Remove a product from a cart
async function removeFromCart(req, res) {
  try {
    const cartId = req.params.cartId;

    // Check if the cart exists
    const cart = await CartM.findById(cartId);

    if (!cart) {
      res.status(404).json({ message: 'Cart not found' });
      return;
    }

    // Remove the product from the cart's 'product' attribute
    cart.product = null;
    await cart.save();

    res.status(200).json({
      message: 'Product removed from cart successfully',
      cart,
    });
  } catch (error) {
    res.status(500).json('An error has occurred');
  }
}

export { createCart, getCartById, updateCart, deleteCart, addToCart, removeFromCart };*/




// controllers/cartController.mjs

// Add a new
async function addCart(req, res) {
    try {
        var { userId, totalC ,products} = req.body;

        // Create a new cart
        var newCart = new cartM({
            // User: userId, // You should get the user ID from your authentication system
             products: [], // Initialize the products array as empty
            totalC: totalC || 0, // Set an initial total or set to 0
        });

        await newCart.save();

        res.status(201).json({
            message: 'Cart added successfully',
            cart: newCart,
        });
    } catch (error) {
        res.status(500).json('An error has occurred');
    }
}
async function getPById(req, res) {
  try {
    const cartId = req.body.cartId;
    const cart = await cartM.findById(cartId).populate('product');

    // Assuming 'product' is correctly set up in your Mongoose schema to reference products
    const products = cart.product;  // This will give you the array of populated products

    // Return just the list of products for this cart
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "An error has occurred!" });
  }
}

/*
async function getPById(req, res) {
  try {
    const cartId = req.body.cartId;
    const cart = await cartM.findById(cartId);
    const listC = await cartM.find().populate('product')

    res.json({
      listC
    });
  } catch (error) {
    res.status(500).json("An error has occurred!");
  }
}
*/
async function getAllC(req, res) {
  try {
    const listC = await cartM.find().populate('product');
    res.status(200).json(listC);
  } catch (error) {
    console.error(error); // Log the error to the console for debugging
    res.status(500).json({ message: "An error has occurred!", error: error.message });
  }
}



async function addProductToCart(req, res) {
    try {
        const cartId = req.body.cartId;
        const productId = req.body.productId;
        const cart = await cartM.findById(cartId);
        if (!cart) {
            // throw new Error('User not found');
            res.status(404).json({ message: "cart not found" });
        }

        const product = await ProduitM.findById(productId);

        if (!product) {
            // throw new Error('Contact not found');
            res.status(404).json({ message: "product not found" });
        } else {
            if (cart.product) {
                cart.product.push(product);
                await cart.save();
            } else {
                await cart.updateOne({ product: [cart] });
            }
        }

        res.status(200).json({ message: "product added successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


async function removeProductToCart (req, res)  {
  try {
    const cartId = req.body.cartId;
    const productId = req.body.productId;
    const cart = await cartM.findById(cartId);
    if (!cart) {
      // throw new Error('User not found');
      res.status(404).json({ message: "cart not found" });
    }
 
    cart.product = cart.product.filter(
      (existingproduct) => existingproduct.toString() !== productId
    );
 
    await cart.save();
 
    res.status(200).json({ message: "Product removed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export { addCart, addProductToCart ,removeProductToCart,getAllC,getPById};
