
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import HomeScreen from './pages/home';
import SignUpScreen from './pages/signup';
import SignInScreen from './pages/signin';
import TopHeader from './components/top_header';
import ProfileScreen from './pages/profile';
import MessagesScreen from './pages/messages';

function App() {
  return (
  <>
    <BrowserRouter>
      <TopHeader/>
      <Route exact path='/'>
        <HomeScreen/>
      </Route>
      <Route  path='/signup'>
        <SignUpScreen/>
      </Route>
      <Route  path='/signin'>
        <SignInScreen/>
      </Route>
      <Route  path='/profile/:id'>
        <ProfileScreen/>
      </Route>
      <Route  path='/message'>
        <MessagesScreen/>
      </Route>
    </BrowserRouter>


  </>
  );
}

export default App;
