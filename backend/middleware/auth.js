import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: "Not authorized please login" });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export default authUser;

// import jwt from "jsonwebtoken";

// const authUser  = async (req, res, next) => {
//   // Extraer el token del encabezado Authorization
//   const token = req.headers['authorization']?.split(' ')[1]; // Esto obtiene el token después de "Bearer"

//   if (!token) {
//     return res.json({ success: false, message: "Not authorized, please login" });
//   }

//   try {
//     // Verificar el token
//     const token_decode = jwt.verify(token, process.env.JWT_SECRET);
//     req.body.userId = token_decode.id; // Asignar el ID del usuario a req.body
//     next(); // Llamar al siguiente middleware
//   } catch (error) {
//     console.log(error);
//     return res.json({ success: false, message: error.message });
//   }
// };

// export default authUser ;
