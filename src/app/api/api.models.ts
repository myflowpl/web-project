
export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  role?: Role;
}

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
  ROOT = 'root',
}

/**
 * Sign Up
 *
 * POST /signup
 */
export interface SignUpDto {
  name: string;
  email: string;
  password?: string;
}
export interface SignUpResponseDto {
  accessToken: string;
}

/**
 * Sign In
 *
 * POST /signin
 */
export interface SignInDto {
  email: string;
  password: string;
}
export interface SignInResponseDto {
  accessToken: string;
}

export interface Medium {
  id: number;
  name: string;
  url: string;
}

export interface Address {
  id: number;
  street: string;
  city: string;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  address?: Address;
  media?: Medium[];
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
