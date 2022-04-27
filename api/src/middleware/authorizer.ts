import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../model/users";

const secureEndpoint = asyncHandler(async (req: any, res: any, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // ! Get Token from the headers
      token = req.headers.authorization.split(" ")[1];

      // !  verify token
      const decoded: any = jwt.verify(
        token,
        process.env.JWT_SECRET || "SECRET"
      ); //TODO

      // ! get User form the token
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (err: any) {
      console.log(err);
      res.status(401);
      throw new Error(err.message);
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export default secureEndpoint;
