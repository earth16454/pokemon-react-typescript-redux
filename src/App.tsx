import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/table",
    element: <HomePage />,
  },
  {
    path: "details/:id",
    element: <DetailPage />,
  },
  {
    path: "about",
    element: <HomePage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
