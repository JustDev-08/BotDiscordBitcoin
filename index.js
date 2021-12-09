const { token, chanel } = require('./setting.json');
const { Client, Intents } = require('discord.js');
const axios = require('axios')
// Create object Cilnet
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

// Bot Ready To Connect
client.once('ready', () => {
    console.log('Ready For Bot');

});

let delay = false

client.on('message', async (message) => {
    if (message.channelId == chanel.bitcoinRoom && !delay) {
        console.log('this is bitcoin Room');
        delay = true
        if (message.content.split(' ')[0] == "!bitcoin") {
            message.reply("Wait......")
            const data = await axios.get('https://api.bitkub.com/api/market/ticker')
            const coin = await data.data
            const userSelect = message.content.split(' ')
            console.log('User Want ', userSelect[1])
            if (userSelect != undefined && coin[userSelect[1]] != undefined) {
                let mes = 'Name : ' + userSelect[1] + '\n'
                for (i in coin[userSelect[1]]) {
                    mes += `${i} : ${coin[userSelect[1]][i]}\n`
                }
                message.reply(mes)

            }
            else {
                message.reply('I not have')
            }




        }
        else if (message.content == '!help') {
            message.reply(`!bitcoin <bitcoinName>  \n check Name With !name`)


        }
        else if (message.content == '!name') {
            const data = await axios.get('https://api.bitkub.com/api/market/ticker')
            const coin = await data.data
            const name_all = []
            for (i in coin) {
                name_all.push(i)
                console.log(i)
            }
            message.reply(`I Have \n\n ${name_all.map(e => e + '   ')}`)
        }
        delay = false

    }
})




//login To Bot from Token

client.login(token);

