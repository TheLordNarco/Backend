const Cart = require('../models/cartModel');

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    res.status(200).json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addItemToCart = async (req, res) => {
  const { productId, quantity, price } = req.body;
  const userId = req.user.id;

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, items: [] });

    const existingItem = cart.items.find(item => item.productId.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity, price });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeItemFromCart = async (req, res) => {
  const userId = req.user.id;
  const itemId = req.params.id;

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Carrinho não encontrado.' });

    cart.items = cart.items.filter(item => item._id.toString() !== itemId);
    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
