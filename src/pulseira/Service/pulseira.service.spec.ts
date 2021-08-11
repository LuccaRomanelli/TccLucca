import { Test, TestingModule } from '@nestjs/testing';
import { PulseiraService } from './pulseira.service';

describe('PulseiraService', () => {
  let service: PulseiraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PulseiraService],
    }).compile();

    service = module.get<PulseiraService>(PulseiraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
