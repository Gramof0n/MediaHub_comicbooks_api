const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log(process.env.JWT_KEY);
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        console.log("DECODED TOKEN JESTE" + decoded.isAdmin);
        if(decoded.isAdmin){
            next();
        }else{
            return res.status(401).json({status: "unauthorized", message: "Unauthorized"});
        }

    } catch (error) {
        return res.json({message: 'Authentication failed', error: error});
    }

}