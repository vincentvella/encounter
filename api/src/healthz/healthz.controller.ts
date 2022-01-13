import { Controller, Get } from '@nestjs/common';

@Controller('healthz')
export class HealthzController {
  @Get()
  check() {
    return {
      code: 200,
      message: 'up!'
    }
  }
}
