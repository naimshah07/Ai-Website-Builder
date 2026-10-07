import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react"; 
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Pricing from "./pages/Pricing";
import Preview from "./pages/Preview";
import View from "./pages/View";
import Community from "./pages/Community";
import Navbar from "./components/Navbar";
import MyProjects from "./pages/MyProjects";
import { Toaster} from "sonner";
import AuthPage from "./pages/auth/AuthPage";
import  Settings  from "./pages/Settings";
import Loading from "./pages/Loading";
import { trackPageView } from "./analytics";

const App = () => {
  const { pathname } = useLocation();

 // ✅ Correct place
  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  const hideNavbar =
    (pathname.startsWith("/projects/") && pathname !== "/projects") ||
    pathname.startsWith("/view/") ||
    pathname.startsWith("/preview/");
  return (
    <div>
      <div>
        <Toaster />
      </div>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/projects/:projectId" element={<Projects />} />
        <Route path="/projects" element={<MyProjects />} />
        <Route path="/preview/:projectId" element={<Preview />} />
        <Route path="/preview/:projectId/:versionId" element={<Preview />} />
        <Route path="/view/:projectId" element={<View />} />
        <Route path="/community" element={<Community />} />
        <Route path="/account/settings" element={<Settings />} />
        <Route path="/auth/:pathname" element={<AuthPage />} />
        <Route path ="/loading" element={<Loading />} />
      </Routes>
    </div>
  );
};

export default App;
