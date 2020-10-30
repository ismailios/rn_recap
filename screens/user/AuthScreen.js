import React, { useCallback, useState } from "react";
import { useReducer } from "react";
import { Button, KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";

import * as authActions from "../../store/actions/auth";

import Input from "../../components/UI/Input";
import Colors from "../../constants/Colors";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AuthScreen = (props) => {
  const [isSignUp, setIsSignUp] = useState(false);

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  const authHandler = () => {
    let action;
    if (isSignUp) {
      action = authActions.signUp(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authActions.signIn(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    dispatch(action);
  };

  return (
    <KeyboardAvoidingView style={styles.screen}>
      <View style={styles.card}>
        <ScrollView style={styles.authContainer}>
          <Input
            id="email"
            label="E-mail"
            keyboardType="email-address"
            errorText="Please Enter a valid adresse email"
            autoCapitalize="none"
            required
            email
            onInputChange={inputChangeHandler}
          />
          <Input
            id="password"
            label="Password"
            errorText="Please Enter a valid Password"
            keyboardType="default"
            autoCapitalize="none"
            required
            secureTextEntry
            min={6}
            onInputChange={inputChangeHandler}
          />
          <Button
            title={isSignUp ? "Sign Up" : "Login"}
            color={Colors.primary}
            onPress={authHandler}
          />
          <Button
            title={`Switch to ${isSignUp ? "Login" : "Sign Up"}`}
            color={Colors.accent}
            onPress={() => setIsSignUp((prevState) => !prevState)}
          />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Authenticte",
  };
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#e3e3e3",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  authContainer: {},
  card: {
    padding: 15,
    margin: 15,
    borderRadius: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
});

export default AuthScreen;
