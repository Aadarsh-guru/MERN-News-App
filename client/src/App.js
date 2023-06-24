import Home from './pages/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import Category from './pages/Category'
import About from './pages/About'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsAndConditions from './pages/TermsAndConditions'
import LoginDialog from './components/Login'
import Sidebar from './components/Sidebar'
import UpdateUserInfo from './components/UpdateUserInfo'
import DashboardRoutes from './protected-routes/DashboardRoutes'
import Dashboard from './pages/Dashboard'
import UpdateNewsForm from './components/dashboard-components/UpdateNewsForm'
import News from './pages/News'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/category/:category' element={<Category />} />
        <Route path='/news/:id' element={<News />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/terms-and-conditions' element={<TermsAndConditions />} />
        <Route path='/dashboard' element={<DashboardRoutes />} >
          <Route path='/dashboard/home' element={<Dashboard />} />
          <Route path='/dashboard/update/:id' element={<UpdateNewsForm />} />
        </Route>
        <Route path='/*' element={<Navigate to='/' />} />
      </Routes>
      <Sidebar />
      <LoginDialog />
      <UpdateUserInfo />
    </>
  )
}

export default App