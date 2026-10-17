import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Aboutus from "./pages/Aboutus";
import Services from "./pages/Services";
import PayBill from "./pages/PayBill";
import SpeedTest from "./pages/SpeedTest";
import ContactUs from "./pages/ContactUs";
import AppLayout from "./components/AppLayout";
import OurStory from "./pages/OurStory";
import PackageSlider from "./pages/PackageSlider";
import EntertainmentLandingPage from "./pages/EntertainmentLandingPage";

const router = createBrowserRouter([
  {
    element: <AppLayout />,

    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/aboutus",
        element: <Aboutus />,
      },

      {
        path: "/services",
        element: <Services />,
      },

      {
        path: "our-story",
        element: <OurStory />
      },

      {
        path: "/paybill",
        element: <PayBill />,
      },

      {
        path: "/speedtest",
        element: <SpeedTest />,
      },

      {
        path: "/contactus",
        element: <ContactUs />,
      },
      {
        path: "/our-package",
        element: <PackageSlider />
      },

      {
        path: "/media",
        element: <EntertainmentLandingPage />
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
