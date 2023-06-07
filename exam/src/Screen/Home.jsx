import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const Navigate = useNavigate();

  useEffect(() => {
    Redirect();
  });
  const Redirect = () => {
    Navigate("/login");
  };
  return <h1>Redirecting...</h1>;
};
