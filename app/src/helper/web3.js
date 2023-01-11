import Web3 from 'web3';
import {
    CONTRACT_ABI,
    CONTRACT_ADDRESS
} from '../config/contract.config';

export const web3 = new Web3(Web3.givenProvider);
export const web3Socket = new Web3 ("wss://cool-hidden-cloud.bsc-testnet.discover.quiknode.pro/b4b3411cb011acde11268bf7ca2dc04a4324ea63/");
export const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);