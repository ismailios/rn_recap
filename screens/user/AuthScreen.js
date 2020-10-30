import React from "react";
import { Button, KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import Input from "../../components/UI/Input";
import Colors from "../../constants/Colors";

const AuthScreen = () => {
  return (
    <KeyboardAvoidingView style={styles.screen}>
      <View style={styles.card}>
        <ScrollView style={styles.authContainer}>
          <Input
            id="email"
            label="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            required
            value=""
            email
            onInputChange={() => {}}
          />
          <Input
            id="password"
            label="Password"
            keyboardType="default"
            autoCapitalize="none"
            required
            secureTextEntry
            min={6}
            value=""
            onInputChange={() => {}}
          />
          <Button title="Login" color={Colors.primary} />
          <Button title="Switch To Sign Up" color={Colors.accent} />
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
