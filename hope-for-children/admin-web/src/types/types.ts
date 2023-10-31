export interface ApiResponse<T> {
  isSuccess: boolean;
  value: T | null;
  error: string | null;
}

export interface ProjectResponse<T = Project[]> {
  isSuccess: boolean;
  value: T;
  error: string;
}

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
}
export interface ResetPassword {
  userId: string | null;
  token: string | null;
  newPassword: string;
}

export interface ForgetPasswordSendEmail {
  email: string;
}

export interface User {
  email: string;
  userRole: string;
  userName: string;
  id: string;
}

export interface RegisterUser {
  password: string;
  email: string;
  userRole: string;
  username: string;
}

export interface UpdateUser {
  email: string;
  userRole: string;
  username: string;
  id: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface AuthType {
  email: string;
  password: string;
}

export interface CommonProjectFields {
  title: string;
  description: string;
  content: string;
}

export interface Project extends CommonProjectFields {
  photoUrl: string;
  id: string;
}

export interface CreateProject extends CommonProjectFields {
  imageFile: File;
}

export interface UpdateProject extends CommonProjectFields {
  file: File | null;
  id: string;
}

export interface ProjectDetail extends UpdateProject {}

export interface CommonStaffFields {
  name: string;
  about: string;
  userSector: string;
  title: string;
}

export interface CreateStaff extends CommonStaffFields {
  file: File;
}
export interface UpdateStaff extends CommonStaffFields {
  file: File | null;
  id: string;
}

export interface Staff {
  name: string;
  about: string;
  photoUrl: string;
  userSector: string;
  title: string;
  id: string;
}

export interface CommonAlumniFields {
  name: string;
  story: string;
}

export interface CreateAlumni extends CommonAlumniFields {
  file: File;
}

export interface UpdateAlumni extends CommonAlumniFields {
  file: File | null;
  id: string;
}

export interface Alumni {
  name: string;
  story: string;
  photoUrl: string;
  id: string;
}

export interface Gallery {
  title: string;
  mainPhotoUrl: string;
  id: string;
}

export interface GalleryPhoto {
  isMainPhoto: boolean;
  File: File;
  url: string;
}

export interface PhotoDetail {
  id: string;
  url: string;
  isMainPhoto: boolean;
}

export interface CreateGallery {
  title: string;
  photos: GalleryPhoto[];
  isMainPhotoCount: number;
}

export interface UpdateGallery {
  title: string;
  photos: GalleryPhoto[];
  isMainPhotoCount: number;
  id: string;
}

export interface GalleryDetail {
  title: string;
  mainPhotoUrl: string;
  photos: PhotoDetail[];
  id: string;
}
