import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../model/users";

// * @desc Register a new user
// * @route POST /api/users/register
// * @access Public
const register = asyncHandler(async (req: any, res: any) => {
  console.log('Called register endpoint');
  const { name, email, password, isPartner } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please provide a valid crendentials");
  }

  // check if the user exists
  const checkUser = await User.findOne({ email });
  if (checkUser) {
    res.status(400);
    throw new Error("a User already exists with that email");
  }

  // hash passowrd
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  const user = await User.create({ name, email, password: hashedPassword, isPartner });

  if (user) {
    //res.status(201).json({ ...user._doc, token: generateJWT(user._id) }); TODO
    res.status(201).json({ token: generateJWT(user._id) });
  } else {
    res.status(500).send("Something went wrong");
  }
});

// * @desc Authenticate a user
// * @route POST /api/users/login
// * @access Public
const login = asyncHandler(async (req: any, res: any) => {
  const { email, password } = req.body;

  // check email
  const user = await User.findOne({ email });
  if (user && (await bcryptjs.compare(password, user.password))) {
    res.status(201).json({
      //...user._doc, TODO
      token: generateJWT(user._id),
    });
  } else {
    res.status(400).send("Invalid email or password");
  }
});

// @route GET /api/users/partners
// @access Private
const getPartners = asyncHandler(async (req:any, res:any) => {
  const users = await User.find({ isPartner: true }, '_id name');
  console.log('users ', users);
  res.status(200).send(users);
});

// * @desc Get user's data
// * @route GET /api/users/me
// * @access Private
const getMe = asyncHandler(async (req: any, res: any) => {
  res.status(200).json(req.user);
});

// Generate JWT
function generateJWT(id: string) {
  return jwt.sign({ id }, process.env.JWT_SECRET || "SECRET", {
    expiresIn: "30d",
  });
}

export { register, login, getMe, getPartners };
