import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus() {
    return {
      name: 'AI Kingdoms Backend',
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
