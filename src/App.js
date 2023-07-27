
import {
  BrowserRouter as Router,

  Route,

  Routes,

} from 'react-router-dom'
import { NavBar } from './components/navigationBar';
import { HomePage } from './components/homepage';
import { SinglePhonePage } from './features/smartphones/singlePhonePage';
import { PhoneEditComponent } from './features/smartphones/editPhoneInfo';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getProductsList } from './features/smartphones/phoneSlice';
import { PhoneAddingComponent } from './features/smartphones/addingPhoneInfo';
import { getProductsListCM } from './features/comments/commentSlice';

function App() {

  const dispatch = useDispatch();
  const phonesStatus = useSelector(state => state.phones.status);
 const commentStatus = useSelector(state=> state.comments.status);

  useEffect(() => {
      if (phonesStatus === 'idle') {
        dispatch(getProductsList());
      }
    }, [phonesStatus, dispatch]);
    useEffect(() => {
      if (commentStatus === "idle") {

          dispatch(getProductsListCM());
      }
  }, [commentStatus, dispatch]);
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path='/' element={
       <HomePage />
        }>  
        
        </Route>
        <Route exact path= '/phones/:id' element={
          <SinglePhonePage/>
        }/>
        <Route exact path='/phones/:id/edit' element={
        <PhoneEditComponent/>
        }/>
        <Route exact path='/phones/adding' element={
        <PhoneAddingComponent/>
        }/>

      </Routes>
    
    </Router>
  );
}

export default App;
