import {stringToArr} from "./data";

const DuplicatePlayerEventId = 1;
const RoomCreatedEvent = 2;
const FailJoinRoomId = 3;
const PlayerJoinedEventId =4;
const MaxPlayersReached =5;
const MatchAlreadyStarted =6;
const GameState = 7;

function connect(url) {
    return new Promise((resolve, reject) => {
        const conn = new WebSocket('ws://127.0.0.1:8080/ws');
        conn.binaryType = "arraybuffer";

        conn.onopen = ev => {
            resolve(newClient(conn));
        }
    });
}

function newClient(conn) {
    const client = {};

    client.joinLobby = username => {
        conn.send(new Uint8Array([0, 0, Math.min(255, username.length), ...stringToArr(username)]));
        conn.send(new Uint8Array([1, 0, 1, 0, 0]));
    }
    return client;
/*
    client.conn.onmessage = e =>{
        const buf = new Uint8Array(e.data);
        const ls = client.listeners[buf[0].valueOf()] || [];
        ls.forEach(l=>l());
    }
*/
}

export default connect;