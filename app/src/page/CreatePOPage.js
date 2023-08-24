import '../style/CreatePOPage.scss';
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { accounts } from "../helper/accounts";
import { ROLE } from "../helper/role";
import { stateToProps } from "../helper/stateToProps";
import { FaTrash, FaPencilAlt, FaCheck, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { contract } from '../helper/web3';
import toastr from 'toastr';

const suppliers = accounts.filter(acc => acc.role === ROLE.SUPPLIER);

function CreatePOPage(props) {
    const nav = useNavigate();

    const { role, name: customer } = props.account;
    const [orderList, setOrderList] = useState([]);
    const [supplier, setSupplier] = useState(0);
    const [batchs, setBatchs] = useState([]);
    const [editIndex, setEditIndex] = useState(-1);
    const [openForm, setOpenForm] = useState(false);
    const [name, setName] = useState('vai da');
    const [quantity, setQuantity] = useState(10);
    const [unit, setUnit] = useState('met');
    const [receiveDate, setReceiveDate] = useState(0);
    const [batchIndex, setBatchIndex] = useState(0);

    useEffect(() => {
        const getBatchs = async () => { //
            const data = await contract.methods.getProducts().call();
            console.log("Products: ", data[0]);
            setBatchs(data[0]);
            console.log("Batchs: ", batchs);
        }
        if (role === ROLE.RETAILER)
            getBatchs();
    }, [props.account.role]);
    
    function openAddForm() {
        setOpenForm(true);
    }

    function openEditForm(i, { name, quantity, unit }) {
        setName(name);
        setQuantity(quantity);
        setUnit(unit);
        setEditIndex(i);
        setOpenForm(true);
    }

    function deleteOrderProduct(index) {
        setOrderList(state => state.filter((o, i) => i !== index));
    }

    function submitForm() {
        const orderProduct = {
            name: name,
            quantity: quantity,
            unit: unit
        };

        if (editIndex > -1) {
            setOrderList(orderList.map((o, i) => {
                if (i === editIndex)
                    return orderProduct;
                return o;
            }));
        }
        else {
            setOrderList(state => [...state, orderProduct]);
        }
        closeForm();
    }

    function closeForm() {
        setEditIndex(-1);
        setOpenForm(false);
        setName('');
        setQuantity(0);
        setUnit('');
    }
    function submitForm2() {
        if (parseInt(batchs[batchIndex].quantity) < quantity) {
            return toastr.warning("Not enough quantity");
        }
        else if (quantity < 1) {
            return toastr.warning("Invalid quantity");
        }

        const orderProduct = {
            index: batchIndex,
            name: batchs[batchIndex].p[0].name,
            unit: batchs[batchIndex].p[0].unit,
            quantity: parseInt(quantity),
        };

        if (editIndex > -1) {
            setOrderList(orderList.map((o, i) => {
                if (i === editIndex)
                    return orderProduct;
                return o;
            }));
        }
        else {
            setOrderList(state => [...state, orderProduct]);
        }
        closeForm();
    }
    async function confirmPO() { //
        try {
            const { name: supName } = suppliers[supplier];
            let porders = [];
            let sorders = [];
            porders = orderList.map(({ id, orderid, name, quantity, unit }) => [id ? id : 0, orderid ? orderid : 0, name, quantity, unit]);
            sorders = [[[[orderList[0].index, orderList[0].name, orderList[0].unit, false, 0, 0]], orderList[0].quantity]];
            //sorders = orderList.map(({ id, orderid, batchid, used, name, quantity, unit}) => [[[[id ? id : 0, name, unit, false, orderid ? orderid : 0, batchid ? batchid : 0]],quantity]]);
            console.log(orderList);
            console.log('so', sorders);
            console.log('po', porders);
            const rd = parseInt(new Date(receiveDate).getTime() / 1000);
            if (role === ROLE.MANAGER) {
                console.log("RUN createPO");
                contract.methods.createPO(supName, customer, porders, rd)
                    .send({ from: '0xb2D9757eE9Dcc527b5dAA25da9F3B3c1bB1FFaE6' })
                    .once('receipt', async r => {
                        console.log(r);
                        toastr.success('Create order success!');
                        const id = await contract.methods.order_count().call();
                        nav('/orders/' + id);
                    });
            }
            else if (role === ROLE.RETAILER) {
                console.log("RUN createSO")
                contract.methods.createSO(accounts[0].name, customer, sorders, rd)
                    .send({ from: '0xb2D9757eE9Dcc527b5dAA25da9F3B3c1bB1FFaE6' })
                    .once('receipt', async r => {
                        console.log(r);
                        toastr.success('Create order success!');
                        const id = await contract.methods.order_count().call();
                        nav('/orders/' + id);
                    });
            }

        }
        catch (e) {
            console.log(e);
        }
    }

    function cancelOrder() {
        nav('/');
    }

    if (role === ROLE.RETAILER) {
        return (
            <div className="page create-po-page">
                <div className="center-wrapper">
                    <h2>Create Sale Order</h2>
                    <div className='order-btn-container'>
                        <button onClick={confirmPO} className='btn submit'>Confirm</button>
                        <button onClick={cancelOrder} className='btn cancel'>Cancel</button>
                    </div>
                    <h3>Infomations:</h3>
                    <p>Supplier: <span>{accounts[0].name}</span></p>
                    <p>Customer: <span>{customer}</span></p>
                    <p>Receive date: <input type='date' onChange={e => setReceiveDate(e.target.value)} /></p>
                    <div className='header-row'>
                        <h3>Order list:</h3>
                        <button className="btn order-btn" onClick={openAddForm}>Add order item</button>
                    </div>
                    <div className="table order-list">
                        <ul className="row header">
                            <li>Product Id</li>
                            <li>Product Name</li>
                            <li>Quantity</li>
                            <li></li>
                        </ul>
                        {
                            orderList.map((order, i) => ( //
                                <ul className='row' key={i}>
                                    <li>{batchs[batchIndex].p[0].id}</li>
                                    <li>{batchs[batchIndex].p[0].name}</li>
                                    <li>{order.quantity}</li>
                                    <li className='btn-container'>
                                        <button className="btn delete" onClick={() => deleteOrderProduct(i)}><span className='icon'><FaTrash /></span>Delete</button>
                                        <button className="btn edit" onClick={() => openEditForm(i, order)}><span className='icon'><FaPencilAlt /></span>Edit</button>
                                    </li>
                                </ul>
                            ))
                        }
                        {orderList.length === 0 && <ul className='row'><li>None</li></ul>}
                    </div>
                    {
                        openForm && (
                            <div className="form">
                                <h3>{editIndex > -1 ? 'Edit' : 'Add'} order product</h3>
                                <label>
                                    Product:
                                    <select onChange={e => setBatchIndex(e.target.value)}>
                                        {
                                            batchs.map((batch) => (
                                            <option value={batch.p[0].name}>
                                                {batch.p[0].name} - Quantity left: {batch.quantity}
                                            </option>
                                            ))
                                        }
                                    </select>
                                </label>
                                <label>
                                    Quantity:
                                    <input
                                        type='number'
                                        placeholder='Quantity'
                                        value={quantity}
                                        onChange={e => setQuantity(e.target.value)}
                                    />
                                </label>
                                <div className="btn-container">
                                    <button className='btn submit' onClick={submitForm2}><span className='icon'><FaCheck /></span>{editIndex > -1 ? 'Edit' : 'Add'}</button>
                                    <button className='btn cancel' onClick={closeForm}><span className='icon'><FaTimes /></span>Cancel</button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }

    return (
        <div className="page create-po-page">
            <div className="center-wrapper">
                <h2>Create Purchase Material order</h2>
                <div className='order-btn-container'>
                    <button onClick={confirmPO} className='btn submit'>Confirm</button>
                    <button onClick={cancelOrder} className='btn cancel'>Cancel</button>
                </div>
                <h3>Infomations:</h3>
                <p>Customer: <span>{customer}</span></p>
                <div className="supplier-chooser">
                    Supplier:
                    <select onChange={e => setSupplier(e.target.value)}>
                        {
                            suppliers.map((supplier, i) => <option key={supplier.address} value={i}>{supplier.name}</option>)
                        }
                    </select>
                </div>
                <p>Receive date: <input type='date' onChange={e => setReceiveDate(e.target.value)} /></p>
                <div className='header-row'>
                    <h3>Order list:</h3>
                    <button className="btn order-btn" onClick={openAddForm}>Add order item</button>
                </div>
                <div className="table order-list">
                    <ul className="row header">
                        <li>Name</li>
                        <li>Quantity</li>
                        <li>Unit</li>
                        <li></li>
                    </ul>
                    {
                        orderList.map((order, i) => (
                            <ul className='row' key={i}>
                                <li className='dpnone'>{order.id}</li>
                                <li className='dpnone'>{order.orderid}</li>
                                <li>{order.name}</li>
                                <li>{order.quantity}</li>
                                <li>{order.unit}</li>
                                <li className='btn-container'>
                                    <button className="btn delete" onClick={() => deleteOrderProduct(i)}><span className='icon'><FaTrash /></span>Delete</button>
                                    <button className="btn edit" onClick={() => openEditForm(i, order)}><span className='icon'><FaPencilAlt /></span>Edit</button>
                                </li>
                            </ul>
                        ))
                    }
                    {orderList.length === 0 && <ul className='row'><li>None</li></ul>}
                </div>
                {
                    openForm && (
                        <div className="form">
                            <h3>{editIndex > -1 ? 'Edit' : 'Add'} order product</h3>
                            <label>
                                Material Name:
                                <input type='text' placeholder='Name' value={name} onChange={e => setName(e.target.value)} />
                            </label>
                            <label>
                                Quantity:
                                <input type='number' placeholder='Quantity' value={quantity} onChange={e => setQuantity(e.target.value)} />
                            </label>
                            <label>
                                Unit:
                                <input type='text' placeholder='Unit' value={unit} onChange={e => setUnit(e.target.value)} />
                            </label>
                            <div className="btn-container">
                                <button className='btn submit' onClick={submitForm}><span className='icon'><FaCheck /></span>{editIndex > -1 ? 'Edit' : 'Add'}</button>
                                <button className='btn cancel' onClick={closeForm}><span className='icon'><FaTimes /></span>Cancel</button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default connect(stateToProps('account'))(CreatePOPage);