import { Transaction } from "../models/transaction.js";

// Crear una nueva transacción
export const createTransaction = async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();
    res.status(201).json({ message: 'Transacción creada con éxito', transaction: newTransaction });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la transacción', error });
  }
};

// Obtener todas las transacciones
export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las transacciones', error });
  }
};

// Obtener una transacción por ID
export const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ message: 'Transacción no encontrada' });
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la transacción', error });
  }
};

// Actualizar una transacción
export const updateTransaction = async (req, res) => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTransaction) return res.status(404).json({ message: 'Transacción no encontrada' });
    res.status(200).json({ message: 'Transacción actualizada', transaction: updatedTransaction });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la transacción', error });
  }
};

// Eliminar una transacción
export const deleteTransaction = async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!deletedTransaction) return res.status(404).json({ message: 'Transacción no encontrada' });
    res.status(200).json({ message: 'Transacción eliminada', transaction: deletedTransaction });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la transacción', error });
  }
};