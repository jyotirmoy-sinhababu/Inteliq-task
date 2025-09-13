import './App.css';

import Layout from './pages/Layout';
import { DataContext } from './context/DataContext';
function App() {
  return (
    <DataContext>
      <Layout />
    </DataContext>
  );
}

export default App;
