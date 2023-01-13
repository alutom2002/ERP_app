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
import QualityTable from '../component/QualityTable';
import QR from '../component/QR';
import { CONTRACT_ADDRESS } from '../config/contract.config';
import CryptoJS from "crypto-js";

function OrderPage(props) {
    const { id } = useParams();
    const { role, address } = props.account;
    const [order, setOrder] = useState();
    const [names, setNames] = useState([]);
    const [data, setData] = useState([]);
    
    /* const [encrptedData, setEncrptedData] = useState("");

    const secretPass = "XkhZG4fW2t2W";

    const encryptData = (id) => {
        const data = CryptoJS.AES.encrypt(
            JSON.stringify(id),
            secretPass
        ).toString();

        setEncrptedData(data);
    }; */

    console.log(order);
    useEffect(() => {
        getOrderData();
        getProductCus();
    }, []);

    useEffect(() => {
        if (!order)
            return;

        const status = ORDER_STATUS[order.timeline[order.timeline.length - 1].status];
        if (status === 'RECEIVED' || status === 'CANCEL' || status === 'DENIED')
            return;

        const event_hash = web3Socket.utils.sha3('reload()');
        web3Socket.eth.subscribe('logs', { address: CONTRACT_ADDRESS, topics: [event_hash] }, (error, event) => { })
            .on('data', function (event) {
                getOrderData();
                getProductCus();
            })
            .on('error', function (error, receipt) {
                console.log('Error:', error, receipt);
            });
    }, [order]);

    async function getOrderData() {
        try {
            const data = await contract.methods.getOrderById(id).call();
            setOrder(data);
            /* if (data.supplier === "Manager") {
                const data2 = await contract.methods.getPurchaseOrderName(id).call();
                setNames(data2);
            } */
        }
        catch (e) {
            console.log(e);
        }
    }

    function getNextStatus(status) {
        if (role === ROLE.RETAILER || (role === ROLE.MANAGER && order.isSO === false)) {
            switch (status) {
                case 'CREATED':
                    return {
                        name: 'Request order',
                        next: 1
                    };
                case 'PENDING':
                    return null
                case 'ACCEPTED':
                    return null;
                case 'DELIVERING':
                    return {
                        name: 'Receive',
                        next: 5
                    };
            }
        }
        else {
            switch (status) {
                case 'CREATED':
                    return null;
                case 'PENDING':
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

    async function getProductCus() {
        try {
            const data = await contract.methods.getProducts().call();
            console.log(data);
            setData(data);
        }
        catch (e) {
            console.log(e);
        }
    }

    function changeStatus(nextStatus) {
        try {
            contract.methods.changeOrderStatus(id, nextStatus)
                .send({ from: "0xb2D9757eE9Dcc527b5dAA25da9F3B3c1bB1FFaE6" })
                .once('receipt', r => {
                    console.log(r);
                    toastr.success('Change state success!');
                });
        }
        catch (e) {
            console.log(e);
        }
    }
    function getTitle() {
        if (role === ROLE.SUPPLIER)
            return 'Purchase Order';
        else if (role === ROLE.RETAILER)
            return 'Sale Order';
        else if (role === ROLE.MANAGER) {
            if (order.isSO === false)
                return 'Purchase Order';
            else
                return 'Sale Order';
        }
        else
            return 'Order';
    }
    if (!order)
        return null;
    const status = ORDER_STATUS[order.timeline[order.timeline.length - 1].status];
    const orderDate = new Date(parseInt(order.order_date) * 1000).toLocaleDateString();
    const receivedDate = order.received_date === '0' ? '' : new Date(parseInt(order.received_date) * 1000).toLocaleDateString();
    const canChangeStatus = status !== 'RECEIVED' && status !== 'CANCEL' && status !== 'DENIED' && (role === ROLE.MANAGER || role === ROLE.RETAILER || role === ROLE.SUPPLIER);
    const nextStatus = getNextStatus(status);

    return (
        <div className="page create-po-page">
            <div className="center-wrapper">
                <h2>{getTitle()} {id}</h2>
                {/* <button className='btn submit' onClick={() => encrptedData(1)}>Create qr</button> */}
                {
                    canChangeStatus && (
                        <div className='order-btn-container'>
                            {((status === 'PENDING' && (role === ROLE.SUPPLIER)) || (status === 'PENDING' && (role === ROLE.MANAGER) && order.isSO === true)) && <button className='btn cancel' onClick={() => changeStatus(3)}>Deny order</button>}
                            {((status === 'CREATED') && ((role === ROLE.MANAGER) || role === ROLE.RETAILER)) &&
                                <button className='btn cancel' onClick={() => changeStatus(6)}>Cancel order</button>
                            }
                            {nextStatus && <button className='btn submit' onClick={() => changeStatus(nextStatus.next)}>{nextStatus.name}</button>}
                        </div>
                    )
                }
                {(status === 'RECEIVED' && (role === ROLE.RETAILER) && !window.location.pathname.includes('qr')) && <QR value={'/o/' + id} />}
                <h3>Infomations:</h3>
                <p>Customer: <span>{order.customer}</span></p>
                <p>Supplier: <span>{order.supplier}</span></p>
                <p>Order date: <span>{orderDate}</span></p>
                <p>Receive date: <span>{receivedDate}</span></p>
                <p>Status: <span>{status}</span></p>
                <h3>Order list:</h3>
                {
                    order.supplier !== "Manager" ?
                        (
                            <div className="table order-list">
                                <ul className="row header">
                                    <li>Name</li>
                                    <li>Quantity</li>
                                    <li>Unit</li>
                                </ul>
                                {
                                    order.mtl_list.map((order, i) => (
                                        <ul className='row' key={i}>
                                            <li className='dpnone'>{order.id}</li>
                                            <li className='dpnone'>{order.orderid}</li>
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
                                    {/* <li>Product ID</li> */}
                                    <li>Product Name</li>
                                    <li>Quantity</li>
                                    {status === 'RECEIVED' && <li>QR</li>}
                                </ul>
                                {
                                    order.item_list.map((order, i) => (
                                        <ul className='row' key={i}>
                                            {/* <li>{order.p[0].id}</li> */}
                                            <li>{order.p[0].name}</li>
                                            <li>{order.quantity}</li>
                                            {status === 'RECEIVED' && <li><QR value={'/b/' + order.batch_id} /></li>}
                                        </ul>
                                    ))
                                }
                            </div>
                        )
                }
                <Timeline timeline={order.timeline} status_names={ORDER_STATUS} />
                <QualityTable
                    data={data}
                />
            </div>
        </div>
    )
}

export default connect(stateToProps('account'))(OrderPage);