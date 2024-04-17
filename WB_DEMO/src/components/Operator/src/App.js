import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; 
import Login from './components/login/Login';
import Forgot from './components/forgot/Forgot';
import Homed from './components/homed/Homed';
import Transaction from './components/transaction/Transaction';
import TransactionFrom from './components/transactionform/TransactionFrom';
import Report from './components/report/Report';
import Camera from './components/camera/Camera';
import TransactionFrom1 from './components/transactionform1/Transactionform1';



function App() {
  return (
    <>
    <Router>
    <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/forgot' element={<Forgot/>}/>
        <Route path='/home' element={<Homed/>} />
        <Route path='/transaction' element={<Transaction/>} />
        <Route path='/transactionform' element={<TransactionFrom/>} />
        <Route path='/transactionform1' element={<TransactionFrom1/>} />
        <Route path='/camera' element={<Camera/>} />
        <Route path='/report' element={<Report/>} />
    </Routes>
    </Router>
    </>
  );
}

export default App;
