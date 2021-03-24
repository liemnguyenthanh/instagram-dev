const jwt = require("jsonwebtoken")


module.exports = function getToken(user){
    return jwt.sign(
      {
        _id: user._id,
        fullName: user.fullName,
        email : user.email
      },
      process.env.SECRET_TOKEN,
      {
        expiresIn: '48h',
      }
    );
  };
// module.exports = function(req, res, next){
//    const token = req.header('auth-token'); // sẽ gửi yêu cầu lên header để tìm                                                   token ra rồi verify.
//    // Nếu bạn không truyền lên token thì nó sẽ gửi thông báo
//    if(!token) return res.status(401).send("Vui lòng đăng nhập để được truy cập")
//    try{
//        const checkToken = jwt.verify(token, process.env.SECRET_TOKEN) // kiểm tra token
//        req.user = checkToken //lưu token lại để có thể kiểm tra
//        next()
//    }catch(err){
//        res.status(400).send('Invalid Token')// thông báo lỗi khi bạn nhập sai token.
//    }
// }
