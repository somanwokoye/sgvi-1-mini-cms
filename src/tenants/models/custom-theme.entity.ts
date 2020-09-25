import { BaseAbstractEntity } from 'src/global/base-abstract.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Tenant } from './tenant.entity';

@Entity()
export class CustomTheme extends BaseAbstractEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  properties: string;

  @JoinColumn()
  @OneToOne(
    type => Tenant,
    tenant => tenant.customTheme,
  )
  tenant: Tenant;
}
