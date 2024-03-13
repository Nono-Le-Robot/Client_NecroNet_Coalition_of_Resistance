import { useEffect } from "react";
import { io } from "socket.io-client"
import { useAtom, atom } from 'jotai'

// export const socket = io('http://146.59.197.172:3000')
export const socket = io('http://localhost:3000')


export const charactersAtom = atom([]);

export const SocketManager = () => {
    const [_characters, setCharacters] = useAtom(charactersAtom)
    useEffect(() => {
        function onConnect() {
            console.log('user connected');
        }

        function onDisconnect() {
            console.log("user disconnected");
        }

        function onHello() {
            console.log('hello')
        }

        function onCharacters(value) {
            console.log("characters", value);
            setCharacters(value)
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('hello', onHello);
        socket.on("characters", onCharacters)

        return () => {
            socket.off("connect", onConnect)
            socket.off("disconnect", onDisconnect)
            socket.off("hello", onHello)
            socket.off("characters", onCharacters)
        }
    }, [])

}

// const customSocketConfig: SocketIoConfig = {
//   url: 'https://www.lesiteduscudo.com',
//   options: {
//     path: `/chat_private/backend`,
//     extraHeaders: {
//       Authorization: `Bearer ${jwtToken}`
//     }
//   }
// };