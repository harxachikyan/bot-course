const TelegramApi = require('node-telegram-bot-api')
const token = '7513087021:AAH3UJyRzxWHyB6wUVL8HTo9N8fllArbc4A';

const {gameOptions,againOptions} = require('./options.js')
const  bot = new TelegramApi(token,{polling:true})

const chats ={};

bot.setMyCommands([
    {command:'/start', description: 'Welcoming'},
    {command:'/info', description: 'Information '},
    {command:'/game', description: 'Guesse the number'},

])

const startGame = async (chatId)=>{
    await bot.sendMessage(chatId,'Hima es tiv em pahum 0 ic 9, du petka gushakes')
    const randomNumber = Math.floor(Math.random()*10);
    chats[chatId]=randomNumber;
    await bot.sendMessage(chatId,'Gushaki',gameOptions)

}


const start = ()=>{
    bot.on('message',  async msg => {

        const text = msg.text;
        const chatId=msg.chat.id;


        if (text === '/start'){
            await  bot.sendSticker(chatId,'https://sl.combot.org/programming_stickers/webp/1xf09f92bb.webp')
            return     bot.sendMessage(chatId,`Welcome to telegram `)
        }
        if (text === '/info'){
            return    bot.sendMessage(chatId,`Your name is ${msg.from.first_name} ${msg.from.last_name} `)
        }

        if (text === '/game') {

        return(startGame(chatId))

        }
        return bot.sendMessage(chatId,'I dont understand you,try again ')



    })

    bot.on('callback_query',  async msg => {
        const data =msg.data;
        const chatId=msg.message.chat.id;

        if (data ==='/again'){
            return startGame(chatId)
        }
        if(data === chats[chatId]){
            return  bot.sendMessage(chatId,`Maladec gushakecir ${chats[chatId]}`,againOptions)
        }else {
            return  bot.sendMessage(chatId,`Che Chgushakecir amot qez  ${chats[chatId]}`,againOptions)

        }

    })

}
start()