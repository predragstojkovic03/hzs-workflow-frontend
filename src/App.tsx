import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage/LoginPage';
import RequireAuth from './pages/RequireAuth/RequireAuth';
import Home from './pages/Home/Home';
import { useUser } from './lib/auth';
import Sidebar from './components/Sidebar/Sidebar';
import ApplicationDetails from './pages/ApplicationDetailsPage/ApplicationDetailsPage';
import MoodlePage from './pages/MoodlePage/MoodlePage';
import WorkshopPage from './pages/WorkshopPage/WorkshopPage';

function App() {
  const user = useUser();

  return (
    <main style={{ paddingLeft: user.data ? '80px' : '0px' }}>
      <Router>
        {user.data && <Sidebar />}
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route
            path='/'
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path='/moodle'
            element={
              <RequireAuth>
                <MoodlePage />
              </RequireAuth>
            }
          />
          <Route
            path='/radionice'
            element={
              <RequireAuth>
                <WorkshopPage />
              </RequireAuth>
            }
          />
          <Route
            path='/prijave/:id'
            element={
              <RequireAuth>
                <ApplicationDetails />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
