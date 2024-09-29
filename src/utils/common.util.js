import Cookies from "js-cookie";
import { useEffect, useState } from "react";
export const logout = (history) => {
  Cookies.remove("x_ufo");
  Cookies.remove("x_auth_token");
  return history("/");
};

export const isActive = () => {
  const [isActiveState, setIsActiveState] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('status');
    const isValid = id !== undefined && id !== null && id !== '';
    setIsActiveState(isValid);
  }, []);

  return isActiveState;
};
