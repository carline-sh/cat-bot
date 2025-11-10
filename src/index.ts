import { Telegraf } from 'telegraf';
import { config } from 'dotenv';
import { message } from 'telegraf/filters';

config();

type CatResponse = {
    id: string;
    tags: string[];
    created_at: string;
    url: string;
    mimetype: string;
}

const getCat = async (): Promise<CatResponse> => {
    const response = await fetch('https://cataas.com/cat', {
        headers: {
            'Accept': 'application/json'
        }
    });
    const data = await response.json() as CatResponse;
    return data;
}

console.log('Ello, world!');

const bot = new Telegraf(process.env.BOT_TOKEN!)

bot.start((ctx) => {
  ctx.reply('Ello, there! Send me \'meow\'.');
});

bot.on(message('sticker'), (ctx) => ctx.reply('👍'))
bot.hears('meow', async (ctx) => {
    const cat = await getCat();
    ctx.replyWithPhoto(cat.url);
});
bot.launch();

bot.hears('Rick', async (ctx ) => {
    const Rick = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.2dqcUObYQ3-xwZjHktoBoQHaEK%3Fpid%3DApi&f=1&ipt=112b45e841546b5b58fd04b97fdec5654be10fb7089ba93bf65c3c03816f7a62&ipo=images";
    ctx.replyWithPhoto(Rick);
});

console.log('Bot is running...');

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
