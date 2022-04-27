import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { getProfile } from "../redux/slices/profile";

function Profile() {
  const { user } = useAppSelector((state) => state.auth);
  const { profile } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();

  const navigate: NavigateFunction = useNavigate();
  useEffect((): any => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(getProfile());
    }

    //return dispatch(reset());
  }, [navigate, user, dispatch]);
  console.log(profile);

  return (
    <div className="max-w-lg mx-auto px-3">
      <section className="text-center space-y-2 py-10">
        <h1 className="text-3xl font-bold">Welcome {profile?.name}!</h1>
        <p className="text-xl font-bold text-gray-600">Your full name: {profile?.name}</p>
        <p className="text-xl font-bold text-gray-600">Your email    : {profile?.email}</p>
        <p className="text-xl font-bold text-gray-600">Are you delivery partner   : {profile?.isPartner? "Yes": "No"}</p>
      </section>
    </div>
  );
}

export default Profile;