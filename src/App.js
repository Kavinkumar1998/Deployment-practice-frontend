import './App.css';
import { Route } from 'react-router-dom';
import { Login } from './Components/Login/Login';
import { Signup } from './Components/Signup/Signup';
import Forgetpassword from './Components/Forgetpassword/Forgetpassword';
import { VerifyOTP } from './Components/Verifyotp/Verifyotp';
import { Setpassword } from './Components/Setpassword/Setpassword';
import { Home } from './Components/Home/Home';
import About from './Components/About/About';
import { Cart } from './Components/Cart/Cart';
import { Info } from './Components/Info/Info';
import { Orders } from './Components/Orders/Orders';

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

      <Route path="/Cart">
     <Cart/>
      </Route>

      <Route path="/Info">
     <Info/>
      </Route>


      <Route path="/Order">
     <Orders/>
      </Route>

    </div>
  );
}

export default App;
