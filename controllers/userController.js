const User = require('../models/userModel');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: 'Usuário registrado com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.approveUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    user.status = 'active';
    await user.save();
    res.status(200).json({ message: 'Usuário aprovado com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
