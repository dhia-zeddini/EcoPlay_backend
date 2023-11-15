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

async function pay (req, res) {
  try {
    // Gérez le paiement ici en utilisant la bibliothèque de la passerelle choisie
    // Exemple avec Stripe :
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // Montant en centimes
      currency: 'eur',
    });

    res.json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Erreur lors du paiement :', error.message);
    res.status(500).json({ error: 'Erreur lors du paiement' });
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
}


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



//////////////////////////////////////////////////////////////////::
async function calculateCartTotal(req, res) {
  try {
    const cartId = req.body.cartId;
    const cart = await cartM.findById(cartId).populate('product');  // Make sure 'products' is the correct path

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
