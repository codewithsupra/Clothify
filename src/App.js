import Home from "./routes/home/home.component";
import {Routes,Route,} from 'react-router-dom';
import Navigation from "./components/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component"
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChangedListener } from "./utils/firebase/firebase.utils";
import { createUserDocumentFromAuth } from "./utils/firebase/firebase.utils";
import { setCurrentUser } from "./store/user/user.action";




const App = () => {
  const dispatch=useDispatch();
  useEffect(
    ()=>{
        const unsubscribe=onAuthStateChangedListener((user)=>{
            if(user){
               createUserDocumentFromAuth(user);
               console.log(user.displayName);
            }
            dispatch(setCurrentUser(user));
        })
        return unsubscribe;

    },[dispatch]);
  return(
    <Routes> 
      <Route path='/' element={<Navigation/>}>
      <Route index  element={<Home />} />
      <Route path='/auth' element={<Authentication/> }/>
      <Route path='/shop/*' element={<Shop/>} />
      <Route path='/checkout' element={<Checkout/>} />
      
      </Route>

    </Routes>
    
     );
};

export default App;
