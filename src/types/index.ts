// all our types are define here

import { OutputFileEntry } from "@uploadcare/react-uploader";

export interface UserLogIn {
    email: string;
    password: string;
};

export interface UserSignIn {
    email: string;
    password: string;
    confirmPassword: string;
};

export interface FileEntry {
    files: OutputFileEntry[]
}

export interface Post {
    caption: string,
    photos: PhotoMeta[],
    likes: number,
    userLikes: [],
    userId: string | null,
    date: Date
}

export interface PhotoMeta {
    cdnUrl: string,
    uuid: string
}

export interface DocumentResponse {
    id?: string,
    caption?: string,
    photos?: PhotoMeta[],
    likes?: number,
    userLikes?: [],
    userId?: string ,
    date?: Date
}