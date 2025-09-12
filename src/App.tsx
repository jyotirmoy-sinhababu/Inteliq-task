import './App.css';
// import MainScreen from './pages/MainScreen';
// import ChatArea from './pages/ChatArea';
// import Sidebar from './components/Sidebar';
import Layout from './pages/Layout';
import DataContext from './context/DataContext';
function App() {
  return (
    <DataContext>
      {/* <Sidebar /> */}
      <Layout />
      {/* <ChatArea /> */}
      {/* <MainScreen /> */}
    </DataContext>
  );
}

export default App;
