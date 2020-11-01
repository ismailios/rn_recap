import React, { useEffect, useRef } from "react";
import { NavigationActions } from "react-navigation";
import { useSelector } from "react-redux";
import ShopNavigator from "./ShopNavigator";

const NavigationContainer = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const NavRef = useRef();

  useEffect(() => {
    if (!isAuth) {
      NavRef.current.dispatch(
        NavigationActions.navigate({
          routeName: "Auth",
        })
      );
    }
  }, [isAuth]);

  return <ShopNavigator ref={NavRef} />;
};

export default NavigationContainer;
