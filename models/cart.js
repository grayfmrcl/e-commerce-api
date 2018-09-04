const mongoose = require('mongoose');

const { Schema } = mongoose;

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: { type: Number, default: 1 },
    },
  ],
});

cartSchema.statics.findByUser = function findByUser(userId) {
  return this.findOne({ user: userId });
};

cartSchema.statics.addItem = function addItem(userId, product, quantity = 1) {
  return new Promise((resolve, reject) => {
    this.findOne({ user: userId })
      .then((cart) => {
        if (!cart) {
          this.create({
            user: userId,
            items: [{ product, quantity }],
          });
          resolve(cart.save());
        } else {
          const item = cart.items.find(i => i.product.equals(product));
          if (!item) {
            cart.items.push({ product, quantity });
          } else {
            item.quantity += quantity || 1;
          }
          resolve(cart.save());
        }
      })
      .catch(err => reject(err));
  });
};

module.exports = mongoose.model('Cart', cartSchema);
