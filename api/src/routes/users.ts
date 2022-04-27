import express from "express";
import { register, login, getMe } from "../controllers/users";
import secureEndpoint from "../middleware/authorizer";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", secureEndpoint, getMe);

export default router;
