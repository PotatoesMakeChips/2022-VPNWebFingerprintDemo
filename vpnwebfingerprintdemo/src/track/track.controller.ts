import { Controller, Get, Query } from '@nestjs/common';
import { TrackService } from './track.service';


@Controller()
export class TrackController {
    constructor(private readonly trackService: TrackService) { }

    @Get()
    async getRoot(): Promise<string> {
        return this.trackService.getRoot();
    }

    @Get('track')
    async getTrack(@Query() query: { 
        name: string,
        id: string,
     }): Promise<string>{
        return this.trackService.getTrack(query.id, query.name);
    }

    @Get('name')
    async getName(@Query() query: { 
        id: string
     }): Promise<string>{
        return this.trackService.getName(query.id);
    }

}
