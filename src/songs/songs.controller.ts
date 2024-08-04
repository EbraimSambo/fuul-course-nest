import { Controller, Get, Scope } from '@nestjs/common';

@Controller({
    path: 'songs',
    scope: Scope.REQUEST
})
export class SongsController {
    // constructor() { }

    @Get()
    songs() { 
        return "sambo";
    }
}
