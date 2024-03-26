import { JwtPayload } from "jwt-decode";


export type UserMovieType = {
    movie: MovieType
    watched: boolean
}

export type MovieType = {
    id: number;
    title: string;
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: string;
    genre_ids: number[];
    release_date: string;
};

/* export type SingleMovieType = {
   adult: boolean;
   backdrop_path: string;
   belongs_to_collection: null | any; // You might want to replace 'any' with a specific type if there is a collection type
   budget: number;
   genres: {
       id: number;
       name: string;
   }[];
   homepage: string;
   id: number;
   imdb_id: string;
   original_language: string;
   original_title: string;
   overview: string;
   popularity: number;
   poster_path: string;
   production_companies: {
       id: number;
       logo_path: string | null;
       name: string;
       origin_country: string;
   }[];
   production_countries: {
       iso_3166_1: string;
       name: string;
   }[];
   release_date: string;
   revenue: number;
   runtime: number;
   spoken_languages: {
       english_name: string;
       iso_639_1: string;
       name: string;
   }[];
   status: string;
   tagline: string;
   title: string;
   video: boolean;
   vote_average: number;
   vote_count: number;
}; */

export type ReviewType = {
    movie: MovieType
    user: {
        _id: number
        name: string
    }
    rating: 1 | 2 | 3 | 4 | 5 | null
    title: string
    review: string
}

export type User = {
    email: string
    name: string
    _id: string
    movies: UserMovieType[]
    avatar_path: string | null
}

export type TokenPayload = {
    user: User
} & JwtPayload

export type SignUpUser = {
    email: string
    name: string
    password: string
    passwordConfirmation: string
}

export type LoginUser = {
    email: string
    password: string
}

// Search types

export type ReviewSearchType = { searchMode: "user", value: any } | { searchMode: "movie", value: any } | null

export type MovieSearchType = { searchMode: "name", value: any } | { searchMode: "genre", value: any } | null

export type MovieSearchParams = { searchMode: string | null, searchQuery: string | null }
