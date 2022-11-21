const Collection = require("./bookCollection.model");

const setError = require("../../helper/error/handle.error");

const getCollection = async (req, res, next) => {
  try {
    const collection = await Collection.find()
      .populate("toread")
      .populate("read");
    return res.json({
      status: 200,
      message: "All collections recovered! 📚",
      data: { collection },
    });
  } catch (error) {
    return next(setError(500, "Failiure recovering Collections 🍂"));
  }
};

const postCollection = async (req, res, next) => {
  try {
    const newCollection = new Collection(req.body);
    const collectionToDB = await newCollection.save();

    return res.json({
      status: 500,
      message: "New Collections added! 🤓",
      data: { collectionToDB },
    });
  } catch (error) {
    return next(setError(500, "Imposible to post Collections right now 😵‍💫"));
  }
};

module.exports = { getCollection, postCollection };
