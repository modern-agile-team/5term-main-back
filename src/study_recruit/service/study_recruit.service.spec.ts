import { Test, TestingModule } from '@nestjs/testing';
import { StudyRecruitService } from './study_recruit.service';

describe('StudyRecruitService', () => {
  let service: StudyRecruitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudyRecruitService],
    }).compile();

    service = module.get<StudyRecruitService>(StudyRecruitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
