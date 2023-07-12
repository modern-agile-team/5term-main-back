import { Test, TestingModule } from '@nestjs/testing';
import { StudyToolsService } from './study_tools.service';

describe('StudyToolsService', () => {
  let service: StudyToolsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudyToolsService],
    }).compile();

    service = module.get<StudyToolsService>(StudyToolsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
