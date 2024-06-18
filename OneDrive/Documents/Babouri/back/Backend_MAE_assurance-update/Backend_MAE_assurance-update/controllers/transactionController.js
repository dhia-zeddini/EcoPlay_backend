// import TransactionModel from '../models/transactionModel.js'; 



// export const createTransaction = async (req, res) => {
//   try {
//     const newTransaction = new TransactionModel(req.body);
//     await newTransaction.save();
//     res.status(201).send(newTransaction);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// };

// // Read all transactions
// export const getAllTransactions = async (req, res) => {
//   try {
//     const transactions = await TransactionModel.find().populate('user contract');
//     res.status(200).send(transactions);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// // Read a single transaction by ID
// export const getTransactionById = async (req, res) => {
//   try {
//     const transaction = await TransactionModel.findById(req.params.id).populate('user contract');
//     if (!transaction) {
//       return res.status(404).send();
//     }
//     res.status(200).send(transaction);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// // Update a transaction by ID
// export const updateTransaction = async (req, res) => {
//   try {
//     const transaction = await TransactionModel.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!transaction) {
//       return res.status(404).send();
//     }
//     res.status(200).send(transaction);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// };

// // Delete a transaction by ID
// export const deleteTransaction = async (req, res) => {
//   try {
//     const transaction = await TransactionModel.findByIdAndDelete(req.params.id);
//     if (!transaction) {
//       return res.status(404).send();
//     }
//     res.status(200).send(transaction);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };
