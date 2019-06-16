import socketIOClient from 'socket.io-client';
import { ipAddress, port } from '../constants';

const socket = socketIOClient(`http://${ipAddress}:${port}`)

export default socket