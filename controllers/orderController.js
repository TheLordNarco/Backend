const Order = require('../models/orderModel');

exports.getPendingOrders = async (req, res) => {
  try {
    const orders = await Order.find({ status: 'pending' }).populate('products.productId');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.processOrder = async (req, res) => {
  const orderId = req.params.id;

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Pedido não encontrado.' });

    order.status = 'processed';
    await order.save();
    res.status(200).json({ message: 'Pedido processado com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.cancelOrder = async (req, res) => {
  const orderId = req.params.id;

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Pedido não encontrado.' });

    order.status = 'cancelled';
    await order.save();
    res.status(200).json({ message: 'Pedido cancelado com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
