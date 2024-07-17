const User = require("../../models/userModel");
const errorHandler = require("../../utils/error");
const fetchUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, search = "" } = req.query;
    const query = search
      ? {
          $or: [
            { username: new RegExp(search, "i") },
            { email: new RegExp(search, "i") },
          ],
        }
      : {};

    const users = await User.find(query)
      .select("-password")
      .skip((page - 1) * limit)
      .limit(Number(limit));

    if (!users || users.length === 0) {
      return next(errorHandler(404, "No users found"));
    }

    const totalUsers = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      users,
      pagination: {
        totalUsers,
        currentPage: page,
        totalPages: Math.ceil(totalUsers / limit),
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = fetchUsers;
