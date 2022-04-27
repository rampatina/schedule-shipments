import asyncHandler from "express-async-handler";
import Shipments from "../model/shipments";
import Users from "../model/users";

// @desc get shipments
// @route GET /api/shipment
// @access Private
const getShipments = asyncHandler(async (req:any, res:any) => {
  const shipements = await Shipments.find({ userid: req.user.id });
  console.log('shipements ', shipements);
  res.status(200).send(shipements);
});

// @desc create shipment
// @route POST /api/shipment/create
// @access Private
const createShipment = asyncHandler(async (req:any, res:any) => {
  const { itemname, quantity, address, partnerid, phone } = req.body;
  if (!itemname || !quantity || !address || !partnerid) {
    res.status(400);
    throw new Error("Please add a necessary details");
  }
  const shipment = await Shipments.create({
    userid: req.user.id,
    itemname, quantity, address, phone, partnerid, status: "new", orderdate: new Date()
  });
  res.status(201).send(shipment);
});

// @desc update shipment
// @route PUT /api/shipment/update/:id
// @access Private
const updateShipment = asyncHandler(async (req:any, res:any) => {
  const { id } = req.params;
  const shipment = await Shipments.findById(id);

  if (!shipment) {
    res.status(404);
    throw new Error("shipment not Found");
  }

  const user = await Users.findById(req.user.id);

  // Check if user exists
  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  // Check if user is owner of shipment
  if (shipment.userid.toString() !== user.id) {
    res.status(401);
    throw new Error(
      "Not authorized to Update this shipement, your are not the owner"
    );
  }

  const updatedShipment = await Shipments.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(200).send(updatedShipment);
});

export {
  getShipments,
  createShipment,
  updateShipment,
};