import '../style/CreatePOPage.scss';

import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ROLE } from "../helper/role";
import { useParams } from 'react-router-dom';
import { contract, web3Socket } from '../helper/web3';
import toastr from 'toastr';
import { ORDER_STATUS } from '../helper/status';
import { stateToProps } from '../helper/stateToProps';
import Timeline from '../component/Timeline';
import QR from '../component/QR';
import { CONTRACT_ADDRESS } from '../config/contract.config';

function OrderPage(props){
    const {id} = useParams();
    const {role, address} = props.account;
    const [order, setOrder] = useState();
    const [names, setNames] = useState([]);

    useEffect(()=>{
        getOrderData();
    }, []);

    useEffect(()=>{
        if(!order)
            return;

        const status = ORDER_STATUS[order.timeline[order.timeline.length - 1].status];
        if(status === 'RECEIVED' || status === 'CANCEL' || status === 'DENIED')
            return;

        console.log(1);
        const event_hash = web3Socket.utils.sha3('reload()');
        web3Socket.eth.subscribe('logs',{ address: CONTRACT_ADDRESS, topics: [event_hash]}, (error, event) => {})
        .on('data', function(event){
            getOrderData();
        })
        .on('error', function(error, receipt) { 
            console.log('Error:', error, receipt);
        });
    }, [order]);

    async function getOrderData(){
        try{
            const data = await contract.methods.getOrderById(id).call();
            setOrder(data);
            if(data.supplier.name === "Manager"){
                const data2 = await contract.methods.getPurchaseOrderName(id).call();
                setNames(data2);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    function getNextStatus(status){
        if((role === ROLE.MANAGER && address !== order.supplier.account) || role === ROLE.RETAILER){
            switch(status){
                case 'CREATED':
                    return {
                        name: 'Request order',
                        next: 1
                    };
                case 'ORDERING':
                case 'ACCEPTED':
                    return null;
                case 'DELIVERING':
                    return {
                        name: 'Receive',
                        next: 5
                    };
            }
        }
        else{
            switch(status){
                case 'CREATED':
                    return null;
                case 'ORDERING':
                    return {
                        name: 'Accept Order',
                        next: 2
                    };
                case 'ACCEPTED':
                    return {
                        name: 'Delivery',
                        next: 4
                    };
                case 'DELIVERING':
                    return null;
            }
        }
    }

    function changeStatus(nextStatus){
        try{
            if(nextStatus === 5){
                contract.methods.receiveMaterialOrder(id).send({from: address})
                .once('receipt', r => {
                    console.log(r);
                    toastr.success('Change state success!');
                });
            }
            else{
                contract.methods.changeOrderStatus(id, nextStatus).send({from: address})
                .once('receipt', r => {
                    console.log(r);
                    toastr.success('Change state success!');
                });
            }
        }
        catch(e){
            console.log(e);
        }
    }

    function getTitle(){
        if(role === ROLE.SUPPLIER && address === order.supplier.account)
            return 'Sale Order';
        else if(role === ROLE.RETAILER && address === order.customer.account)
            return 'Purchase Order';
        else if(role === ROLE.MANAGER){
            if(address === order.customer.account)
                return 'Purchase Order';
            else
                return 'Sale Order';
        }
        else
            return 'Order';
    }

    if(!order)
        return null;

    const status = ORDER_STATUS[order.timeline[order.timeline.length - 1].status];
    const orderDate = new Date(parseInt(order.order_date)*1000).toLocaleDateString();
    const receivedDate = order.received_date === '0' ? '' : new Date(parseInt(order.received_date)*1000).toLocaleDateString();
    const canChangeStatus = status !== 'RECEIVED' && status !== 'CANCEL' && status !== 'DENIED' && (role === ROLE.MANAGER || role === ROLE.RETAILER || (role === ROLE.SUPPLIER && address === order.supplier.account));
    const nextStatus = getNextStatus(status);

    return(
        <div className="page create-po-page">
            <div className="center-wrapper">
                <h2>{getTitle()} {id}</h2>
                {
                    canChangeStatus && (
                        <div className='order-btn-container'>
                            {(status === 'ORDERING' && (role === ROLE.SUPPLIER || (role === ROLE.MANAGER && address === order.supplier.account))) &&  <button className='btn cancel' onClick={()=>changeStatus(3)}>Deny order</button>}
                            {((status === 'CREATED' || status === 'ORDERING') && ((role === ROLE.MANAGER && address !== order.supplier.account) || role === ROLE.RETAILER)) &&  
                                <button className='btn cancel' onClick={()=>changeStatus(6)}>Cancel order</button>
                            }
                            {nextStatus && <button className='btn submit' onClick={()=>changeStatus(nextStatus.next)}>{nextStatus.name}</button>}
                        </div>
                    )
                }
                {(status === 'RECEIVED' && !window.location.pathname.includes('qr')) && <QR value={'/o/' + id}/>}
                <h3>Infomations:</h3>
                <p>Customer: <span>{order.customer.name}</span></p>
                <p>Supplier: <span>{order.supplier.name}</span></p>
                <p>Order date: <span>{status !== 'CREATED' ? orderDate : ''}</span></p>
                <p>Receive date: <span>{receivedDate}</span></p>
                <p>Status: <span>{status}</span></p>
                <h3>Order list:</h3>
                {
                    order.supplier.name !== "Manager" ?
                    (
                        <div className="table order-list">
                            <ul className="row header">
                                <li>Name</li>
                                <li>Quantity</li>
                                <li>Unit</li>
                            </ul>
                            {
                                order.order_list.map((order, i) => (
                                    <ul className='row' key={i}>
                                        <li>{order.name}</li>
                                        <li>{order.quantity}</li>
                                        <li>{order.unit}</li>
                                    </ul>
                                ))
                            }
                        </div>
                    )
                    :
                    (
                        <div className="table order-list">
                            <ul className="row header">
                                <li>Product ID</li>
                                <li>Product Name</li>
                                <li>Quantity</li>
                                {status === 'RECEIVED' && <li>QR</li>}
                            </ul>
                            {
                                order.product_order_list.map((order, i) => (
                                    <ul className='row' key={i}>
                                        <li>{order.batch_id}</li>
                                        <li>{names[i]}</li>
                                        <li>{order.quantity}</li>
                                        {status === 'RECEIVED' && <li><QR value={'/b/' + order.batch_id}/></li>}
                                    </ul>
                                ))
                            }
                        </div>
                    )
                }
                <Timeline timeline={order.timeline} status_names={ORDER_STATUS}/>
            </div>
        </div>
    )
}

export default connect(stateToProps('account'))(OrderPage);