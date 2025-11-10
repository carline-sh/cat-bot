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
  ctx.reply('Ello, world!');
});

bot.on(message('sticker'), (ctx) => ctx.reply('👍'))
bot.hears('meow', async (ctx) => {
    const cat = await getCat();
    ctx.replyWithPhoto(cat.url);
});
bot.launch();

console.log('Bot is running...');

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
