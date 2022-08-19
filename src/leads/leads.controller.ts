import { ReturnLeadDto } from './dtos/return-lead.dto';
import { CreateLeadDto } from './dtos/create-lead.dto';
import { LeadsService } from './leads.service';
import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';

@Controller('leads')
export class LeadsController {
  constructor(private leadsService: LeadsService) {}

  @Get()
  async findLeads(): Promise<ReturnLeadDto[]> {
    return this.leadsService.findAll();
  }

  @Post()
  async createLead(
    @Body(ValidationPipe) createLeadDto: CreateLeadDto,
  ): Promise<ReturnLeadDto> {
    const lead = await this.leadsService.create(createLeadDto);

    return lead;
  }
}
