export const SINGUP = "SINGUP";
export const SINGIN = "SINGIN";

export const signUp = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCYX6n7L2oG7ERY0yshhpUsINySLcpPpRE",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const resData = await response.json();
    console.log(resData);

    dispatch({
      type: SINGUP,
      email,
      password,
      returnSecureToken: true,
    });
  };
};

export const signIn = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCYX6n7L2oG7ERY0yshhpUsINySLcpPpRE",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const resData = await response.json();
    console.log(resData);

    dispatch({
      type: SINGIN,
      email,
      password,
      returnSecureToken: true,
    });
  };
};
