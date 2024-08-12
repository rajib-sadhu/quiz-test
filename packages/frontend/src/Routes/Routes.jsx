import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import SignIn from "../Pages/SignIn/SignIn";
import CreateTest from "../Pages/CreateTest/CreateTest";
import PrivateRoute from "./PrivateRoute";
import CreateQuiz from "../Pages/CreateQuiz/CreateQuiz";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: "",
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/create-test",
        element: (
          <PrivateRoute>
            <CreateTest />
          </PrivateRoute>
        ),
      },
      {
        path: "/create-quiz/:id",
        loader: ({ params }) => params.id,
        element: (
          <PrivateRoute>
            <CreateQuiz />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
