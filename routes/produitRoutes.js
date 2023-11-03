import express from 'express';
import { body } from 'express-validator'; // Import the 'body' object

///import {getAll,addP,deleteP,getPbyname,updateP } from '../controllers/ProduitC.js';
/*
const router = express.Router();

// Create a new product
router.post(
  '/products',
  [
    // Add validation if needed using express-validator
    body('nameP').not().isEmpty().withMessage('Name is required'),
    body('descriptionP').not().isEmpty().withMessage('Description is required'),
    body('image').not().isEmpty().withMessage('Image is required'),
    body('priceP').not().isEmpty().withMessage('Price is required'),
    body('typeP').not().isEmpty().withMessage('Type is required'),
  ],
  addP
);

// Get all products
router.get('/products', getAll);

// Get a product by name
router.get('/products/:name', getPbyname);

// Update a product by name
router.put('/products/:name', updateP);

// Delete a product by name
router.delete('/products/:name', deleteP);

export default router;

/*
router.post(
  '/products',
  [
    // Add validation if needed using express-validator
    body('nameP').not().isEmpty().withMessage('Name is required'),
    body('descriptionP').not().isEmpty().withMessage('Description is required'),
    body('image').not().isEmpty().withMessage('Image is required'),
    body('priceP').not().isEmpty().withMessage('Price is required'),
    body('typeP').not().isEmpty().withMessage('Type is required'),
  ],
  addP
);

router
  .route('/')
  .get(getAll)
  .post(addP);
router.post()
router
  .route('/:name')
  .get(getPbyname)
  .put(updateP)
  .delete(deleteP);
*/





/*
  // Add a new product with validation
  router.post('/products/add', [
    // Use your validation middleware here
    // e.g., yourValidationMiddleware for validating the request body
  ], (req, res) => {
    // Trouver les erreurs de validation dans cette requête et les envelopper dans un objet
    if (!validationResult(req).isEmpty()) {
      res.status(400).json({ errors: validationResult(req).array() });
    } else {
      // Invoquer la méthode create directly on the model
      ProduitM.create({
        nameP: req.body.nameP,
        descriptionP: req.body.descriptionP,
        priceP: req.body.priceP,
        typeP: req.body.typeP,
        // Récupérer l'URL de l'image pour l'insérer dans la BD
        // image: `${req.protocol}://${req.get('host')}/img/${req.file.filename}`
      })
        .then(newProduit => {
          res.status(200).json(newProduit);
        })
        .catch(err => {
          res.status(500).json({ error: err });
        });
    }
  });

  





/*

router
  .route('/')
  .get(getAll)
  .post(addP);
  router
  .route('/:name')
  .get(getOnce)
  .put(putAll)
  .patch(patchOnce)
  .delete(deleteOnce);*/

import { Router } from 'express';
import {
  addP,
  getPById,
  getAllP,
  updateP,
  deleteP,
} from '../controllers/ProduitC.js';
const router = Router();

// Create a new producSt
router.post('/add', addP);

// Get a product by ID
router.get('/', getPById);

// Get all products
router.get('/getall', getAllP);

// Update a product by ID
router.put('/', updateP);

// Delete a product by ID
router.delete('/', deleteP);

export default router;