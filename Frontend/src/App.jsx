import React from "react";
import { RouterProvider } from "react-router";
import { router } from "./app.routes";
import { AuthProvider } from "./features/auth/auth.context";
import { Toaster } from "react-hot-toast";
import { HomeProvider } from "./features/home/home.context";

const App = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <AuthProvider>
        <HomeProvider>
          <RouterProvider router={router} />
        </HomeProvider>
      </AuthProvider>
    </>
  );
};

export default App;
