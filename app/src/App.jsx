import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './views/HomePage';
// import PrivateRoute from './utils/PrivateRoutes';
// import ProtectedPage from './views/ProtectedPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';


function App() {
  return (
    <Router>
      {/* <AuthProvider> */}
        <Routes>
        {/* <PrivateRoute element={ProtectedPage} path="/protected" exact /> */}
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      {/* </AuthProvider> */}
    </Router>
  );
}

export default App;
