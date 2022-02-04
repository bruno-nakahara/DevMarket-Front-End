import Header from './components/Header';
import Form from './components/Form';
import './styles/global.css';
import Table from './components/Table';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  return (
    <div className='container'> 
      {/* Adicionar react-toastify para notificar o usuário sobre o processo */}
      <ToastContainer />     
      <Header />      
      <Form />  
      <Table />  
    </div>
  );
}

export default App;
