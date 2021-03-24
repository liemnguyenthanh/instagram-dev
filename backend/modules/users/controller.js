const User = require("./model");
const bcrypt = require("bcryptjs");
const getToken = require("../../util/token");
//get all users getUsers
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).send({ users: users });
  } catch (error) {
    next(error);
  }
};
//get user getUsersByName
exports.getUsersById = async (req, res, next) => {
  try {
    const users = await User.findById({ _id : req.params.id});
    if (users) {
      res.status(200).send({ users: users });
    } else {
      res.status(200).send("Could not find users");
    }
  } catch (error) {
    next(error);
  }
};
// register user
exports.registerUser = async (req, res, next) => {
  try {
    const user = new User({
      fullName :  req.body.fullName,
      username :  req.body.username,
      email :  req.body.email,
      password :  req.body.password,
    });
    //Check email exist
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email đã tồn tại");
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);
    user.password = hashPass;
    //save user
    await user.save();
    res.send(user);
  } catch (error) {
    next(error);
  }
};
exports.signinUser = async (req, res, next) => {
  try {
    // Kiểm tra email
    const userLogin = await User.findOne({ email: req.body.email });
    if (!userLogin) return res.status(400).send("Không tìm thấy email");
    // Kiểm tra password
    const passLogin = await bcrypt.compare(
      req.body.password,
      userLogin.password
    );
    if (!passLogin) return res.status(400).send("Mật khẩu không hợp lệ");
    else {
      res.send({
        userLogin,
        token: getToken(userLogin),
      });
    }
  } catch (error) {
    next(error);
  }
};
