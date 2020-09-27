import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { renderToNodeStream } from 'react-dom/server';
import App from '../clients_dev/tenants-react-web-client/src/App';
import * as React from 'react';
import { Reply } from 'src/global/custom.interfaces';
import renderEngine from 'src/global/render.engine';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { CreateTenantDto } from './dto/create/create-tenant.dto';
import { UpdateTenantDto } from './dto/update/update-tenant.dto';
import { Tenant } from './models/tenant.entity';
import { TenantsService } from './tenants.service';
//import { FindOneParams } from './validators/params.validator';

@Controller('tenants')
export class TenantsController {

    /**
     * 
     * @param tenantsService 
     * Inject tenantsService
     */
    constructor(private readonly tenantsService: TenantsService) { }

    /**
     * 
     * @param createTenantDto 
     * Handle Post request for create
     */
    @Post()
    create(@Body() createTenantDto: CreateTenantDto): Promise<Tenant> {
        //console.log(JSON.stringify(createTenantDto));
        return this.tenantsService.create(createTenantDto);
    }

    /**
     * Handle Get request for find
     */
    @Get()
    findAll(): Promise<Tenant[]> {
        return this.tenantsService.findAll();
    }

    /**
     * 
     * @param id 
     * Handle Get request for find by id
     */
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Tenant> {
        return this.tenantsService.findOne(id);
    }

    /**
     * 
     * @param id id of tenant to be updated
     * @param updateTenantDto new content
     * Handle Put request for 
     */
    /* FindOneParams not working well. Using ParseIntPipe
    @Put(':id')
    partialUpdate(@Param('id', ParseIntPipe) id: FindOneParams, @Body() updateTenantDto: UpdateTenantDto): Promise<UpdateResult> {
        return this.tenantsService.update1(id, updateTenantDto);
    }
    */
    @Put(':id')
    partialUpdate(@Param('id', ParseIntPipe) id: number, @Body() updateTenantDto: UpdateTenantDto): Promise<UpdateResult> {
        return this.tenantsService.update1(id, updateTenantDto);
    }

    /**
     * 
     * @param tenant 
     * Non-partial update. Takes a full tenant without param.
     */
    @Put()
    update(@Body() tenant: Tenant): Promise<Tenant> {
        return this.tenantsService.update2(tenant);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.tenantsService.delete(id);
    }

    @Get('web')
    web(@Res() reply: Reply) {
        
        //We want to render the raw way so that we can call renderToStream
        const res = reply.raw;

        /*We want to be able to send some initialization data to the react component
        Just using below string as an illustration placeholder for now. The real value will be 
        when we implement Authentication and Authorization.
        The token will contain whatever data you want to pass but in base64 digest format.
        */
        const initialProps = {jwtToken : "put-the-token-string-here-if-any"};        


        const beforeStream = renderEngine().render('tenants/before-react-stream.fragment.html', 
            { title: 'Tenants Administration', TenantsActive: true })

        const afterStream = renderEngine().render('tenants/after-react-stream.fragment.html', 
            { initialProps: JSON.stringify(initialProps) })

        //Write the first rendered fragment (upper html part)
        res.write(beforeStream);

        //write the React app using renderToNodeStream
        const stream = renderToNodeStream(<App {...initialProps}/>)

        stream.addListener('end', () => {
            res.write(afterStream); //Write the last rendered fragment (lower html part)
            res.end();
        });

        //enable stream piping
        stream.pipe(res, { end: false });

    }

}
