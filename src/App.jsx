import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Cards from "./components/Cards";
import StoryDetail from "./components/StoryDetail";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Cards />} />
                <Route path="/story/:id" element={<StoryDetail />} />
            </Routes>
        </Router>
    );
}

export default App;