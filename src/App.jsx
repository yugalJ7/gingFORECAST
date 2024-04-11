import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Cities from "./pages/cities/Cities";
import RootLayout from "./layout/RootLayout";
import Weather from "./pages/weather/weather";
import Error404Page from "./pages/Error/Error404Page";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Cities />} />
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
