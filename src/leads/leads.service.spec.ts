import { LeadsService } from './leads.service';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Lead } from './entity/lead.entity';
import { Repository } from 'typeorm';
import { CreateLeadDto } from './dtos/create-lead.dto';
import { ReturnLeadDto } from './dtos/return-lead.dto';

describe('LeadsService', () => {
  let leadService: LeadsService;
  let leadsRepository: Repository<Lead>;

  const LEADS_REPOSITORY_TOKEN = getRepositoryToken(Lead);

  const lead = {
    email: 'test@test.com',
    fullName: 'Test User',
    city: 'Test City',
    state: 'Test State',
    optIn: true,
  };

  const create = jest.fn();
  const save = jest.fn();
  const find = jest.fn();

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        LeadsService,
        {
          provide: LEADS_REPOSITORY_TOKEN,
          useValue: { create, save, find },
        },
      ],
    }).compile();

    leadService = module.get<LeadsService>(LeadsService);
    leadsRepository = module.get<Repository<Lead>>(LEADS_REPOSITORY_TOKEN);
  });

  describe('after instantiating', () => {
    it('service should have been defined', () => {
      expect(leadService).toBeDefined();
    });

    it('repository should have been defined', () => {
      expect(leadsRepository).toBeDefined();
    });
  });

  describe('when creating a lead', () => {
    let leadDto: ReturnLeadDto;
    create.mockResolvedValue(Promise.resolve(lead));
    save.mockResolvedValue(Promise.resolve(lead));

    beforeAll(
      async () => (leadDto = await leadService.create(lead as CreateLeadDto)),
    );

    it('the create method should have been called', async () => {
      expect(create).toHaveBeenCalledTimes(1);
    });

    it('the save method should have been called', async () => {
      expect(save).toHaveBeenCalledTimes(1);
    });

    it('should return a lead DTO', async () => {
      expect(leadDto).toBeInstanceOf(ReturnLeadDto);
    });

    it('should return a lead DTO with correct data', async () => {
      expect(leadDto.email).toBe('test@test.com');
      expect(leadDto.fullName).toBe('Test User');
    });
  });

  describe('when retrieving all leads', () => {
    let leadsDto: ReturnLeadDto[];
    find.mockResolvedValue(Promise.resolve([lead]));

    beforeAll(async () => (leadsDto = await leadService.findAll()));

    it('the find method should have been called', async () => {
      expect(find).toHaveBeenCalledTimes(1);
    });

    it('should return an array of lead DTO', async () => {
      expect(Array.isArray(leadsDto)).toBeTruthy();
      expect(leadsDto.length).toBe(1);
      expect(leadsDto[0]).toBeInstanceOf(ReturnLeadDto);
    });
  });
});
