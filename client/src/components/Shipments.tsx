import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toast } from "react-toastify";
import { TruckIcon } from "@heroicons/react/outline";
import { CButton, CModal, CModalHeader, CModalFooter, CModalBody, CModalTitle } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createShipment } from "../redux/slices/shipments";
import ShipmentItem from "./ShipmentItem";

function Shipments() {
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState(Number);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [partner, setPartner] = useState("");
  const [visible, setVisible] = useState(false);

  const dispatch = useAppDispatch();
  const { shipments, isError, isSuccess, message } = useAppSelector(
    (state) => state.shipments
  );
  const onSubmit = () => {
    console.log(item);
    dispatch(createShipment({ itemname: item, quantity, address, phone, partnerid: partner }));
    setVisible(false);
    resetForm();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
    }
    if (isError) {
      toast.error(message);
    }
  }, [shipments, message, isError, isSuccess]);

  const resetForm = () => {
      setItem("");
      setQuantity(1);
      setAddress("");
      setPhone("");
      setPartner("");
  }
  const setModal = () => {
      setVisible(true);
      resetForm();
  }

  const onClose = () => {
    setVisible(false);
    resetForm();
  }
  return (
  <div>
    <section>
      <button
        onClick={setModal}
        className="float-right flex space-x-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 px-4 py-2 text-white">
        <TruckIcon className="h-6" /> <span className="">Add item</span>
      </button><br /><br />
      {visible && <div>
        <CModal visible={visible} onClose={onClose}>
        <CModalHeader>
            <CModalTitle>Order Shipment</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <form onSubmit={onSubmit} action="" className="flex flex-col space-y-2">
                <div className="flex-grow">
                    <label htmlFor="item" className="text-lg font-medium">
                        Item
                    </label>
                    <input
                        className="border-2 border-gray-500 p-2 px-4 outline-none flex-grow w-full"
                        type="text"
                        name="item"
                        placeholder="Add Item"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                    />
                    <label htmlFor="quantity" className="text-lg font-medium">
                        Quantity
                    </label>
                    <input
                        className="border-2 border-gray-500 p-2 px-4 outline-none flex-grow w-full"
                        type="number"
                        name="quantity"
                        placeholder="Quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                    />
                    <label htmlFor="address" className="text-lg font-medium">
                        Address
                    </label>
                    <input
                        className="border-2 border-gray-500 p-2 px-4 outline-none flex-grow w-full"
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <label htmlFor="phone" className="text-lg font-medium">
                        Phone
                    </label>
                    <input
                        className="border-2 border-gray-500 p-2 px-4 outline-none flex-grow w-full"
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <label htmlFor="partner" className="text-lg font-medium">
                        Partner
                    </label>
                    <input
                        className="border-2 border-gray-500 p-2 px-4 outline-none flex-grow w-full"
                        type="text"
                        name="partner"
                        placeholder="Partner"
                        value={partner}
                        onChange={(e) => setPartner(e.target.value)}
                    />
                </div>
            </form>
        </CModalBody>
        <CModalFooter>
            <CButton color="secondary" onClick={onClose}>Cancel</CButton>
            <CButton color="primary" onClick={onSubmit}>Order</CButton>
        </CModalFooter>
        </CModal>
          </div>}
        {shipments && shipments.length > 0 ? (shipments.map((shipment) => <ShipmentItem key={shipment._id} shipment={shipment} />))
            : <p>No orders placed yet.</p>}
    </section>
    </div>
  );
}

export default Shipments;