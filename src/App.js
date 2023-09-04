
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

// component 
import Home from './pages/Home';
import Questions from './component/Questions';
import Navigation from './component/Navigation';
import Login from './pages/Login';
import NotFound from './component/NotFound';
import Signup from './pages/Signup';
import Leaderboard from './component/Leaderboard';
import Banner from './component/Banner';

// context
import useQuestionContext from './hooks/useQuestionContext';
import useAuthContext from './hooks/useAuthContext';
import Invalid from './pages/Invalid';



function App() {
  const { Auth } = useAuthContext()
  const { validate } = useQuestionContext()

  return (
    <div className="App">
      <BrowserRouter>
        {validate && <Banner />}
        <Navigation />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:test' element={<Questions />} />
          <Route path='/error' element={<NotFound />} />
          <Route path='/login' element = {!Auth ? <Login /> : <Navigate to = '/'/>}/>
          <Route path='/signup' element = {!Auth ? <Signup/> : <Navigate to= '/'/>}/>
          <Route path='/leaderboard' element={Auth ? <Leaderboard /> : <Navigate to='/login' />} />

          <Route path='*' element={<Invalid />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
