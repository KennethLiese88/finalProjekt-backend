import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/notFound";
import UserContextProvider from "./context/UserContext";

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
