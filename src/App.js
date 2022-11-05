import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import DetailListItem from './pages/DetailListItem';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<Dashboard />} />
        <Route index path='/details/:idActivity' element={<DetailListItem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
