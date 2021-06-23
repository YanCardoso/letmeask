import { BrowserRouter, Route } from 'react-router-dom'

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

import { AuthContextProvider } from "./context/AuthContext"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthContextProvider>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
        </AuthContextProvider>
      </BrowserRouter>

    </div>
  );
}

export default App;
