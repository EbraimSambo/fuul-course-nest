import { Controller, Get, Req, Scope, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { ArtistAuthGuard } from 'src/auth/guards/artist-jwt.guard';

@Controller({
    path: 'songs',
    scope: Scope.REQUEST
})
export class SongsController {
    // constructor() { }

    @UseGuards(ArtistAuthGuard)
    @Get()
    songs(@Req() request: Request) { 
        console.log(request.user)
        return "sambo";
    }
}
