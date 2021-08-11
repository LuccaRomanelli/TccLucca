import { Test, TestingModule } from '@nestjs/testing';
import { ConexaoController } from './conexao.controller';

describe('ConexaoController', () => {
  let controller: ConexaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConexaoController],
    }).compile();

    controller = module.get<ConexaoController>(ConexaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
