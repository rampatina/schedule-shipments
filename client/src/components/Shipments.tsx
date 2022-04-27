import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toast } from "react-toastify";
import { TruckIcon } from "@heroicons/react/outline";
import { CButton, CModal, CModalHeader, CModalFooter, CModalBody, CModalTitle } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createShipment } from "../redux/slices/shipments";
import ShipmentItem from "./ShipmentItem";
import DeliveryItem from "./DeliveryItem";

function Shipments() {
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState(Number);
  const [fromaddress, setFromaddress] = useState("");
  const [toaddress, setToaddress] = useState("");
  const [phone, setPhone] = useState("");
  const [partner, setPartner] = useState("");
  const [visible, setVisible] = useState(false);

  const dispatch = useAppDispatch();
  const { shipments, isError, isSuccess, message } = useAppSelector(
    (state) => state.shipments
  );
  const { profile } = useAppSelector(
    (state) => state.profile
  );

  const { deliveries } = useAppSelector(
    (state) => state.deliveries
  );

  const { partners } = useAppSelector(
    (state) => state.partners
  );

  const onSubmit = () => {
    console.log("partner ", partner);
    dispatch(createShipment({ itemname: item, quantity, fromaddress, toaddress, phone, partnerid: partner }));
    setVisible(false);
    resetForm();
  };

  useEffect(() => {
    if (isSuccess) {
      //toast.success(message);
    }
    if (isError) {
      toast.error(message);
    }
  }, [shipments, deliveries, partners, message, isError, isSuccess]);

  const resetForm = () => {
      setItem("");
      setQuantity(1);
      setFromaddress("");
      setToaddress("");
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
      {profile?.isPartner ? <>
        <p>Below are the orders ready for delivery.</p>
        {deliveries && deliveries.length > 0 ? (deliveries.map((shipment) => <DeliveryItem key={shipment._id} shipment={shipment} />))
            : <p>No orders to deliever.</p>}
      </>: <>
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
                    <label htmlFor="fromaddress" className="text-lg font-medium">
                        From Address
                    </label>
                    <input
                        className="border-2 border-gray-500 p-2 px-4 outline-none flex-grow w-full"
                        type="text"
                        name="fromaddress"
                        placeholder="Address"
                        value={fromaddress}
                        onChange={(e) => setFromaddress(e.target.value)}
                    />
                    <label htmlFor="toaddress" className="text-lg font-medium">
                        To Address
                    </label>
                    <input
                        className="border-2 border-gray-500 p-2 px-4 outline-none flex-grow w-full"
                        type="text"
                        name="toaddress"
                        placeholder="Address"
                        value={toaddress}
                        onChange={(e) => setToaddress(e.target.value)}
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
                    <select 
                      className="border-2 border-gray-500 p-2 px-4 outline-none flex-grow w-full"
                      name="partner"
                      value={partner}
                      onChange={e => setPartner(e.target.value)}
                      >
                      <option value="none" ></option>
                      {partners.map((ptnr, i) => <option value={ptnr._id} >{ptnr.name}</option>)}
                    </select>
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
      </>
      }
    </section>
    </div>
  );
}

export default Shipments;