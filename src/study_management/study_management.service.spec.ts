import { Test, TestingModule } from '@nestjs/testing';
import { StudyManagementService } from './study_management.service';

describe('StudyManagementService', () => {
  let service: StudyManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudyManagementService],
    }).compile();

    service = module.get<StudyManagementService>(StudyManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
