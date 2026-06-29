import { Global, Module } from '@nestjs/common';
import { SharedEmailService } from './SharedEmailService';

@Global()
@Module({
  providers: [SharedEmailService],
  exports: [SharedEmailService],
})
export class EmailModule {}
