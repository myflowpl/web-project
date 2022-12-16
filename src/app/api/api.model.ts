export interface Quote {
  id: number;
  text: string;
  author: string;
}

export interface QuotesDto {
  page: number;
  pageSize: number;
  total: number;
  data: Quote[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  role?: Role;
}

export interface LoginDto {
  email: string;
  password: string;
}

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
  ROOT = 'root',
}

export interface UserCreateResponse {
  accessToken: string;
  user: User;
}

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
  userId: number;
}

export interface PlaylistSongs {
  id: number;
  playlistId: number;
  songId: number;
  song?: Song;
  playlist?: Playlist;
  userId: number;
}

export interface Song {
  id: number;
  title: string;
  year: string;
  artistId: number;
  artist?: Artist;
  webUrl: string;
  genders?: string[];
  favorite?: boolean;
}
