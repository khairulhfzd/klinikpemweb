import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ msg: "Token tidak ada" });

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "secretKey");
        req.userId = decoded.userId;  // perhatikan ini
        req.userRole = decoded.role;  // ini opsional kalau mau
        next();
    } catch (error) {
        res.status(403).json({ msg: "Token invalid" });
    }
}
