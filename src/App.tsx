import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./features/dashboard/Dashboard";
import FormPage from "./features/questions/FormPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/form/:clientId" element={<FormPage />} />
      </Routes>
    </BrowserRouter>
  );
}
