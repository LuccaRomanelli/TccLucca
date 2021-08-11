import { Test, TestingModule } from '@nestjs/testing';
import { PulseiraController } from './pulseira.controller';

describe('PulseiraController', () => {
  let controller: PulseiraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PulseiraController],
    }).compile();

    controller = module.get<PulseiraController>(PulseiraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
