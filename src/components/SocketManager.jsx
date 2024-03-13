import { useEffect } from "react";
import { io } from "socket.io-client"
import { useAtom, atom } from 'jotai'

export const socket = io('http://146.59.197.172:3000')
// export const socket = io('http://localhost:3000')


export const charactersAtom = atom([]);
export const mapAtom = atom(null);
export const userAtom = atom(null);



export const SocketManager = () => {

    const [_characters, setCharacters] = useAtom(charactersAtom)
    const [_map, setMap] = useAtom(mapAtom)
    const [_user, setUser] = useAtom(userAtom)

    useEffect(() => {
        function onConnect() {
        }

        function onDisconnect() {
        }

        function onHello(value) {
            setMap(value.map)
            setUser(value.id)
            setCharacters(value)
            console.log(value)
        }

        function onCharacters(value) {
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