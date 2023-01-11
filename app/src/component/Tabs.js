import '../style/Tabs.scss';

import { connect } from 'react-redux';
import { stateToProps } from '../helper/stateToProps';
import { ROLE } from '../helper/role';
import { changeTab } from '../redux/action/tab';
import { useNavigate } from 'react-router-dom';

function Tabs(props){
    const nav = useNavigate();

    if(props.account.role !== ROLE.MANAGER)
        return null;

    const tab = props.tab;

    function changeTab(index){
        nav('/');
        props.changeTab(index);
    }

    return(
        <ul className="tab-btn-container">
            <li className={tab === 0 ? 'selected' : ''} onClick={()=>changeTab(0)}>Purchase Order</li>
            <li className={tab === 1 ? 'selected' : ''} onClick={()=>changeTab(1)}>Manufacturing</li>
            <li className={tab === 2 ? 'selected' : ''} onClick={()=>changeTab(2)}>Sale Order</li>
        </ul>
    );
}

const mapDispatchToProps = {
    changeTab
};

export default connect(stateToProps('account', 'tab'), mapDispatchToProps)(Tabs);