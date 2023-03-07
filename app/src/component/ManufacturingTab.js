
import { FaPlus, FaInfoCircle } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { stateToProps } from '../helper/stateToProps';
import { batch, connect } from 'react-redux';
import { contract, web3Socket } from '../helper/web3';
import { useNavigate } from 'react-router-dom';
import { BATCH_STATUS } from '../helper/status';
import { ROLE } from '../helper/role';
import { CONTRACT_ADDRESS } from '../config/contract.config';

function ManufacturingTab(props) {
    const nav = useNavigate();
    const { role, address } = props.account;
    const [list, setList] = useState([]);
    const [curr, setCurr] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    useEffect(() => {
        const event_hash = web3Socket.utils.sha3('reload()');
        web3Socket.eth.subscribe('logs', { address: CONTRACT_ADDRESS, topics: [event_hash] }, (error, event) => { })
            .on('data', function (event) {
                getProductBatchList();
            })
            .on('error', function (error, receipt) {
                console.log('Error:', error, receipt);
            });
    }, []);

    useEffect(() => {
        getProductBatchList();
    }, [props.account.address]);

    async function getProductBatchList() {
        try {
            /* const isByStatus = role === ROLE.MANAGER ? false : true;
            const byStatus = role === ROLE.PRODUCER ? 2 : 4;
            const data = await contract.methods.getPBList(byStatus, isByStatus).call();
            setList(data.filter(d => d.id !== '0')); */
            const data = await contract.methods.getPB(1).call();
            setList(data[0]);
        }
        catch (e) {
            console.log(e);
        }
    }
    console.log("List: ", list);
    console.log("List length: ", list.length);

    if (list.length !== 0 && start === "") {
        modifi(list);
    }

    function modifi(params) {
        console.log("Run modifi");
        let len = params.timeline.length;
        setCurr(BATCH_STATUS[params.timeline[len - 1].status]);
        setStart(new Date(parseInt(params.create_at) * 1000).toLocaleDateString());
        setEnd(params.finished_at !== '0' ? new Date(parseInt(params.finished_at) * 1000).toLocaleDateString() : '');
    }

    console.log(start, end, curr);
    return (
        <div className="tab">
            <div className="center-wrapper">
                <div className="header-container">
                    <h2 className="tab-header">Manufacturing List</h2>
                    {role === ROLE.MANAGER && <button className="btn" onClick={() => nav('/create-production-batch')}><span className="icon"><FaPlus /></span>Create Production Batch</button>}
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
                    {list.length !== 0 &&
                        <ul className="row">
                            <li>{list.id}</li>
                            <li>{list.info.p[0].name}</li>
                            <li>{list.info.quantity}</li>
                            <li>{start}</li>
                            <li>{end}</li>
                            <li>{curr}</li>
                            <li><button className="btn" onClick={() => nav('/batchs/' + list.id)}><span className="icon"><FaInfoCircle /></span>Details</button></li>
                        </ul>
                    }
                    {list.length === 0 && <ul className='row'><li>None</li></ul>}
                </div>
            </div>
        </div>
    );
}

export default connect(stateToProps('account'))(ManufacturingTab);