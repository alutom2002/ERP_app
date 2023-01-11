import '../style/ManagerSection.scss';

import { connect } from "react-redux";
import { stateToProps } from "../helper/stateToProps";
import PurchaseTab from './PurchaseTab';
import ManufacturingTab from './ManufacturingTab';

function ManagerSection(props){
    const tab = props.tab;

    return (
        <div className="manager-section">
            {tab === 0 && <PurchaseTab/>}
            {tab === 1 && <ManufacturingTab/>}
            {tab === 2 && <PurchaseTab isSaleTab={true}/>}
        </div>
    )
}

export default connect(stateToProps('account', 'tab'))(ManagerSection);