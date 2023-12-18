import jwt from 'jsonwebtoken';

const llave_secreta = 'topsecret';

const auth_required = (req, res, next) => {

  const { authorization } = req.headers;

  try {
    const decoded = jwt.verify(authorization, process.env.SECRET_KEY);

    const now = new Date() / 1000;
  
    if (now > decoded.exp) {
      console.log({ now }, { exp: decoded.exp });
      return res.status(401).json({
        err: 'Tu token expiró',
      });
    }

    req.data = decoded.data;
    next();

  } catch (error) {
    
    return res.status(400).json(error);
  }
};

export { auth_required, llave_secreta };
