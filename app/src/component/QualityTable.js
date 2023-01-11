import { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { contract } from '../helper/web3';
import toastr from 'toastr';
import { ROLE } from '../helper/role';

export default function QualityTable(props){
    const {role, batchId, address, checkList, status} = props;

    const [openForm, setOpenForm] = useState(false);
    const [checkName, setCheckName] = useState('');
    const [checkResult, setCheckResult] = useState('');

    function submitForm(){
        contract.methods.addProductCheck(batchId, checkName, checkResult).send({from: address})
        .once('receipt', r => {
            console.log(r);
            toastr.success('Add quality check success!');
            closeForm();
        });
    }

    function closeForm(){
        setOpenForm(false);
        setCheckName('');
        setCheckResult('');
    }

    return(
        <>
            <div className='header-row'>
                <h3>Quality Check List:</h3>
                {(status === 'CHECK_QUAL' && role === ROLE.INSPECTOR) && <button className='btn' onClick={()=>setOpenForm(true)}>Add Quality Check</button>}
            </div>
            <div className="table order-list">
                <ul className="row header">
                    <li>Check Name</li>
                    <li>Result</li>
                    <li>Check Time</li>
                </ul>
                {
                    checkList.map((check, i) => (
                        <ul className='row' key={i}>
                            <li>{check.name}</li>
                            <li>{check.result}</li>
                            <li>{new Date(parseInt(check.timestamp)*1000).toLocaleDateString()}</li>
                        </ul>
                    ))
                }
                {checkList.length === 0 && <ul className='row'><li>None</li></ul>}
                {openForm && (
                    <div className='form'>
                        <h3>Add Quality Check</h3>
                        <input placeholder='Check name' onChange={e => setCheckName(e.target.value)}/>
                        <input placeholder='Check result' onChange={e => setCheckResult(e.target.value)}/>
                        <div className="btn-container">
                            <button className='btn submit' onClick={submitForm}><span className='icon'><FaCheck/></span>Submit</button>
                            <button className='btn cancel' onClick={closeForm}><span className='icon'><FaTimes/></span>Cancel</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}