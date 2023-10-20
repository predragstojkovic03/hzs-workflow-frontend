import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage/LoginPage';
import RequireAuth from './pages/RequireAuth/RequireAuth';
import Home from './pages/Home/Home';
import { useUser } from './lib/auth';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  const user = useUser();

  return (
    <main style={{ paddingLeft: user.data ? '80px' : '0px' }}>
      <Router>
        {user.data && <Sidebar />}
        <Routes>
          <Route
            path='/'
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
