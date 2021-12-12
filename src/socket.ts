import io from 'socket.io-client'

const socket = io()

// if ( !socket.connected ) socket.disconnect()

export default socket