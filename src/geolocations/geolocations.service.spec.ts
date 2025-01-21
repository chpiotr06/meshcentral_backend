import { Test, TestingModule } from '@nestjs/testing';
import { GeolocationsService } from './geolocations.service';

describe('GeolocationsService', () => {
  let service: GeolocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeolocationsService],
    }).compile();

    service = module.get<GeolocationsService>(GeolocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
