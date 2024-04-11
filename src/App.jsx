import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home/Home";
import Weather from "./pages/Weather/Weather";
import Error404Page from "./pages/Error/Error404Page";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="weather" element={<Weather />} />
      </Route>
      <Route path="*" element={<Error404Page />} />
    </>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
