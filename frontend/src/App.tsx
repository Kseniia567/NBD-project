import { useState, Suspense } from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Landing} from "./pages/Landing";

import {DashboardLayout} from "./layouts";
import {AddRecipe, Home, More, MyRecipes} from "./pages/Dashboard";
import {ErrorPage} from "./pages/Error";

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Landing />,
            errorElement: <ErrorPage />
        },
        {
            path:  '/dashboard',
            element: <DashboardLayout />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: '/dashboard',
                    element: <Home />
                },
                {
                    path: '/dashboard/addrecipe',
                    element: <AddRecipe />
                },
                {
                    path: '/dashboard/myrecipes',
                    element: <MyRecipes />
                },
                {
                    path: '/dashboard/recipe/:id',
                    element: <More />
                },
            ]

        }
    ]);
  return (
    <>
      <div className="container h-[100vh] w-[100vw]">
          <Suspense fallback={<div>Loading</div>}>
            <RouterProvider router={router} fallbackElement={<div>Fallback element</div>} />
          </Suspense>
      </div>
    </>
  )
}

export default App
