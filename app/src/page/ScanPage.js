import '../style/ScanPage.css';

import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { contract, web3Socket } from '../helper/web3';
import toastr from 'toastr';
import { BATCH_STATUS, ORDER_STATUS } from '../helper/status';
import { stateToProps } from '../helper/stateToProps';
import Timeline from '../component/Timeline';
import { CONTRACT_ADDRESS } from '../config/contract.config';
import CryptoJS from "crypto-js";

function ScanPage(props) {
    const [order, setOrder] = useState();
    const [batch, setBatch] = useState();
    const [index, setIndex] = useState();
    const [data, setData] = useState([]);
    const [id, setId] = useState(0);
    const [text, setText] = useState();
    const [visable, Setvisable] = useState(false);
    const [used, setUsed] = useState(false);

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
            console.log("index ", index);
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

    const secretPass = "XkhZG4fW2t2W";

    function decryptData(id) {
        const bytes = CryptoJS.AES.decrypt(id, secretPass);
        const data = bytes.toString(CryptoJS.enc.Utf8);
        if (data === "") {
            toastr.warning('Invalid input code')
            return 0;
        }
        else return JSON.parse(data);
    };
    console.log(used);
    function submitSearch() {
        setId(decryptData(text));
        if (id !== 0) {
            for (let i = 0; i < data.length; i++) {
                if (id === data[i].product_list[0].p[0].id) {
                    setIndex(i);
                    Setvisable(true);
                    toastr.success('Found a product, please wait for product information to load');
                    getOrderData();
                    return;
                }
            }
            toastr.warning('Product not found')
        }
    }

    async function usedProudct() {
        try {
            const used = await contract.methods.useProduct(index)
                .send({ from: "0xb2D9757eE9Dcc527b5dAA25da9F3B3c1bB1FFaE6" })
                .once('receipt', r => {
                    setUsed(true);
                    toastr.success('Change product status success');
                    console.log(r);
                });;
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="mainContainer">
            <div className="dataContainer">
                <h1 className="astro-UL4SEYQL">Search Product <span className="text-gradient astro-UL4SEYQL">Information</span></h1>
                <div className="container svelte-1eadklx">
                    <div className="svelte-1eadklx w-100">
                        <label htmlFor="search">Code:</label>
                        <input type="text" placeholder="Nhập mã trên qr tại đây" id="search" name="text" className="svelte-1eadklx" value={text} onChange={e => setText(e.target.value)} />
                        <button type="submit" className="svelte-1eadklx" onClick={submitSearch}><span className="svelte-1eadklx">Search</span></button>
                    </div>

                    {data && visable && order && batch && (
                        <div className="container svelte-1eadklx">
                            <div className="svelte-1eadklx">Product Name: {data[0].product_list[0][0][0].name}</div>
                            <div className="svelte-1eadklx">Product Status: {used ? 'Used' : 'Not used'}</div>
                            <div className="svelte-1eadklx">Made from material: {order.mtl_list.map(a => a.name + ',')}</div>
                            <div className="svelte-1eadklx">Import material from: {order.supplier}</div>
                            <div className="svelte-1eadklx">Produce by: Producer</div>
                            <div className="svelte-1eadklx">Sale by: {data[0].customer}</div>
                            <div className="svelte-1eadklx">Timeline Materail:</div>
                            <Timeline timeline={order.timeline} isSO={0} status_names={ORDER_STATUS} />
                            <div className="svelte-1eadklx">Timeline Produce:</div>
                            <Timeline timeline={batch[0].timeline} isSO={2} status_names={BATCH_STATUS} />
                            {used ? '' : <button type="submit" className="svelte-1eadklx" onClick={usedProudct}><span className="svelte-1eadklx">Confirm used</span></button>}
                        </div>
                    )}
                </div>

            </div>
            {/* <Timeline timeline={order.timeline} status_names={ORDER_STATUS} /> */}
        </div>
    )
}

export default connect(stateToProps('account'))(ScanPage);