import { ReturnLeadDto } from './dtos/return-lead.dto';
import { CreateLeadDto } from './dtos/create-lead.dto';
import { Lead } from './entity/lead.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead)
    private leadsRepository: Repository<Lead>,
  ) {}

  async findAll(): Promise<ReturnLeadDto[]> {
    const leadArray = await this.leadsRepository.find();
    const leads = leadArray.map((lead) => new ReturnLeadDto(lead));

    return leads;
  }

  async create(createLead: CreateLeadDto): Promise<ReturnLeadDto> {
    const lead = this.leadsRepository.create();
    Object.assign(lead, createLead);

    try {
      await this.leadsRepository.save(lead);
      const newLead = new ReturnLeadDto(lead);

      return newLead;
    } catch (error) {
      if (error.code.toString() === '23505')
        throw new ConflictException('Endereço de email já está em uso');

      throw new InternalServerErrorException(
        'Erro ao salvar o usuário no banco de dados',
      );
    }
  }
}
