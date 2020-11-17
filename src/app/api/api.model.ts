export interface Contact {
  id: number;
  name: string;
  email: string;
}

export interface Coords {
  lat: number;
  lng: number;
}
export interface Artist {
  id: number;
  name: string;
  img: string;
  location?: Coords;
}
export interface Playlist {
  id: number;
  name: string;
}

export interface PlaylistSongs {
  id: number;
  playlistId: number;
  songId: number;
  song?: Song;
  playlist?: Playlist;
}

export interface Song {
  id: number;
  title: string;
  year: string;
  artistId: number;
  webUrl: string;
  genders?: string[];
  favorite?: boolean;
}

export interface User {
  id: number;
  name: string;
  password: string;
  role?: Role;
}

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
  ROOT = 'root',
}
