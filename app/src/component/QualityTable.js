import { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { contract } from '../helper/web3';
import toastr from 'toastr';
import { ROLE } from '../helper/role';
import CryptoJS from "crypto-js";
import QR from '../component/QR';

export default function QualityTable(props) {
    const { data } = props;
    const secretPass = "XkhZG4fW2t2W";

    function encryptData(id) {
        console.log("Run");
        const text = CryptoJS.AES.encrypt(JSON.stringify(id),secretPass).toString();
        return text;
    };

    console.log("Table: ", data);
    //console.log("data 1: ", data[1][0].product_list[0][0][0].used)
    return (
        <>
            <div className='header-row'>
                <h3>Used Check List:</h3>
            </div>
            <div className="table order-list">
                <ul className="row header">
                    <li>Name</li>
                    <li>Used</li>
                    <li>QR</li>
                </ul>
                {data &&
                    data[0].product_list[0].p.map(item => 
                        /* const text = CryptoJS.AES.encrypt(JSON.stringify(item.id), secretPass).toString();
                        setEncrptedData(text); */
                        <ul ul className='row'>
                            <li>{item.name}</li>
                            <li>{item.used ? "Đã sử dụng" : "Chưa sử dụng"}</li>
                            <li><QR value={encryptData(item.id)} isId={true} /></li>
                        </ul>
                    )
                }
            </div>
        </>
    )
}