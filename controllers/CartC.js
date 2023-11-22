import cartM from "../models/CartM.js";
import dotenv from 'dotenv';
import stripeModule from 'stripe';
const secretKey = process.env.KEYSTRIPE;
const stripe = stripeModule(process.env.KEYSTRIPE);
import ProduitM from "../models/ProductM.js";

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

async function pay(req, res) {
  try {
    const { totalC } = req.body; // Get the total amount from the request body
    console.log('Creating payment intent with amount:', totalC); // Log the amount for debugging
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalC, // Use the passed total amount
      currency: 'usd', // Assuming the currency is still euro
    });
    console.log('Payment intent created:', paymentIntent); // Log the successful creation
    return res.json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error during payment:', error); // Log the full error
    if (!res.headersSent) {
      return res.status(500).json({ error: 'Erreur lors du paiement' });
    }
  }
}


async function getPById(req, res) {
  console.log("im in");
  try {
    // const cartId = req.body.cartId;
    const cart = await cartM.findOne({User:req.user}).populate('product');

    // Assuming 'product' is correctly set up in your Mongoose schema to reference products
    const products = cart.product;  // This will give you the array of populated products

    // Return just the list of products for this cart
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "An error has occurred!" });
  }
}


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
      // const cartId = req.body.cartId;
      const productId = req.body.productId;
      const cart = await cartM.findOne({User:req.user});
      if (!cart) {
          return res.status(404).json({ message: "Cart not found" });
      }

      const product = await ProduitM.findById(productId);
      if (!product) {
          return res.status(404).json({ message: "Product not found" });
      } else {
          // Check if the product is already in the cart
          const productExistsInCart = cart.product.some(p => p._id.equals(productId));

          // If the product is not in the cart, add it
          if (!productExistsInCart) {
              cart.product.push(product);
              await cart.save();
              res.status(200).json({ message: "Product added successfully" });
          } else {
              // If the product is already in the cart, inform the user
              res.status(409).json({ message: "Product already in cart" });
          }
      }
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}

async function removeProductToCart (req, res)  {
  try {
    // const cartId = req.body.cartId;
    const productId = req.body.productId;
    const cart = await cartM.findOne({User:req.user});
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



//////////////////////////////////////////////////////////////////::
async function calculateCartTotal(req, res) {
  try {
    // const cartId = req.body.cartId;
    const cart = await cartM.findOne({User:req.user}).populate('product');  // Make sure 'products' is the correct path

    if (!cart) {
      res.status(404).json({ message: 'Cart not found' });
      return;
    }

    // Calculate the total by summing the price of each product
    let totalC = 0;
    for (let product of cart.product) {
      totalC += parseFloat (product.priceP);  // Assuming the product model has a 'price' field
    }

    // Update the totalC in the cart
    cart.totalC = totalC;
    await cart.save();

    res.status(200).json({
      message: 'Total calculated successfully',
      total: totalC.toFixed(2), // Converts number to string with 2 decimal places
      cart
    });
  } catch (error) {
    res.status(500).json({ message: 'An error has occurred', error: error.message });
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////

export { addCart, addProductToCart ,removeProductToCart,getAllC,getPById,calculateCartTotal,pay};