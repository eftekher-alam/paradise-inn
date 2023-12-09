import { Outlet } from 'react-router-dom'
import NavBar from './components/navBar/NavBar'
import Newsletter from './components/newsletter/Newsletter'
import Footer from './components/footer/Footer'
import { Helmet } from 'react-helmet'
import { useContext } from 'react'
import { AuthContext } from './providers/AuthProvider'

function App() {
  const { title } = useContext(AuthContext);

  return (
    <div className='relative'>
      <Helmet>
        <title>Paradise Inn | {title}</title>
      </Helmet>
      <div className='absolute w-full'>
        <NavBar></NavBar>
      </div>
      <div>
        <Outlet></Outlet>
      </div>
      <div
        data-aos="fade-up"
        data-aos-duration="500"
      >
        <Newsletter></Newsletter>
        <Footer></Footer>
      </div>
    </div>
  )
}

export default App
