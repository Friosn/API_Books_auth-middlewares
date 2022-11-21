const ReadBooks = require("./readBooks.model");

const setError = require("../../helper/error/handle.error");

//Middleware -> isAuth => return the books

const getRead = async (req, res, next) => {
  try {
    const read = await ReadBooks.find();
    return res.json({
      status: 200,
      message: "All Read books recovered! 📚",
      data: { read },
    });
  } catch (error) {
    return next(setError(500, "Failiure recovering the read books 🍂"));
  }
};

const postRead = async (req, res, next) => {
  try {
    const newRead = new ReadBooks(req.body);
    const readToDB = await newRead.save();

    return res.json({
      status: 500,
      message: "New Book to Read added! 🤓",
      data: { readToDB },
    });
  } catch (error) {
    return next(setError(500, "Imposible to post right now 😵‍💫"));
  }
};

module.exports = { getRead, postRead };
