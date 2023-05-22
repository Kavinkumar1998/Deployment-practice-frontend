
import './App.css';
import { Route } from 'react-router-dom';
import { Login } from './Components/Login/Login';
import { Signup } from './Components/Signup/Signup';
import Forgetpassword from './Components/Forgetpassword/Forgetpassword';
import { VerifyOTP } from './Components/Verifyotp/Verifyotp';
import { Setpassword } from './Components/Setpassword/Setpassword';
import { Home } from './Components/Home/Home';
import About from './Components/About/About';

function App() {
  return (
    <div className="App">
      
     <Route  exact path = "/">
     <Login/>
      </Route>


      <Route  exact path = "/Signup">
     <Signup/>
      </Route>

      <Route path="/Forgetpassword">
     <Forgetpassword/>
      </Route>

      <Route path="/Verifyotp">
     <VerifyOTP/>
      </Route>

      <Route path="/Setpassword">
     <Setpassword/>
      </Route>

      
      <Route path="/Home">
     <Home/>
      </Route>

      
      <Route path="/About/:Id">
     <About/>
      </Route>

    </div>
  );
}

export default App;
