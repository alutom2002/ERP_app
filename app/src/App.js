import 'toastr/build/toastr.css';
import './style/Table.scss';

import { Route, Routes, useNavigate } from "react-router-dom";
import Nav from "./component/Nav";
import HomePage from "./page/HomePage";
import LoginPage from "./page/LoginPage";

import Tabs from './component/Tabs';
import CreatePOPage from './page/CreatePOPage';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { setAccount } from './redux/action/account';

import { stateToProps } from './helper/stateToProps';
import OrderPage from './page/OrderPage';
import ScanPage from './page/ScanPage';
import CreatePBPage from './page/CreatePBPage';
import BatchPage from './page/BatchPage';
import toastr from "toastr";
toastr.options = {
	timeOut: 2000,
	showDuration: 200,
	hideDuration: 300,
	// positionClass: 'toast-bottom-right',
};

function App(props) {
	const nav= useNavigate();

	useEffect(()=>{
		if(window.location.pathname.includes('qr'))
			return;
		if(props.account.role === ''){
			const account = sessionStorage.getItem('account');
        	if(!account){
            	return nav('/login');
        	}

			const {name, role, address} = JSON.parse(account);
        	props.setAccount(name, role, address);
        }
    }, []);


  	return (
  	  	<>
			<Nav/>
			<Tabs/>
			<Routes>
				<Route path="/" element={<HomePage/>}></Route>
				<Route path="/login" element={<LoginPage/>}></Route>
				<Route path="/create-purchase-order" element={<CreatePOPage/>}></Route>
				<Route path="/create-production-batch" element={<CreatePBPage/>}></Route>
				<Route path="/orders/:id" element={<OrderPage/>}></Route>
				<Route path="/scan" element={<ScanPage/>}></Route>
				<Route path="/batchs/:id" element={<BatchPage/>}></Route>
				<Route path="/qr/o/:id" element={<OrderPage/>}></Route>
				<Route path="/qr/b/:id" element={<BatchPage/>}></Route>
			</Routes>
		</>
  	);
}

const mapDispatchToProps = {
    setAccount
}

export default connect(stateToProps('account'), mapDispatchToProps)(App);
