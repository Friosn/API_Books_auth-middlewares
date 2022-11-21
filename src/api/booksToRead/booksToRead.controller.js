const ToRead = require("./booksToRead.model");
const setError = require("../../helper/error/handle.error");

const getToRead = async (req, res, next) => {
  try {
    const toRead = await ToRead.find();
    return res.json({
      status: 200,
      message: "All books recovered! 📚",
      data: { toRead },
    });
  } catch (error) {
    return next(setError(500, "Failiure recovering the books 🍂"));
  }
};

const postToRead = async (req, res, next) => {
  try {
    const newToRead = new ToRead(req.body);
    const toReadToDB = await newToRead.save();

    return res.json({
      status: 500,
      message: "New Book to Read added! 🤓",
      data: { toReadToDB },
    });
  } catch (error) {
    return next(setError(500, "Imposible to post right now 😵‍💫"));
  }
};

module.exports = { getToRead, postToRead };
