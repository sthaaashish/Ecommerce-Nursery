const jwt = require('jsonwebtoken');


module.exports.userCheck = (req, res, next) => {


    try {
      const token = req.headers.authorization;
      if (token) {
        const decode = jwt.decode(token, 'jsonToken');
  
        if (decode) {
          req.userId = decode.id;
          return next();
        } else {
  
          return res.status(401).json({
            status: 'error',
            message: `not authorised`
          });
        }
  
  
  
  
      } else {
        return res.status(401).json({
          status: 'error',
          message: `not authorised`
        });
      }
    } catch (err) {
      return res.status(400).json({
        status: 'error',
        message: `THis is middleware`
      });
    }
  
  }

module.exports.adminCheck=(req,res,next)=>{

    try {
        const token=req.headers.authorization;
        if(token){
            const decode=jwt.decode(token,'stha2121');
        switch(decode?.isAdmin){
               case true:
                return next();
            default:
                return res.status(401).json({
                    status:'error',
                    message:"not authorized"
                })
            }

        }else{
            return res.status(401).json({
                status:"Error",
                message:"not authorized"
            })
        }
    } catch (err) {

        return  res.status(400).json({
            status:"error",
            message:"this is middleware"
        })
    }
    
}


