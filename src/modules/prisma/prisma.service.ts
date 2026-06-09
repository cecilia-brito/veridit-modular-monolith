import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '../../../generated/client'
import "dotenv/config"

// @Injectable()
// export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy{
// 	constructor(){
// 		const databaseUrl = process.env.DATABASE_URL;
// 		if(!databaseUrl){
// 			throw new Error("Database Url is not found");
// 		}
// 		const adapter = new PrismaBetterSqlite3(
// 			{url: databaseUrl}
// 		)
// 		super({adapter});
// 	}
// 	async onModuleInit() {
// 		await this.$connect();
// 	}
// 	async onModuleDestroy() {
// 		await this.$disconnect();
// 	}
// }
