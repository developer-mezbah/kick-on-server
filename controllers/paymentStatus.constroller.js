const { ProductOrder } = require("../models/product-order.model");
const SSLCommerzPayment = require("sslcommerz-lts");

function isLive() {
  if (process.env.IS_LIVE === "true") {
    return true;
  }
  if (process.env.IS_LIVE === "false") {
    return false;
  }
}

const paymentStatus = (req, res) => {
  try {
    const q = req.query.q;
    const tran_id = req.query.tran_id;
    const sslcz = new SSLCommerzPayment(
      process.env.STORE_ID,
      process.env.STORE_PASSWORD,
      isLive()
    );
    // get validation id through transection ID
    sslcz.transactionQueryByTransactionId({ tran_id }).then((data) => {
      if (data?.no_of_trans_found !== 0) {
        const validData = data?.element.find((item) => item.status === "VALID");
        // console.log(validData);

        // update payment status when pass validation with transiction ID
        if (validData.status === "VALID") {
          // ssl validation function for verify Payment
          sslcz.validate({ val_id: validData?.val_id }).then(async (data) => {
            if (data.status === "VALIDATED") {
              await ProductOrder.findOneAndUpdate(
                { tran_id: tran_id },
                { paymentStatus: true, paymentMethod: data?.card_issuer }
              );
            }
          });
        }
      } else {
        console.log(data);
      }
    });
    if (q === "success") {
      return res.redirect(
        process.env.CLIENT_BASE_URL + "/payment-status?q=success"
      );
    }
    if (q === "fail") {
      return res.redirect(
        process.env.CLIENT_BASE_URL + "/payment-status?q=fail"
      );
    }
    if (q === "cancel") {
      return res.redirect(
        process.env.CLIENT_BASE_URL + "/payment-status?q=cancel"
      );
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  paymentStatus,
};
