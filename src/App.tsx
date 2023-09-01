import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import Footer from './components/Footer';

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
      <Footer/>
    </>
  );
}

export default App;
