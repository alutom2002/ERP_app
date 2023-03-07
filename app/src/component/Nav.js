import '../style/Nav.scss';

import { stateToProps } from "../helper/stateToProps";
import { connect } from 'react-redux';
import { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { clearAccount } from '../redux/action/account';
import { ROLE_TO_NAME } from '../helper/role';
import toastr from "toastr";

function Nav(props){
    const nav = useNavigate();

    if(window.location.pathname.includes('qr'))
		return null;

    function logout(){
        localStorage.clear();
        props.clearAccount();
        toastr.success('Logout success!');
        nav('/login');
    }

    if(props.account.role === '')
        return(
            <div className="nav">
                <div className='center-wrapper none'>
                    <h2><Link to='/'>Niken</Link></h2>
                </div>
            </div>
        );    

    return (
        <div className="nav">
            <div className="center-wrapper">
                <h2><Link to='/'>Niken</Link></h2>
                {/* <p>Name: <span>{props.account.name}</span></p> */}
                <p>Role: <span>{ROLE_TO_NAME[props.account.role]}</span></p>
                <button className='btn logout-btn' onClick={logout}>Logout</button>
            </div>
        </div>
    )
}

const mapDispatchToProps = {
    clearAccount
}

export default connect(stateToProps('account'), mapDispatchToProps)(Nav);