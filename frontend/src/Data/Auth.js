import { Navigate } from "react-router-dom";

export const checkFunction = () => {
  let token = localStorage.getItem("signedJWT");
  if (!token) {
    Navigate("/");
  }
};
