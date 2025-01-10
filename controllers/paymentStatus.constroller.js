const { ProductOrder } = require("../models/product-order.model");

const paymentStatus = async (req, res) => {
  const q = req.query.q;

  if (q === "success") {
    const tran_id = req.query.tran_id;
    await ProductOrder.findOneAndUpdate(
      { tran_id: tran_id },
      { paymentStatus: true }
    );
    return res.redirect(
      process.env.CLIENT_BASE_URL + "/payment-status?q=success"
    );
  }
  if (q === "fail") {
    return res.redirect(process.env.CLIENT_BASE_URL + "/payment-status?q=fail");
  }
  if (q === "cancel") {
    return res.redirect(
      process.env.CLIENT_BASE_URL + "/payment-status?q=cancel"
    );
  }
};

module.exports = {
  paymentStatus,
};
