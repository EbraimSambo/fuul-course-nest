import { Controller, Get } from '@nestjs/common';

@Controller('songs')
export class SongsController {
    // constructor() { }

    @Get()
    songs() { 
        return "sambo";
    }
}
