const getAll = (req, res, next) => {
    res.status(200).json({ message: "hello everyone" });
};

exports.getAll = getAll;