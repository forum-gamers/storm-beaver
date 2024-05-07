export interface FileInput {
  base64: string;
  folder: string;
  filename: string;
}

export type MimeType =
  | 'png'
  | 'jpg'
  | 'jpeg'
  | 'gif'
  | 'bmp'
  | 'mp4'
  | 'avi'
  | 'mkv'
  | 'mov';

export interface FileUploadInput {
  filename: string;
  folder: string;
  content: string;
}
