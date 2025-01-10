import { Test, TestingModule } from '@nestjs/testing';
import { GeolocationsController } from './geolocations.controller';

describe('GeolocationsController', () => {
  let controller: GeolocationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeolocationsController],
    }).compile();

    controller = module.get<GeolocationsController>(GeolocationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
