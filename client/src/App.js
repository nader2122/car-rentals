import './App.css';
import NavBar from './component/NavBar';
import {Routes , Route} from 'react-router-dom';
import HomeScreen from './screen/HomeScreen';
import BookScreen from './screen/BookScreen';
import RegisterScreen from './screen/RegisterScreen';
import LoginScreen from './screen/LoginScreen';
import ProfileScreen from './screen/ProfileScreen';
import Cover from './screen/Cover';
import Footer from './component/Footer'
import BookedTable from './screen/BookedTable';
import CarsTable from './screen/CarsTable';
import AddCars from './screen/AddCars';
import UsersTable from './screen/UsersTable';
import PrivateRoutes from './PrivateRoutes';






function App() {

  
  return (
    <div className="App">
     <NavBar/>
     <main className='mains'>
     <Routes>
<Route path="/login" element={<LoginScreen/>}  />
<Route path='/register' element={<RegisterScreen/>}/>
<Route path='/home' element={<HomeScreen/>}  />

<Route path='/profil' element={<ProfileScreen/>}/>
<Route path='/book/:bookid/:fromdate/:todate' element={<BookScreen/>} />

<Route element={<PrivateRoutes/>}>

<Route path='/userstable' element={<UsersTable/>}/>
<Route path='/bookedtable' element={<BookedTable/>}/>
<Route path='/carstable' element={<CarsTable/>}/>
<Route path='/addcars' element={<AddCars/>}/>

</Route>

<Route path='/' element={<Cover/>}/>

     </Routes>
     </main>
     <Footer/>
    </div>
  );
}

export default App;
