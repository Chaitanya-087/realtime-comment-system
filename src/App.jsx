import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Home, SignIn, SignUp} from "./pages";

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/sign-in' element={<SignIn />} />
                <Route path='/sign-up' element={<SignUp />} />
            </Routes>
        </Router>
    );
}

export default App;
