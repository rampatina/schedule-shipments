import React, { useState } from "react";
import { Shipment } from "../types";
import { EyeIcon } from "@heroicons/react/outline";
import { CButton, CModal, CModalHeader, CModalFooter, CModalBody, CModalTitle } from '@coreui/react';
import { useAppDispatch } from "../redux/hooks";
import { updateShipmentStatus } from "../redux/slices/shipments";

function DeliveryItem({ shipment }: { shipment: Shipment }) {
    const [visible, setVisible] = useState(false);
    const [status, setStatus] = useState(shipment.status);
    const dispatch = useAppDispatch();

    const setModal = () => {
        setVisible(true);
    }

    const onClose = () => {
        setVisible(false);
    }

    const onSubmit = () => {
        dispatch(updateShipmentStatus({ id: shipment._id, status }));
        setVisible(false);
    };

    return (<div>
        <div className="bg-gray-50  hover:bg-gray-100 py-1 px-2 cursor-pointer flex justify-between items-center relative overflow-hidden group">
            <div className="">
                <caption className="text-xs text-gray-800 whitespace-nowrap">
                    {new Date(shipment.orderdate).toLocaleString()}
                </caption>
                <p>{shipment.itemname}</p>
            </div>
            <button
                onClick={setModal}
                className="bg-orange-600 text-white px-4 py-1 absolute -right-20 bottom-0 top-0 group-hover:right-0 transition-all duration-300">
                <EyeIcon className="h-6" />
            </button>
        </div>
        {visible && <div>
            <CModal visible={visible} onClose={onClose}>
                <CModalHeader>
                    <CModalTitle>Order Status</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <form onSubmit={onSubmit} action="" className="flex flex-col space-y-2">
                        <div className="flex-grow">
                            <p className="text-xl font-bold text-gray-600">Items : {shipment?.itemname}</p>
                            <p className="text-xl font-bold text-gray-600">Delivery Partner: {shipment?.partnerid}</p>
                            <label htmlFor="status" className="text-lg font-medium">
                                Status
                            </label>
                            <input className="border-2 border-gray-500 p-2 px-4 outline-none flex-grow w-full"
                                type="text"
                                name="status"
                                placeholder="Status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            />
                        </div>
                    </form>
                </CModalBody>
                <CModalFooter>
                    <CButton color="primary" onClick={onSubmit}>Update</CButton>
                    <CButton color="secondary" onClick={onClose}>Ok</CButton>
                </CModalFooter>
            </CModal>
        </div>}
    </div>
    );
}

export default DeliveryItem;
