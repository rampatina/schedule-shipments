import express from "express";
import { getShipments, createShipment,updateShipment, getDeliveries } from "../controllers/shipments";
import { getPartners } from "../controllers/users"
import secureEndpoint from "../middleware/authorizer";
const router = express.Router();

router.get("/", secureEndpoint, getShipments);
router.post("/create", secureEndpoint, createShipment);
router.put("/update/:id", secureEndpoint, updateShipment);
router.get("/deliveries", secureEndpoint, getDeliveries);
router.get("/partners", secureEndpoint, getPartners)

export default router;