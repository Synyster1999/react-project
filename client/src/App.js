import Sidebar from "./components/Sidebar.jsx";
import Upload from "./components/Upload.jsx";
import { DESADVProvider } from "./context/DESADVContext.js";
import Details from "./pages/Details.jsx";
import Overview from "./pages/Overview.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <DESADVProvider>
        <main className="flex h-screen w-full font-roboto">
          <div className="w-64">
            <Sidebar />
          </div>
          <div className="bg-[#E9B384] w- flex-1">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/details/:id" element={<Details />} />
              <Route path="/upload" element={<Upload />} />
            </Routes>
          </div>
        </main>
      </DESADVProvider>
    </BrowserRouter>
  );
}

export default App;
