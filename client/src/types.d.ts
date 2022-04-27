export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    token: string;
  }
  
  export interface UserData {
    name: string;
    email: string;
    password: string;
  }

  export interface Profile {
    email: string;
    name: string;
  }

  export interface Shipment {
    _id: string;
    userid: string;
    itemname: string;
    quantity: number;
    address: string;
    phone: number;
    partnerid: string;
    status: string;
    orderdate: Date
}