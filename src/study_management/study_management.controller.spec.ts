import { Test, TestingModule } from '@nestjs/testing';
import { StudyManagementController } from './study_management.controller';

describe('StudyManagementController', () => {
  let controller: StudyManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudyManagementController],
    }).compile();

    controller = module.get<StudyManagementController>(
      StudyManagementController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
