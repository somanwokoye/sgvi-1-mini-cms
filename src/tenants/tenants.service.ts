import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateTenantDto } from './dto/create/create-tenant.dto';
import { UpdateTenantDto } from './dto/update/update-tenant.dto';
import { CustomTheme } from './models/custom-theme.entity';
import { Tenant } from './models/tenant.entity';
import { FindOneParams } from './validators/params.validator';

@Injectable()
export class TenantsService {

    /**
     * 
     * @param tenantRepository 
     * @param customThemeRepository 
     */
    constructor(
        @InjectRepository(Tenant) private tenantRepository: Repository<Tenant>,
        @InjectRepository(CustomTheme) private customThemeRepository: Repository<CustomTheme>
    ){}

    /**
     * 
     * @param createTenantDto 
     * 
     */
    //create below assumes that tenant model does not allow cascade create of custom theme
    /*
    async create (createTenantDto: CreateTenantDto): Promise<Tenant>{

        const newCustomTheme = this.customThemeRepository.create(createTenantDto.customTheme)
        const customTheme = await this.customThemeRepository.save(newCustomTheme);


        const newItem = this.tenantRepository.create(createTenantDto);
        //associate the custom theme created above with newItem before saving
        newItem.customTheme = customTheme;

        
        return this.tenantRepository.save(newItem);
    }
    */

    /**
     * 
     * @param createTenantDto 
     */
    async create (createTenantDto: CreateTenantDto): Promise<Tenant>{

        const newTenant = this.tenantRepository.create(createTenantDto);
        return await this.tenantRepository.save(newTenant);

    }

    /**
     * See https://typeorm.io/#/find-options
     */
    
    async findAll(): Promise<Tenant[]> {
        return await this.tenantRepository.find();
    }
    
    
    //2. Note: You can indicate the fields to be returned
    /*
    async findAll(): Promise<Tenant[]> {
        return await this.tenantRepository.find({select: ["code", "name"]});
    }*/

    //3. For relations, you can specify relations to be included in return
    /**
     * find all and return only code and name along with customTheme relation
     */
    /*
    async findAll(): Promise<Tenant[]> {
        return await this.tenantRepository.find({select: ["code", "name"], relations: ["customTheme"]});
    }
    */
    
    //4. Etc. See https://typeorm.io/#/find-options

    /**
     * 
     * @param id 
     * find by id
     */
    async findOne(id: number): Promise<Tenant> {
        return await this.tenantRepository.findOne(id);
    }
    
    /**
     * 
     * @param id 
     * Finds by a criterion (id in this case) and deletes. Returns void
     */
    /* FindOneParams not working well. Using ParseIntPipe
    async delete(id: FindOneParams): Promise<void> {
        await this.tenantRepository.delete(id);
    }
    */
    async delete(id: number): Promise<void> {
        await this.tenantRepository.delete(id);
    }

    /**
     * 
     * @param tenant 
     * Remove the Tenant specifed. Returns Tenant removed.
     */
    async remove(tenant: Tenant): Promise<Tenant> {
        return await this.tenantRepository.remove(tenant);
    }

    //partial update
    /**
     * 
     * @param id 
     * @param tenant 
     * Find by the id and replace the fields sent in Dto
     */
    /*
    /* FindOneParams not working well. Using ParseIntPipe
    async update1(id: FindOneParams, tenant: UpdateTenantDto): Promise<UpdateResult> {
        return await this.tenantRepository.update(id, { ...tenant })
    }
    */
    async update1(id: number, tenant: UpdateTenantDto): Promise<UpdateResult> {
        return await this.tenantRepository.update(id, { ...tenant })
    }

    /**
     * 
     * @param tenant 
     * No partial update allowed here. Saves the tenant object supplied
     */
    async update2(tenant: Tenant): Promise<Tenant> {
        return await this.tenantRepository.save(tenant)
    }


}
