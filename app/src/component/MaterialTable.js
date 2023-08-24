import { useState } from 'react';
import { contract } from '../helper/web3';
import toastr from 'toastr';

export default function MaterialTable(props){
    const {batchId, address, matList, materials, status} = props;

    // const [openForm, setOpenForm] = useState(false);
    // const [selectIndex, setSelectIndex] = useState(0);
    // const [checkResult, setCheckResult] = useState('');

    // function addCheck(index){
    //     setSelectIndex(index);
    //     setOpenForm(true);
    // }

    // function submitForm(){
    //     contract.methods.addProductMaterialCheck(batchId, selectIndex, checkResult).send({from: address})
    //     .once('receipt', r => {
    //         console.log(r);
    //         toastr.success('Add check result success!');
    //         closeForm();
    //     });
    // }

    // function closeForm(){
    //     setOpenForm(false);
    //     setCheckResult('');
    // }

    // const canAddCheckResult = status === 'PREPARE_MAT';
 
    return(
        <>
            <h3>Material List:</h3>
            <div className="table order-list">
                <ul className="row header">
                    <li>Material ID</li>
                    <li>Material Name</li>
                    <li>Quantity</li>
                    <li>Unit</li>
                    {/* <li>Check result</li>
                    <li>Check time</li> 
                    {status === 'DONE' && <li>QR</li>}
                    */}
                </ul>
                {
                    matList.map((mat, i) => (
                        <ul className='row' key={i}>
                            <li>{mat.mat_id}</li>
                            <li>{materials[i].name}</li>
                            <li>{mat.quantity}</li>
                            <li>{materials[i].unit}</li>
                            {/* <li>{mat.check_result}</li>
                            <li>{mat.check_timestamp !== '0' ? new Date(parseInt(mat.check_timestamp)*1000).toLocaleDateString() : ''}</li>
                            {
                                canAddCheckResult && (
                                    <li className='btn-container'>
                                        {mat.check_result === '' &&  <button className="btn submit" onClick={()=>addCheck(i)}><span className='icon'><FaPencilAlt/></span>Add Material Check</button>}
                                    </li>
                                )
                            } 
                            {status === 'DONE' && <QR value={'/o/' + materials[i].order_id}/>}
                            */}
                        </ul>
                    ))
                }
                {matList.length === 0 && <ul className='row'><li>None</li></ul>}
                {/* {openForm && (
                    <div className='form'>
                        <h3>Add Material Check</h3>
                        <input placeholder='Check result' onChange={e => setCheckResult(e.target.value)}/>
                        <div className="btn-container">
                            <button className='btn submit' onClick={submitForm}><span className='icon'><FaCheck/></span>Submit</button>
                            <button className='btn cancel' onClick={closeForm}><span className='icon'><FaTimes/></span>Cancel</button>
                        </div>
                    </div>
                )} */}
            </div>
        </>
    )
}