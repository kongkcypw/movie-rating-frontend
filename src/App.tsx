import './App.css'
import { BrowserRouter } from "react-router-dom";
import Routes from './Routes';
import { UserProvider } from './contexts/UserContext';

const App: React.FC = ({}) => {

  return (
    <BrowserRouter>
      <UserProvider>
        <Routes />
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
