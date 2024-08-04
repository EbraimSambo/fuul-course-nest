import { Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './entities/playlist.entity';
import { Repository } from 'typeorm';
import { Song } from 'src/songs/entities/song.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PlaylistsService {

  constructor(
    @InjectRepository(Playlist)
    private playListRepo: Repository<Playlist>,
    @InjectRepository(Song)
    private songRepo: Repository<Song>,  
    @InjectRepository(User)
    private userRepo: Repository<User>,    
  ){}

  async create(dto: CreatePlaylistDto) {
    const newPlayList = new Playlist()
    newPlayList.id= dto.name
    const song = await this.songRepo.findByIds(newPlayList.songs)
    newPlayList.songs = song;

    // A user will be the id of the user we are getting from the request
    // when we implemented the user authentication this id will become the loggedIn user id
    const user = await this.userRepo.findOneBy({ id: dto.user });
    newPlayList.user = user;

    return this.playListRepo.save(newPlayList);
  }

  findAll() {
    return `This action returns all playlists`;
  }

  findOne(id: number) {
    return `This action returns a #${id} playlist`;
  }

  update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    return `This action updates a #${id} playlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} playlist`;
  }
}
