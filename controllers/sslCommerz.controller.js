const SSLCommerzPayment = require("sslcommerz-lts");
const { ProductOrder } = require("../models/product-order.model");
const { Product } = require("../models/product");
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;

function createRandomString(length) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const randomArray = new Uint8Array(length);
  crypto.getRandomValues(randomArray);
  randomArray.forEach((number) => {
    result += chars[number % chars.length];
  });
  return result;
}

function isLive() {
  if (process.env.IS_LIVE === "true") {
    return true;
  }
  if (process.env.IS_LIVE === "false") {
    return false;
  }
}

const order = async (req, res) => {
  try {
    const reqBody = req.body;

    const tran_id = createRandomString(10);
    const nameCat = null;
    const productAndCat =
      reqBody.productItems.length <= 1
        ? await Product.findOne({ _id: reqBody.productItems[0]?._id })
        : `${reqBody.productItems.length} items.`;

    const data = {
      total_amount: reqBody.totalPrice,
      currency: "BDT",
      tran_id: tran_id, // use unique tran_id for each api call
      success_url: `${process.env.SERVER_BASE_URL}/payment-status?q=success&tran_id=${tran_id}`,
      fail_url: `${process.env.SERVER_BASE_URL}/payment-status?q=fail`,
      cancel_url: `${process.env.SERVER_BASE_URL}/payment-status?q=cancel`,
      ipn_url: `${process.env.SERVER_BASE_URL}/ipn`,
      shipping_method: "Courier",
      product_name: productAndCat?.title
        ? productAndCat?.title
        : `Products ${productAndCat}`,
      product_category: productAndCat?.categoryName
        ? productAndCat?.categoryName
        : `Categories ${productAndCat}`,
      product_profile: "general",
      cus_name: reqBody?.customerInfo.fullName,
      cus_email: "customer@example.com",
      cus_add1: reqBody?.customerInfo.address,
      cus_add2: "Dhaka",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: reqBody?.customerInfo.streetAddress,
      cus_country: "Bangladesh",
      cus_phone: reqBody?.customerInfo.phoneNumber,
      cus_fax: "01711111111",
      ship_name: reqBody?.customerInfo.fullName,
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: 1000,
      ship_country: "Bangladesh",
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, isLive());
    sslcz.init(data).then(async (apiResponse) => {
      // Redirect the user to payment gateway
      let GatewayPageURL = apiResponse.GatewayPageURL;
      res.send({ url: GatewayPageURL });

      // create order and make pending payment status
      function generateOrderId() {
        const min = 10000000000;
        const max = 99999999999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      if (GatewayPageURL) {
        await ProductOrder.create({
          orderId: generateOrderId(),
          ...reqBody,
          tran_id,
          paymentStatus: false,
          orderStatus: "processing"
        });
      }
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  order,
};
