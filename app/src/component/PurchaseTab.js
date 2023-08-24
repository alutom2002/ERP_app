import '../style/OrderSection.scss';

import { connect } from "react-redux";
import { stateToProps } from "../helper/stateToProps";
import { contract, web3Socket } from "../helper/web3";
import { useEffect, useState } from "react";
import { ORDER_STATUS } from '../helper/status';
import { useNavigate } from 'react-router-dom';
import { FaInfoCircle, FaPlus } from 'react-icons/fa';
import { ROLE } from "../helper/role";
import { CONTRACT_ADDRESS } from '../config/contract.config';

function PurchaseTab(props) {
    const nav = useNavigate();
    const { role } = props.account;
    const [POList, setPOList] = useState([]);
    const isSaleTab = props.isSaleTab || role === ROLE.RETAILER;
    useEffect(() => {
        const event_hash = web3Socket.utils.sha3('reload()');
        web3Socket.eth.subscribe('logs', { address: CONTRACT_ADDRESS, topics: [event_hash] }, (error, event) => { })
            .on('connected', function () {
                console.log('CONNECTED !!!!')
            })
            .on('data', function (event) {
                getMaterialOrderList();
            })
            .on('error', function (error, receipt) {
                console.log('Error:', error, receipt);
            });
    }, []);

    useEffect(() => {
        getMaterialOrderList();
    }, [props.account.address]);

    async function getMaterialOrderList() {
        try {
            let isSO = isSaleTab;
            //let namee = role === ROLE.RETAILER ? "Retailer" : ""; 
            /* if(role === ROLE.MANAGER && isSaleTab === true){
                isSO = true;
            }
            else if(role === ROLE.MANAGER && isSaleTab === false){
                isSO = false;
            }                
            else isSO = true;   */
            const mat_order_list = await contract.methods.getOrder("", isSO).call();
            console.log(mat_order_list);
            setPOList(mat_order_list.filter(o => {
                if (isSaleTab && role === ROLE.MANAGER) {
                    return o.id !== '0' && o.timeline[o.timeline.length - 1].status !== '0';
                }
                return o.id !== '0';
            }));

        }
        catch (e) {
            console.log(e);
        }
    }
    
    return (
        <div className="tab">
            <div className="center-wrapper">
                <div className="header-container">
                    <h2 className="tab-header">{isSaleTab ? 'Product Order' : 'Material Order'}</h2>
                    {((role === ROLE.MANAGER && !isSaleTab) || role === ROLE.RETAILER) && <button className="btn" onClick={() => nav('/create-purchase-order')}><span className="icon"><FaPlus /></span>Create purchase order</button>}
                </div>
                <div className="table">
                    <ul className="row header">
                        <li>ID</li>
                        <li>Supplier</li>
                        <li>Order Date</li>
                        <li>Received Date</li>
                        <li>Last Status</li>
                        <li></li>
                    </ul>
                    {
                        POList.map(order => {
                            console.log(order);
                            const len = order.timeline.length;
                            const currentStatus = ORDER_STATUS[order.timeline[len - 1].status];
                            const orderDate = new Date(parseInt(order.order_date) * 1000).toLocaleDateString();
                            const receivedDate = order.received_date !== '0' ? new Date(parseInt(order.received_date) * 1000).toLocaleDateString() : '';
                            return (
                                <ul key={order.id} className="row">
                                    <li>{order.id}</li>
                                    <li>{order.supplier}</li>
                                    <li>{orderDate}</li>
                                    <li>{receivedDate}</li>
                                    <li>{currentStatus}</li>
                                    <li><button className="btn" onClick={() => nav('/orders/' + order.id)}><span className="icon"><FaInfoCircle /></span>Details</button></li>
                                </ul>
                            );
                        })
                    }
                    {POList.length === 0 && <ul className='row'><li>None</li></ul>}
                </div>
            </div>
        </div>
    );
}

export default connect(stateToProps('account'))(PurchaseTab);