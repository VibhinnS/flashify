// const exportMsg = require('../utils/exportMsg.js');
const { useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const makeWASocket = require('@whiskeysockets/baileys').default;
let msgValue = null;
async function connectionLogic() {
    const { state, saveCreds } = await useMultiFileAuthState("auth_info_baileys")
    const sock = makeWASocket({
        printQRInTerminal: true,
        auth: state
    })

    sock.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect, qr }= update || {};

        if (qr) {
            console.log(qr)
        }

        if (connection === 'close') {
            const shouldReconnect = 
            lastDisconnect?.error?.output?.statusCode !==
            DisconnectReason.loggedOut

        if (shouldReconnect) {
            connectionLogic()
        }
    }
    })
    sock.ev.on('messages.update', (messageInfo) => {
        console.log(messageInfo)
        // console.log(messageInfo.messages[0].message.conversation)
    })

    sock.ev.on("messages.upsert", (messageInfoUpsert) => {
        console.log(messageInfoUpsert)
        //listening to the message here
        console.log(messageInfoUpsert.messages[0].message.conversation)
        msgValue = messageInfoUpsert.messages[0].message.conversation
        console.log(msgValue)
    })
    sock.ev.on("creds.update", saveCreds)

}

connectionLogic();
module.exports = msgValue
