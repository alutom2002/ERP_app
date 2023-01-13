import '../style/ScanPage.css';

import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { contract, web3Socket } from '../helper/web3';
import toastr from 'toastr';
import { BATCH_STATUS, ORDER_STATUS } from '../helper/status';
import { stateToProps } from '../helper/stateToProps';
import Timeline from '../component/Timeline';
import QR from '../component/QR';
import { CONTRACT_ADDRESS } from '../config/contract.config';

function ScanPage(props) {
    const [order, setOrder] = useState();
    const [batch, setBatch] = useState();
    const [index, setIndex] = useState();
    const [data, setData] = useState([]);
    const [id, setId] = useState();
    const [visable, Setvisable] = useState(false);

    useEffect(() => {
        getProductCus();
    }, []);

    useEffect(() => {
        const event_hash = web3Socket.utils.sha3('reload()');
        web3Socket.eth.subscribe('logs', { address: CONTRACT_ADDRESS, topics: [event_hash] }, (error, event) => { })
            .on('data', function (event) {
                getProductCus();
                if (data.length !== 0) {
                    console.log("run");
                    getOrderData();
                }
            })
            .on('error', function (error, receipt) {
                console.log('Error:', error, receipt);
            });
    }, [order]);

    async function getOrderData() {
        try {
            const orders = await contract.methods.getOrderById(data[index].product_list[0].p[0].orderid).call();
            const batchs = await contract.methods.getPB(data[index].product_list[0].p[0].batchid).call();
            setOrder(orders);
            setBatch(batchs);
        }
        catch (e) {
            console.log(e);
        }
    }

    async function getProductCus() {
        try {
            const products = await contract.methods.getProducts().call();
            console.log(products);
            setData(products[1]);
            /* console.log(data[0].product_list[0][0][0].orderid) */
        }
        catch (e) {
            console.log(e);
        }
    }
    
    console.log(data);
    console.log("Order: ", order);
    console.log("Batch: ", batch);

    function submitSearch(){
        for(let i = 0; i < data.length; i++) {
            if(id === data[i].product_list[0].p[0].id){
                console.log(i);
                setIndex(i);
                Setvisable(true);
                toastr.success('Tìm thấy sản phẩm vui lòng đợi load thông tin sản phẩm');
                getOrderData();
                /* data[i].product_list[0].p[0].used ? '' :  */
            }
        }
        toastr.warning('Không tìm thấy sản phẩm')
    }

    return (
        <div className="mainContainer">
            <div className="dataContainer">
                <h1 className="astro-UL4SEYQL">Tra cứu thông tin <span className="text-gradient astro-UL4SEYQL">sản phẩm</span></h1>
                <div className="container svelte-1eadklx">
                    <div className="svelte-1eadklx w-100">
                        <label htmlFor="search">Mã:</label>
                        <input type="text" placeholder="Nhập mã trên qr tại đây" id="search" name="id" className="svelte-1eadklx" value={id} onChange={ e => setId(e.target.value)}/>
                        <button type="submit" className="svelte-1eadklx" onClick={submitSearch}><span className="svelte-1eadklx">Tìm</span></button>
                    </div>

                    {data && visable && order && batch && (
                        <div className="container svelte-1eadklx">
                            <div className="svelte-1eadklx">Tên sản phẩm: {data[0].product_list[0][0][0].name}</div>
                            <div className="svelte-1eadklx">Tình trạng sản phẩm: {data[0].product_list[0][0][0].used ? 'Đã sử dụng' : 'Chưa sử dụng'}</div>
                            <div className="svelte-1eadklx">Sản xuất từ vật liệu: {order.mtl_list.map(a => a.name + ',')}</div>
                            <div className="svelte-1eadklx">Nhập vật liệu từ nguồn: {order.supplier}</div>
                            <div className="svelte-1eadklx">Sản xuất vào: {new Date(parseInt(batch[0].create_at)*1000).toLocaleDateString()}</div>
                            <div className="svelte-1eadklx">Sản xuất hoàn thành: {new Date(parseInt(batch[0].finished_at)*1000).toLocaleDateString()}</div>
                            <div className="svelte-1eadklx">Sản xuất bởi: Producer</div>
                            <div className="svelte-1eadklx">Được bán bởi: {data[0].customer}</div>
                            <div className="svelte-1eadklx">Thời gian nhập vật liệu:</div>
                            <Timeline timeline={order.timeline} status_names={ORDER_STATUS} />
                            <div className="svelte-1eadklx">Thời gian sản xuất:</div>
                            <Timeline timeline={batch[0].timeline} status_names={BATCH_STATUS} />
                        </div>
                    )}
                </div>

            </div>
            {/* <Timeline timeline={order.timeline} status_names={ORDER_STATUS} /> */}
        </div>
    )
}

export default connect(stateToProps('account'))(ScanPage);