import { Module } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { PlaylistsController } from './playlists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './entities/playlist.entity';
import { Song } from 'src/songs/entities/song.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  controllers: [PlaylistsController],
  providers: [PlaylistsService],
  imports: [TypeOrmModule.forFeature([Playlist,Song, User])]
})
export class PlaylistsModule {}
