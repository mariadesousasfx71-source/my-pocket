import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import AddTransaction from "./pages/AddTransaction";
import EditTransaction from "./pages/EditTransaction";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// The shared layout: the Navbar is drawn once, and only the page
// inside <main> changes as you move between addresses.
// Everything sits in one large panel in the centre of the background.
function App() {
  return (
    <div className="min-h-screen bg-[#F6F6F6] bg-[url('/background.png')] bg-cover bg-center bg-fixed sm:px-6 sm:py-8">
      <div className="max-w-6xl mx-auto min-h-screen sm:min-h-[calc(100vh-4rem)] bg-[#FBF6EF]/70 sm:rounded-2xl overflow-hidden border border-[#CFA97A] shadow-2xl">
        <Navbar />
        <main className="px-4 py-6 sm:p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/add" element={<AddTransaction />} />
            <Route path="/edit/:id" element={<EditTransaction />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            {/* old address from before the rename */}
            <Route path="/expenses" element={<Navigate to="/transactions" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
