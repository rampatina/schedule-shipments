import express from "express";
import { getShipments, createShipment,updateShipment } from "../controllers/shipments";
import secureEndpoint from "../middleware/authorizer";
const router = express.Router();

router.get("/", secureEndpoint, getShipments);
router.post("/create", secureEndpoint, createShipment);
router.put("/update/:id", secureEndpoint, updateShipment);

export default router;