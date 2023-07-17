import { Test, TestingModule } from '@nestjs/testing';
import { StudyRecruitController } from './study_recruit.controller';

describe('StudyRecruitController', () => {
  let controller: StudyRecruitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudyRecruitController],
    }).compile();

    controller = module.get<StudyRecruitController>(StudyRecruitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
