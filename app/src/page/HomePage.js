import { useEffect } from "react";
import { connect } from "react-redux";
import { stateToProps } from "../helper/stateToProps";
import { setAccount } from '../redux/action/account';
import { ROLE } from '../helper/role';
import ManagerSection from "../component/ManagerSection";
import ManufacturingTab from "../component/ManufacturingTab";
import PurchaseTab from "../component/PurchaseTab";

function HomePage(props){
    useEffect(()=>{
        if(props.account.role !== '')
            enableAccount();
    }, []);

    async function enableAccount(){
        await window.ethereum.request({method: 'eth_requestAccounts'});
	}

    if(props.account.role === ROLE.MANAGER)
        return (
            <div className="page home-page">
                <ManagerSection/>
            </div>
        );
        
    if(props.account.role === ROLE.SUPPLIER || props.account.role === ROLE.RETAILER)
        return (
            <div className="page home-page">
                <PurchaseTab/>
            </div>
        );

    return <ManufacturingTab/>
}

const mapDispatchToProps = {
    setAccount
}

export default connect(stateToProps('account'), mapDispatchToProps)(HomePage);