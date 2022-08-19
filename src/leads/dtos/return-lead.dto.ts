import { Lead } from '../entity/lead.entity';

export class ReturnLeadDto {
  id: string;
  email: string;
  fullName: string;
  createdAt: Date;

  constructor(lead: Lead) {
    this.id = lead.id;
    this.email = lead.email;
    this.fullName = lead.fullName;
    this.createdAt = lead.createdAt;
  }
}
