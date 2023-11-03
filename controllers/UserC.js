const UserM = require("../models/UserM");

exports.updateUser = async (req, res) => {
  // console.log(req);
  try {
    const {
      firstName,
      lastName,
      userName,
      email,
      phoneNumber,
      password,
      about,
      avatar,
      lastSeen,
      online,
      forgetPwd,
    } = req.body;

    const newUser = {
      firstName,
      lastName,
      userName,
      email,
      phoneNumber,
      password,
      about,
      avatar,
      lastSeen,
      online,
      forgetPwd,
    };

    await UserM.findByIdAndUpdate(req.params.id, newUser);

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.updateAccount = async (req, res) => {
  // console.log(req);
  try {
    const {
      firstName,
      lastName,
      userName,
      email,
      phoneNumber,
      avatar,
    } = req.body;

    const newUser = {
      firstName,
      lastName,
      userName,
      email,
      phoneNumber,
      avatar,
      
    };

    await UserM.findByIdAndUpdate(req.user._id, newUser);

    res.status(200).json({ message: "Account updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await UserM.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getUser = async (req, res) => {
  try {
    const user = await UserM.findById(req.user._id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await UserM.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};







