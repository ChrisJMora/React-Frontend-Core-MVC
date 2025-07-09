import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginView from './LoginView.jsx';
import CropsView from './CropsView.jsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route 
                    path="/" 
                    element={<LoginView/>}
                />
                <Route 
                    path="/crops" 
                    element={<CropsView/>}
                />
            </Routes>
        </Router>
    );
}

export default App
