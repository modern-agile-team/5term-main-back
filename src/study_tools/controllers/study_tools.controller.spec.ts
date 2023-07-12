import { Test, TestingModule } from '@nestjs/testing';
import { StudyToolsController } from './study_tools.controller';

describe('StudyToolsController', () => {
  let controller: StudyToolsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudyToolsController],
    }).compile();

    controller = module.get<StudyToolsController>(StudyToolsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
