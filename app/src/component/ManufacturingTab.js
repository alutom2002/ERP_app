
import { FaPlus, FaInfoCircle } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { stateToProps } from '../helper/stateToProps';
import { connect } from 'react-redux';
import { contract, web3Socket } from '../helper/web3';
import { useNavigate } from 'react-router-dom';
import { BATCH_STATUS } from '../helper/status';
import { ROLE } from '../helper/role';
import { CONTRACT_ADDRESS } from '../config/contract.config';

function ManufacturingTab(props){
    const nav = useNavigate();
    const {role, address} = props.account;
    const [list, setList] = useState([]);

    useEffect(()=>{
        console.log(1);
        const event_hash = web3Socket.utils.sha3('reload()');
        web3Socket.eth.subscribe('logs',{ address: CONTRACT_ADDRESS, topics: [event_hash]}, (error, event) => {})
        .on('data', function(event){
            getProductBatchList();
        })
        .on('error', function(error, receipt) { 
            console.log('Error:', error, receipt);
        });
    }, []);

    useEffect(()=>{
        getProductBatchList();
    }, [props.account.address]);

    async function getProductBatchList(){
        try{
            if(address){
                if(role === ROLE.INSPECTOR){
                    const data1 = await contract.methods.getProductBatchList(1, true).call();
                    const data2 = await contract.methods.getProductBatchList(3, true).call();
                    
                    const d1 = data1.filter(d => d.id !== '0');
                    const d2 = data2.filter(d => d.id !== '0');
                    setList([...d1, ...d2]);
                    return;
                }
                
                const isByStatus = role === ROLE.MANAGER ? false : true;
                const byStatus = role === ROLE.PRODUCER ? 2 : 4;
                const data = await contract.methods.getProductBatchList(byStatus, isByStatus).call();
                setList(data.filter(d => d.id !== '0'));
            }
        }
        catch(e){
            console.log(e);
        }
    }

    return(
        <div className="tab">
            <div className="center-wrapper">
                <div className="header-container">
                    <h2 className="tab-header">Manufacturing List</h2>
                    {role === ROLE.MANAGER && <button className="btn" onClick={()=>nav('/create-production-batch')}><span className="icon"><FaPlus/></span>Create Production Batch</button>}
                </div>
                <div className="table">
                    <ul className="row header">
                        <li>ID</li>
                        <li>Product</li>
                        <li>Quantity</li>
                        <li>Start Date</li>
                        <li>End Date</li>
                        <li>Last Status</li>
                        <li></li>
                    </ul>
                    {
                        list.map(batch => {
                            const len = batch.timeline.length;
                            const currentStatus = BATCH_STATUS[batch.timeline[len - 1].status];

                            const startDate = new Date(parseInt(batch.create_at)*1000).toLocaleDateString();
                            const endDate = batch.finished_at !== '0' ? new Date(parseInt(batch.finished_at)*1000).toLocaleDateString() : '';

                            return (
                                <ul key={batch.id} className="row">
                                    <li>{batch.id}</li>
                                    <li>{batch.product_info.name}</li>
                                    <li>{batch.product_info.quantity}</li>
                                    <li>{startDate}</li>
                                    <li>{endDate}</li>
                                    <li>{currentStatus}</li>
                                    <li><button className="btn" onClick={()=>nav('/batchs/' + batch.id)}><span className="icon"><FaInfoCircle/></span>Details</button></li>
                                </ul>
                            );
                        })
                    }
                    {list.length === 0 && <ul className='row'><li>None</li></ul>}
                </div>
            </div>
        </div>
    );
}

export default connect(stateToProps('account'))(ManufacturingTab);