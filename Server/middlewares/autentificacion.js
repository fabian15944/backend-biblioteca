const jwt = require('jsonwebtoken'); // con este verificamos el token
let verificatoken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, process.env.SGIN, (err, decoded) => {
        if (err) {
            return err.status(401).json({
                ok: false,
                err
            });
        }
        req.usuario = decoded.usuario;
        next();
    });


    // return res.status(200).json({
    //     token
    // });

};

module.exports = {
    verificatoken
}