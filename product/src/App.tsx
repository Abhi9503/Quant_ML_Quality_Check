import { useState } from 'react';
import reactLogo from './assets/react.svg';
import { FrappeProvider } from 'frappe-react-sdk';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Product } from './pages/product';
import Home from './component/Home';
import Cheakquality from './component/Checkquality';
import Camera from './component/Camera';
import { MyAuthComponent } from './component/Login';
import Uploadproduct from './component/Uploadproduct';
import Loginpage from './component/Loginpage';
function App() {
  return (
	<div className="App">
	  <FrappeProvider socketPort={import.meta.env.VITE_SOCKET_PORT}>
			<BrowserRouter basename={import.meta.env.VITE_BASE_PATH ?? ''}>
				<Routes>
					<Route path='/login' element={<h1>Login</h1>}/>,
					<Route path='/' element={<Home/>}/>,
					<Route path='/auth' element={<MyAuthComponent/>}/>,
					<Route path='/Cheakquality' element={<Cheakquality/>}/>,
					<Route path='/Camera' element={<Camera/>}/>
					<Route path='/Uploadproduct' element={<Uploadproduct/>}/>,
					<Route path='/Loginpage' element={<Loginpage/>}/>
				</Routes>		
			</BrowserRouter>
	  </FrappeProvider>
	</div>
  )
}
export default App
