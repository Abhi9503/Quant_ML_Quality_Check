import { FrappeProvider } from 'frappe-react-sdk';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import Checkquality from './component/Checkquality';
import Camera from './component/Camera';
import Uploadproduct from './component/Uploadproduct';
import Loginpage from './component/Loginpage';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Addproductdetails from './component/Addproductdetails';
function App() {
  return (
	<div className="App">
	  <FrappeProvider socketPort={import.meta.env.VITE_SOCKET_PORT}>
			<BrowserRouter basename={import.meta.env.VITE_BASE_PATH ?? ''}>
				<ToastContainer position="top-right" autoClose={5000} />
					<Routes>
						<Route path='/login' element={<h1>Login</h1>}/>,
						<Route path='/' element={<Home/>}/>,
						<Route path='/Checkquality' element={<Checkquality/>}/>,
						<Route path='/Camera' element={<Camera/>}/>
						<Route path='/Addproductdetails' element={<Addproductdetails/>}/>,
						<Route path='/Uploadproduct' element={<Uploadproduct/>}/>,
						<Route path='/Loginpage' element={<Loginpage/>}/>
					</Routes>
			</BrowserRouter>
	  </FrappeProvider>
	</div>
  )
}
export default App
