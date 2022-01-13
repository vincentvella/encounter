import { Controller, Get, HttpCode } from '@nestjs/common';
import { Public } from 'src/authentication/strategies/public.strategy';

@Controller('healthz')
export class HealthzController {
  @Get()
  @Public()
  check() {
    return {
      statusCode: 200,
      message: 'up!'
    }
  }
}
