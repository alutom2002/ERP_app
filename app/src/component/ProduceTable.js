import { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { contract } from '../helper/web3';
import toastr from 'toastr';
import { ROLE } from '../helper/role';

export default function ProduceTable(props){
    const {role, batchId, address, produceList, status, create_at, finished_at} = props;

    const [openForm, setOpenForm] = useState(false);
    const [produceName, setProduceName] = useState('');

    function submitForm(){
        contract.methods.addProduceInfo(batchId, produceName).send({from: address})
        .once('receipt', r => {
            console.log(r);
            toastr.success('Add produce process success!');
            closeForm();
        });
    }

    function finishProduce(index){
        contract.methods.finishProduce(batchId, index).send({from: address})
        .once('receipt', r => {
            console.log(r);
            toastr.success('Finish produce process success!');
            closeForm();
        });
    }

    function closeForm(){
        setOpenForm(false);
        setProduceName('');
    }
    console.log("Produce: ", produceList);
    const canAction = status === 'PRODUCE' && role === ROLE.PRODUCER;

    return(
        <>
            <div className='header-row'>
                <h3>Produce Process List</h3>
                {canAction && <button className='btn' onClick={()=>setOpenForm(true)}>Add Produce Process</button>}
            </div>
            <div className="table order-list">
                <ul className="row header">
                    <li>Process Name</li>
                    <li>Started At</li>
                    <li>Finished At</li>
                    {canAction && <li></li>}
                </ul>
                {
                    produceList.map((produce, i) => (
                        <ul className='row' key={i}>
                            <li>{produce.name}</li>
                            <li>{new Date(parseInt(create_at)*1000).toLocaleDateString()}</li>
                            <li>{finished_at !== '0' ? new Date(parseInt(finished_at)*1000).toLocaleDateString() : ''}</li>
                            {
                                canAction && (
                                    <li className='btn-container'>
                                        {finished_at === '0' &&  <button className="btn submit" onClick={()=>finishProduce(i)}><span className='icon'><FaCheck/></span>Done</button>}
                                    </li>
                                )
                            }
                        </ul>
                    ))
                }
                {produceList.length === 0 && <ul className='row'><li>None</li></ul>}
                {openForm && (
                    <div className='form'>
                        <h3>Add Produce Process</h3>
                        <input placeholder='Produce process name' onChange={e => setProduceName(e.target.value)}/>
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