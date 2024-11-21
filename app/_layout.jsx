import React, { useContext } from "react";
import { Stack } from "expo-router";
import { AuthContext, AuthProvider } from "./context/AuthProvider";

const Layout = () => {
  return (
    <AuthProvider>
      <RootNavigation />
    </AuthProvider>
  );
};

function RootNavigation() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <>
        <Stack.Screen name="signin/index" />
        <Stack.Screen name="signup/index" />
      </>
      <>
        <Stack.Screen name="(tabs)/_layout" options={{ headerShown: false }} />
      </>
    </Stack>
  );
}

export default Layout;
