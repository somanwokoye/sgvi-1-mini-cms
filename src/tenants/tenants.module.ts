import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomTheme } from './models/custom-theme.entity';
import { Tenant } from './models/tenant.entity';
import { TenantsController } from './tenants.controller';
import { TenantsService } from './tenants.service';
import { ThemesModule } from './modules/themes/themes.module';
import { ThemesService } from './modules/themes/themes.service';
import { Theme } from './modules/themes/models/theme.entity';
import { BillingsModule } from './modules/billings/billings.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tenant, CustomTheme]), 
    ThemesModule, 
    BillingsModule
  ],
  controllers: [TenantsController],
  providers: [TenantsService]
})
export class TenantsModule {}
