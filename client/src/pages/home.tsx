import Navbar from '../components/Navbar';
import Body from '../components/Body';
import Footer from '../components/Footer';

function App() {

  return (
    <div style={{height: "100%"}}>
      <Navbar activeItem="none" />
      <Body/>
      <div className='footerHome'>
        <Footer/>
      </div>
    </div>
  )
}

export default App
