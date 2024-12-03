const { Footer, Subscriber } = require("../models/footer.model");

const updateOrCreate = async (req, res) => {
  try {
    const id = req.query.id;
    const bodyData = req.body;

    if (id) {
      // Update data if id is exist
      const result = await Footer.findOneAndUpdate(
        { _id: id },
        { ...bodyData }
      );
      if (!result) {
        return res.status(404).json({ status: false });
      }
      res.status(200).json({ status: true, data: result });
    } else {
      // Create data if id is not exist
      const result = await Footer.create({
        ...bodyData,
      });
      if (!result) {
        return res.status(404).json({ status: false });
      }
      res.status(201).json({ status: true, data: result });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getSingleitem = async (req, res) => {
  try {
    const data = await Footer.find({});
    if (!data.length) {
      return res.status(404).json({ status: false, data: [] });
    }
    res.status(200).json({ status: true, data: data[0] });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const AllSubscribers = async (req, res) => {
  try {
    const data = await Subscriber.find({});
    if (!data.length) {
      return res.status(404).json({ status: false, data: [] });
    }
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const CreateSubscriber = async (req, res) => {
  try {
    const bodyData = req.body;

    const result = await Subscriber.create({...bodyData});
    if (!result) {
      return res.status(404).json({ status: false });
    }
    res.status(200).json({ status: true, data: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteSubscriber = async (req, res) => {
  try {
    const id = req.query.id;
    const data = await Subscriber.findOneAndDelete({ _id: id });
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  updateOrCreate,
  getSingleitem,
  AllSubscribers,
  CreateSubscriber,
  deleteSubscriber
};
