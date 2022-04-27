import axios from "axios";
import { Shipment } from "../../types";

const API_HOST = process.env.API_HOST || "http://localhost:8000"
const API_URL = `${API_HOST}/api/shipments`;

async function getShipments(token: string) {
  console.log("Inside getShipments ", token);
  const { data } = await axios.get<Shipment[]>(`${API_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

async function createShipment(input: Object, token: string) {
  const { data } = await axios.post<Shipment>(
    `${API_URL}/create`,
    input,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
}

/*async function deleteTodo(id: string, token: string) {
  const { data } = await axios.delete(`${API_URL}/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}*/

export const shipmentServices = {
  getShipments,
  createShipment,
  //deleteTodo,
};
