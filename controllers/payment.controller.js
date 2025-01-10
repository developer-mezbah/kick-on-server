const SSLCommerzPayment = require("sslcommerz-lts");
const { ProductOrder } = require("../models/product-order.model");
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = false; //true for live, false for sandbox

function createRandomString(length) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const randomArray = new Uint8Array(length);
  crypto.getRandomValues(randomArray);
  randomArray.forEach((number) => {
    result += chars[number % chars.length];
  });
  return result.toUpperCase();
}

const order = async (req, res) => {
  try {
    const reqBody = req.body;
    const tran_id = createRandomString(10);
    const data = {
      total_amount: reqBody.totalPrice,
      currency: "BDT",
      tran_id: tran_id, // use unique tran_id for each api call
      success_url: `${process.env.SERVER_BASE_URL}/payment-success?q=success&tran_id=${tran_id}`,
      fail_url: `${process.env.SERVER_BASE_URL}/payment-success?q=fail`,
      cancel_url: `${process.env.SERVER_BASE_URL}/payment-success?q=cancel`,
      ipn_url: `${process.env.SERVER_BASE_URL}/ipn`,
      shipping_method: "Courier",
      product_name: "Computer.",
      product_category: "Electronic",
      product_profile: "general",
      cus_name: "Customer Name",
      cus_email: "customer@example.com",
      cus_add1: "reqBody.customerInfo.region",
      cus_add2: "Dhaka",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: "01711111111",
      cus_fax: "01711111111",
      ship_name: "Customer Name",
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: 1000,
      ship_country: "Bangladesh",
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
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
      await ProductOrder.create({
        orderId: generateOrderId(),
        ...reqBody,
        tran_id,
        paymentStatus: false,
      });
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  order,
};
