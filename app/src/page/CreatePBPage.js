import '../style/CreatePBPage.scss';

import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { stateToProps } from "../helper/stateToProps";
import { FaTrash, FaPencilAlt, FaCheck, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { contract } from '../helper/web3';
import toastr from 'toastr';

function CreatePBPage(props){
    const nav = useNavigate();

    const {address} = props.account;

    const [materials, setMaterials] = useState([]);
    const [productMatList, setProductMatList] = useState([]);

    const [productName, setProductName] = useState('Kem chong nang 1');
    const [productQuantity, setProductQuantity] = useState(10);
    const [productUnit, setProductUnit] = useState('cai');

    
    const [editIndex, setEditIndex] = useState(-1);
    const [openForm, setOpenForm] = useState(false);
    const [matIndex, setMatIndex] = useState(0);
    const [quantity, setQuantity] = useState(10);
    const [startDate, setStartDate] = useState(0);
    const [endDate, setEndDate] = useState(0);

    useEffect(()=>{
        getMaterials();
    }, []);

    async function getMaterials(){
        const data = await contract.methods.getMaterialList().call();
        setMaterials(data[0]);
    }

    function openAddForm(){
        setOpenForm(true);
    }

    function openEditForm(i, {index, quantity}){
        setMatIndex(index);
        setQuantity(quantity);
        setEditIndex(i);
        setOpenForm(true);
    }

    function deleteMaterial(index){
        setProductMatList(state => state.filter((o, i) => i !== index));
    }

    function submitForm(){
        const mat = materials[matIndex];
        if(quantity > parseInt(mat.mat_info.quantity)){
            return toastr.warning("Not enough quantity");
        }
        else if(quantity < 1){
            return toastr.warning("Invalid quantity");
        }
        const material = {
            id: mat.id,
            index: matIndex,
            name: mat.mat_info.name,
            unit: mat.mat_info.unit,
            quantity: quantity,
        };

        if(editIndex > -1){
            setProductMatList(productMatList.map((o, i) => {
                if(i === editIndex)
                    return material;
                return o;
            }));
        }
        else{
            setProductMatList(state => [...state, material]);
        }

        closeForm();
    }

    function closeForm(){
        setEditIndex(-1);
        setOpenForm(false);
        setMatIndex(0);
        setQuantity(0);
    }

    async function createOrder(){
        try{
            const productInfo = [productName, productQuantity, productUnit];
            const matList = productMatList.map(pm => [pm.id, pm.quantity, '', 0]);

            const sd = parseInt(new Date(startDate).getTime()/1000);
            const ed = parseInt(new Date(endDate).getTime()/1000);

            contract.methods.createProductBatch(productInfo, matList, sd, ed).send({from: address})
            .once('receipt', async r => {
                console.log(r);
                toastr.success('Create order success!');

                const id = await contract.methods.batch_count().call();
                nav('/batchs/' + id);
            });
        }
        catch(e){
            console.log(e);
        }
    }

    function cancelOrder(){
        nav('/');
    }

    return(
        <div className="page create-po-page create-pb-page">
            <div className="center-wrapper">
                <h2>Create Production Batch</h2>
                <div className='order-btn-container'>
                    <button onClick={createOrder} className='btn submit'>Confirm Creation</button>
                    <button onClick={cancelOrder} className='btn cancel'>Cancel Creation</button>
                </div>
                <h3>Infomations:</h3>
                <p>Product name: <input placeholder='product name' onChange={e => setProductName(e.target.value)}/></p>
                <p>Quantity: <input placeholder='quantity' onChange={e => setProductQuantity(e.target.value)}/></p>
                <p>Unit: <input placeholder='unit' onChange={e => setProductUnit(e.target.value)}/></p>
                <p>Start date: <input type='date' onChange={e => setStartDate(e.target.value)}/></p>
                <p>End date: <input type='date' onChange={e => setEndDate(e.target.value)}/></p>
                <button className="btn order-btn" onClick={openAddForm}>Add Material</button>
                <h3>Material List:</h3>
                <div className="table order-list">
                    <ul className="row header">
                        <li>Material ID</li>
                        <li>Material Name</li>
                        <li>Quantity</li>
                        <li>Unit</li>
                        <li></li>
                    </ul>
                    {
                        productMatList.map((mat, i) => (
                            <ul className='row' key={i}>
                                <li>{mat.id}</li>
                                <li>{mat.name}</li>
                                <li>{mat.quantity}</li>
                                <li>{mat.unit}</li>
                                <li className='btn-container'>
                                    <button className="btn delete" onClick={()=>deleteMaterial(i)}><span className='icon'><FaTrash/></span>Delete</button>
                                    <button className="btn edit" onClick={()=>openEditForm(i, mat)}><span className='icon'><FaPencilAlt/></span>Edit</button>
                                </li>
                            </ul>
                        ))
                    }
                    {productMatList.length === 0 && <ul className='row'><li>None</li></ul>}
                </div>
                {
                    openForm && (
                        <div className="form">
                            <h3>Add materials</h3>
                            <label>
                                Material:
                                <select onChange={e => setMatIndex(e.target.value)}>
                                    {
                                        materials.map((mat, i) => <option key={mat.id} value={i}>{mat.mat_info.name} - Quantity left: {mat.mat_info.quantity}</option>)
                                    }
                                </select>
                            </label>
                            <label>
                                Quantity:
                                <input type='number' placeholder='Quantity' value={quantity} onChange={e => setQuantity(e.target.value)}/>
                            </label>
                            <div className="btn-container">
                                <button className='btn submit' onClick={submitForm}><span className='icon'><FaCheck/></span>{editIndex > -1 ? 'Edit' : 'Add'}</button>
                                <button className='btn cancel' onClick={closeForm}><span className='icon'><FaTimes/></span>Cancel</button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default connect(stateToProps('account'))(CreatePBPage);