import { User } from "../models/users.js";
import jwt from 'jsonwebtoken';

// Crear un nuevo usuario
export const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: 'Usuario creado con éxito', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario', error });
  }
};

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios', error });
  }
};

// Obtener un usuario por ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario', error });
  }
};

// Actualizar un usuario
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json({ message: 'Usuario actualizado', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error });
  }
};

// Eliminar un usuario
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json({ message: 'Usuario eliminado', user: deletedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario', error });
  }
};

// Inicia sesión con correo y contraseña
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, "+ ", password)
  try {
    // Verifica si el correo existe en la base de datos
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Compara la contraseña ingresada con la almacenada (sin usar bcrypt)
    if (password !== user.password) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Genera un token JWT para la autenticación
    const token = jwt.sign(
      { id: user._id, role: user.role },  // Datos que quieras incluir en el token
      process.env.JWT_SECRET,             // Secreto almacenado en las variables de entorno
      { expiresIn: '1h' }                 // Expiración del token
    );

    // Retorna el token al cliente junto con los datos del usuario
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};