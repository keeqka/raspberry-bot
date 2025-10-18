import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Telegraf } from 'telegraf';

@Module({})
export class BotModule implements OnModuleInit {
  private bot: Telegraf;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    const token = this.configService.get('BOT_TOKEN');
    if (!token) {
      throw new Error('BOT_TOKEN is not set');
    }

    this.bot = new Telegraf(token);

    this.bot.start((ctx) => ctx.reply('Hi'));
    this.bot.on('text', (ctx) => ctx.reply(`Replying: ${ctx.message.text}`));

    await this.bot.launch();
    console.log('Bot started');
  }
}
