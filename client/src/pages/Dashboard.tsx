import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useNavigate, NavigateFunction } from "react-router-dom";
import Shipments from "../components/Shipments";
import { getDeliveries, getShipments, reset } from "../redux/slices/shipments";
import { getProfile } from "../redux/slices/profile";
import { getPartners } from "../redux/slices/partners";

function Dashboard() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const navigate: NavigateFunction = useNavigate();
  useEffect((): any => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(getShipments());
      dispatch(getProfile());
      dispatch(getDeliveries());
      dispatch(getPartners())
    }

    return dispatch(reset());
  }, [navigate, user, dispatch]);

  return (
    <div className="max-w-lg mx-auto px-3">
      <section className="text-center space-y-2 py-10">
        <h1 className="text-3xl font-bold">Shipements Dashboard</h1>
      </section>
      <Shipments />
    </div>
  );
}

export default Dashboard;