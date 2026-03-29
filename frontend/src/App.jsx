import { Route, Routes } from "react-router";

import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";

const App = () => {
  return (
    <div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,_#031a12_0%,_#000000_60%)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_110%,_#022b1a_0%,_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_10%_10%,_#04301e22_0%,_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,_transparent_50%,_#000000cc_100%)]" />
      </div>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<LandingPage />} />

        {/* Main app routes */}
        <Route path="/app" element={<HomePage />} />
        <Route path="/app/create" element={<CreatePage />} />
        <Route path="/app/note/:id" element={<NoteDetailPage />} />

        {/* Legacy redirects */}
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;