import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({
        success: false,
        message: "Not authorized. Please login again.",
      });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASS) {
      return res.json({
        success: false,
        message: "Not authorized. Please login again.",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         success: false,
//         message: "No autorizado. Por favor, inicia sesión nuevamente.",
//       });
//     }

//     const token = authHeader.replace("Bearer ", "");
//     const token_decode = jwt.verify(token, process.env.JWT_SECRET);

//     if (!token_decode.email || token_decode.email !== process.env.ADMIN_EMAIL) {
//       return res.status(401).json({
//         success: false,
//         message: "No autorizado. Por favor, inicia sesión nuevamente.",
//       });
//     }

//     next();
//   } catch (error) {
//     console.error(error);

//     if (error.name === "JsonWebTokenError") {
//       return res.status(401).json({
//         success: false,
//         message: "Token inválido. Por favor, inicia sesión nuevamente.",
//       });
//     }

//     if (error.name === "TokenExpiredError") {
//       return res.status(401).json({
//         success: false,
//         message: "Token expirado. Por favor, inicia sesión nuevamente.",
//       });
//     }

//     res.status(500).json({
//       success: false,
//       message: "Error en el servidor.",
//     });
//   }
// };

// TODO:CODIGO SACADO DE CLAUDE 


// TODO:CODIGO SACADO DE CLAUDE 
// const adminAuth = (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(' ')[1] || req.headers.token; // Acepta ambos formatos
    
//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "No token provided. Please login again."
//       });
//     }

//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
//       if (decoded.email !== process.env.ADMIN_EMAIL || decoded.role !== 'admin') {
//         return res.status(401).json({
//           success: false,
//           message: "Not authorized."
//         });
//       }

//       req.user = decoded;
//       next();
//     } catch (jwtError) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid token. Please login again."
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ 
//       success: false, 
//       message: "Internal server error" 
//     });
//   }
// };

export default adminAuth;
