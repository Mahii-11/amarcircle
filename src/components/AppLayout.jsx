import { Outlet } from "react-router-dom";
import Header from "./Header";
import TopNavbar from "./TopNavbar";
import Footer from "../components/Footer";
import { ChatWidget } from "../ai-chat";

function AppLayout() {
  return (
    <div>
      <div className="sticky top-0 z-60">
        <TopNavbar />
        <Header />
      </div>
      <main>
        <Outlet />
        <Footer />
      </main>
      <ChatWidget />
    </div>
  );
}

export default AppLayout;
