import { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { contract } from '../helper/web3';
import toastr from 'toastr';
import { ROLE } from '../helper/role';

export default function QualityTable(props) {
    const { data } = props;

    console.log("Table: ", data);
    //console.log("data 1: ", data[1][0].product_list[0][0][0].used)
    console.log("data 1 product list ", data[1])
    return (
        <>
            <div className='header-row'>
                <h3>Used Check List:</h3>
            </div>
            <div className="table order-list">
                <ul className="row header">
                    <li>Id</li>
                    <li>Name</li>
                    <li>Used</li>
                </ul>
                 {
                    data[1][0].product_list[0][0].map(da =>
                        <ul className='row'>
                            <li>{da.id}</li>
                            <li>{da.name}</li>
                            <li>{da.used ? "Đã sử dụng" : "Chưa sử dụng"}</li>
                        </ul>
                    )
                }
            </div>
        </>
    )
}