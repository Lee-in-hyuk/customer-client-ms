import './App.css';
import Header from './componentes/Header';
import Footer from './componentes/Footer';
import CustomerList from './componentes/CustomerList';
import CreateCustomer from './componentes/CreateCustomer';
import DetailCustomer from './componentes/DetailCustomer';
import EditCustomer from './componentes/EditCustomer';
// 라우터 적용
import { Routes, Route } from 'react-router-dom';

function App() {
  const title = "그린고객관리";
  
  return (
    <div className="App">
      <Header title={title}/>
      <div className='contents'>
        <Routes>
          <Route path='/' element={<CustomerList/>}/>
          <Route path='/create' element={<CreateCustomer />}/>  
          <Route path='/customer/:id' element={<DetailCustomer />}/>
          <Route path='/edit/:id' element={<EditCustomer />}/>
        </Routes>
      </div>
      <Footer title={title}/>
    </div>
  );
}

export default App;
