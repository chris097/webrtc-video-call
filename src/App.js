import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import CreateRoom from "./routes/CreateRoom";
import Room from "./routes/Room";

function App() {
  return (
    <>
      <Toaster />
    <Router>
      <Routes>
        <Route path="/" exact element={<CreateRoom />} />
        <Route path="/room/:roomID" element={<Room />} />
      </Routes>
      </Router>
      </>
  );
}

export default App;
