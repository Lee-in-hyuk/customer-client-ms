import './App.css';
import Header from './componentes/Header';
import Footer from './componentes/Footer';
import CustomerList from './componentes/CustomerList';

function App() {
  const title = "그린고객관리";
  // db만들기전에 임시로 만드는 데이터
  const sampleData = [
    {
      no:0,
      name: "김그린",
      phone: '010-1234-1234',
      birthday: '1987-12-12',
      gender: '남성',
      addr: '울산 남구 삼산동 화합로 12'
    },
    {
      no:1,
      name: "이블루",
      phone: '010-1234-4321',
      birthday: '1987-12-13',
      gender: '여성',
      addr: '울산 남구 삼산동 화합로 15'
    },
    {
      no:3,
      name: "성레드",
      phone: '010-4321-1234',
      birthday: '1987-11-12',
      gender: '여성',
      addr: '울산 남구 삼산동 화합로 22'
    },
  ]
  return (
    <div className="App">
      <Header title={title}/>
      <CustomerList sampleData={sampleData}/>
      <Footer title={title}/>
    </div>
  );
}

export default App;
