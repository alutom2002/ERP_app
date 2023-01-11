import { FaQrcode, FaTimes } from 'react-icons/fa';
import { GiQr } from 'react-icons/gi';
import Modal from 'react-modal';
import ReactQr from 'react-qr-code';
import { useState } from 'react';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '30px 30px 20px 30px',
      overflow: 'visible'
    },
};

const closeBtnStyle = {
    position: 'absolute',
    top: '0px',
    right: '-5px',
    backgroundColor: 'transparent',
    color: '#000',
    fontSize: '1.4em'
}

const openBtnStyle = {
    backgroundColor: 'transparent',
    fontSize: '1.8em',
    color: '#555',
    border: '2px solid #555',
    padding: '7px 7px 0px 7px',
}

export default function QR(props){
    const [openModal, setOpenModal] = useState();
    const {value} = props;

    return(
        <>
            <button style={openBtnStyle} className='btn qr-btn' onClick={()=>setOpenModal(true)}><span className='icon'><FaQrcode/></span></button>
            <Modal isOpen={openModal} style={customStyles}>
                <button style={closeBtnStyle} className='btn' onClick={()=>setOpenModal(false)}><span className='icon'><FaTimes/></span></button>
                <ReactQr value={'http://localhost:3000/qr' + value}/>
            </Modal>
        </>
    )
}