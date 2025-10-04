import ShortenUrlPage from "./components/ShortenUrlPage";
import LandingPage from './components/LandingPage'
import AboutPage from './components/AboutPage'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import RegisterPage from './components/RegisterPage'
import { Toaster } from 'react-hot-toast'
import LoginPage from './components/LoginPage'
import DashboardPage from './components/Dashboard/DashboardPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "./components/ErrorPage";
const AppRouter = () => {
    return(
        <>
        <NavBar/>
        <Toaster/>
            <Routes>
            <Route path='/' element={<LandingPage/>}/>
            <Route path='/about' element={<AboutPage/>}/>

            <Route path="/register" element={<PrivateRoute publicPage={true}><RegisterPage /></PrivateRoute>} />
            <Route path="/login" element={<PrivateRoute publicPage={true}><LoginPage /></PrivateRoute>} />
          
            <Route path="/dashboard" element={ <PrivateRoute publicPage={false}><DashboardPage /></PrivateRoute>} />

            
            <Route path='/error' element={<ErrorPage message="Internal Server Error. Please try again later."/>}/>
            <Route path='*' element={<ErrorPage message="404 Page Not Found. It seems like that the page does not exist or has been removed."/>}/>                //Except Others
            </Routes>
        <Footer/>
        </>
    );
}

export default AppRouter;

export const SubDomainRouter = () => {
    return(
        <Routes>
            <Route path='/:url' element={<ShortenUrlPage/>}/>
        </Routes>
    )
}