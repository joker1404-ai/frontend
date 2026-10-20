import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import CreateLetter from "./CreateLetter";
import ReadLetter from "./ReadLetter";
import AllLetters from "./AllLetters";
import MusicPlayer from "./MusicPlayer";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateLetter />} />
        <Route path="/letter/:shareId" element={<ReadLetter />} />
        <Route path="/letters" element={<AllLetters />} />
        
      </Routes>
      <MusicPlayer />
    </BrowserRouter>
  );
}