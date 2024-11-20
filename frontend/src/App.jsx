import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/notFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Gallery />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
