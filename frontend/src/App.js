
import './App.css';
import { AuthProvider } from './auth/AuthProvider';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
        <Outlet />
    </AuthProvider>
  );
}

export default App;