import { ReturnLeadDto } from './dtos/return-lead.dto';
import { CreateLeadDto } from './dtos/create-lead.dto';
import { LeadsService } from './leads.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('leads')
export class LeadsController {
  constructor(private leadsService: LeadsService) {}

  @Get()
  async findLeads(): Promise<ReturnLeadDto[]> {
    return this.leadsService.findAll();
  }

  @Post()
  async createLead(
    @Body() createLeadDto: CreateLeadDto,
  ): Promise<ReturnLeadDto> {
    const lead = await this.leadsService.create(createLeadDto);

    return lead;
  }
}
