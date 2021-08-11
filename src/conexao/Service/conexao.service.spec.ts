import { Test, TestingModule } from '@nestjs/testing';
import { ConexaoService } from './conexao.service';

describe('ConexaoService', () => {
  let service: ConexaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConexaoService],
    }).compile();

    service = module.get<ConexaoService>(ConexaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
