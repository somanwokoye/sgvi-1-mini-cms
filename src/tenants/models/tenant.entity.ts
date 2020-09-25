import { BaseAbstractEntity } from 'src/global/base-abstract.entity';
import {
  Column,
  Entity,
  Generated,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Billing } from '../modules/billings/models/billing.entity';
import { CustomTheme } from './custom-theme.entity';
import { Theme } from '../modules/themes/models/theme.entity';

@Entity()
export class Tenant extends BaseAbstractEntity {
  @Generated('uuid')
  uuid: string;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column()
  contactFirstName: string;

  @Column()
  contactLastName: string;

  @Column()
  contactTitle: string;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column()
  defaultURLSlug: string;

  @Column({ nullable: true })
  customURLSlug: string;

  @Column()
  dateOfRegistration: Date;

  @Column({ default: false })
  active: boolean;

  @OneToOne(
    type => CustomTheme,
    customTheme => customTheme.tenant,
    { cascade: true },
  )
  customTheme: CustomTheme;

  @ManyToMany(type => Theme)
  theme: Theme;

  @OneToMany(
    type => Billing,
    billing => billing.tenant,
  )
  billings: Billing[]; //notice the array here

  /*Even though there is a relationship between tenant and everyother model,
    typeorm allows us to define many-to-one without one-to-many. But you can't 
    define one-to-many without many-to-one. Here, we shall define no relationship
    but put many-to-one in every other entity in relation to tenant.
    See https://typeorm.io/#/many-to-one-one-to-many-relations 
    */
}
