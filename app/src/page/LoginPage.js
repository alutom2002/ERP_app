import '../style/LoginPage.scss';

import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { accounts } from "../helper/accounts";
import { stateToProps } from "../helper/stateToProps";
import { setAccount } from '../redux/action/account';
import toastr from 'toastr';

function LoginPage(props){
    const nav = useNavigate();
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(()=>{
        if(props.account.role !== ''){
            nav('/');
        }
    }, []);

    function login(e){
        e.preventDefault();

        const {name, role, address} = accounts[selectedIndex];
        props.setAccount(name, role, address);
        
        toastr.success('Login success!');
        nav('/');
    }

    return (
        <div className="page login-page">
            <div className="form-container">
                <h2>Sign In</h2>
                <form onSubmit={login}>
                    <select onChange={e => setSelectedIndex(e.target.value)}>
                        {
                            accounts.map((account, index) => <option key={account.address} value={index}>{account.name}</option>)
                        }
                    </select>
                    <button className="btn login-btn" type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

const mapDispatchToProps = {
    setAccount
}

export default connect(stateToProps('account'), mapDispatchToProps)(LoginPage);