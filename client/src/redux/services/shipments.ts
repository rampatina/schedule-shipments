import axios from "axios";
import { Partner, Shipment } from "../../types";

const API_HOST = process.env.API_HOST || "http://localhost:8000"
const API_URL = `${API_HOST}/api/shipments`;

async function getShipments(token: string) {
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

async function updateShipment(id: string, input: Object, token: string) {
  const { data } = await axios.put<Shipment>(
    `${API_URL}/update/${id}`,
    input,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
}

async function getDeliveries(token: string) {
  const { data } = await axios.get<Shipment[]>(`${API_URL}/deliveries`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

async function partners(token: string) {
  const response = await axios.get<Partner[]>(`${API_URL}/partners`, {
    headers: { "Access-Control-Allow-Origin": "*", Authorization: `Bearer ${token}` } 
  });
  return response.data;
}

export const shipmentServices = {
  getShipments,
  createShipment,
  getDeliveries,
  updateShipment,
  partners
};
