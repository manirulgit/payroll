import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Employee from './component/Employee';
import Login from './component/login';
import Ticket from './component/Ticket';
import 'bootstrap/dist/css/bootstrap.min.css';
import LiveStatus from './component/LiveStatus';
import Dashboard from './component/dashboard';

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/dashboard" exact={true} element={<Dashboard />}></Route>
        <Route path="/employee" exact={true} element={<Employee />}></Route>
        <Route path="/addTicket" exact={true} element={<Ticket />}></Route>
        <Route path="/liveStatus" exact={true} element={<LiveStatus />}></Route>
        <Route path="/logout" element={<Login />}></Route>
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
