const SSLCommerzPayment = require("sslcommerz-lts");
const { ProductOrder } = require("../models/product-order.model");
const { Product } = require("../models/product");
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;


function isLive() {
  if (process.env.IS_LIVE === "true") {
    return true;
  }
  if (process.env.IS_LIVE === "false") {
    return false;
  }
}

const orderWithBkash = async (req, res) => {
  try {
    const reqBody = req.body;
    const init_url = "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";
    const productAndCat =
      reqBody.productItems.length <= 1
        ? await Product.findOne({ _id: reqBody.productItems[0]?._id })
        : `${reqBody.productItems.length} items.`;

    const formData = new FormData();
    formData.append("store_id", process.env.STORE_ID);
    formData.append("store_passwd", process.env.STORE_PASSWORD);
    formData.append("total_amount", reqBody.totalPrice);
    formData.append("currency", "BDT");
    formData.append("tran_id", reqBody?.tran_id);
    formData.append(
      "success_url",
      `${process.env.SERVER_BASE_URL}/payment-status?q=success&tran_id=${reqBody?.tran_id}`
    );
    formData.append(
      "fail_url",
      `${process.env.SERVER_BASE_URL}/payment-status?q=fail`
    );
    formData.append(
      "cancel_url",
      `${process.env.SERVER_BASE_URL}/payment-status?q=cancel`
    );
    formData.append("ipn_url", `${process.env.SERVER_BASE_URL}/ipn`);
    formData.append("shipping_method", "Courier");
    formData.append(
      "product_name",
      productAndCat?.title ? productAndCat?.title : `Products ${productAndCat}`
    );
    formData.append(
      "product_category",
      productAndCat?.categoryName
        ? productAndCat?.categoryName
        : `Categories ${productAndCat}`
    );
    formData.append("product_profile", "general");
    formData.append("cus_name", reqBody?.customerInfo.fullName);
    formData.append("cus_email", "customer@example.com");
    formData.append("cus_add1", reqBody?.customerInfo.address);
    formData.append("cus_add2", "Dhaka");
    formData.append("cus_city", "Dhaka");
    formData.append("cus_state", "Dhaka");
    formData.append("cus_postcode", reqBody?.customerInfo.streetAddress);
    formData.append("cus_country", "Bangladesh");
    formData.append("cus_phone", reqBody?.customerInfo.phoneNumber);
    formData.append("cus_fax", "01711111111");
    formData.append("ship_name", reqBody?.customerInfo.fullName);
    formData.append("ship_add1", "Dhaka");
    formData.append("ship_add2", "Dhaka");
    formData.append("ship_city", "Dhaka");
    formData.append("ship_state", "Dhaka");
    formData.append("ship_postcode", 1000);
    formData.append("ship_country", "Bangladesh");

    const requestOptions = { method: "POST", body: formData };
    const SSLRes = await fetch(init_url, requestOptions);
    const SSLResJson = await SSLRes.json();
    if (SSLResJson.status === "SUCCESS") {
      const bkash = SSLResJson.desc.find((item) => item.name === "bKash");
      return res
        .status(200)
        .json({ status: true, bkash });
    } else {
      return res
        .status(404)
        .json({ status: false, error: "Something went wrong!" });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  orderWithBkash,
};
