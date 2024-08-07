import { Playlist } from "src/playlists/entities/playlist.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User {
    
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({
        nullable: true
    })
    firstName: string;
  
    @Column({
        nullable: true
    })
    lastName: string;
  
    @Column({
        unique: true,
    })
    email: string;
  
    @Column()
    password: string;
    
    @Column({ nullable: true, type: 'text' })
    twoFASecret: string;
  
    @Column({ default: false, type: 'boolean' })
    enable2FA: boolean;  
    /**
     * A user can create many playLists
     */


    @OneToMany(() => Playlist, (playList) => playList.user)
    playLists: Playlist[];
}
