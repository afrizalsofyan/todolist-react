import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import DetailListItem from './pages/DetailListItem';
import NewActivity from './pages/NewActivity';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<Dashboard />} />
        <Route index path='/new-activity' element={<NewActivity />} />
        <Route index path='/details/:idActivity' element={<DetailListItem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
