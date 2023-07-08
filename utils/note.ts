import { Note } from '@hackmd/api/dist/type';

export function getNotes(): Promise<Note[]> {
  const url = `${process.env.HACKMD_API_ENDPOINT}/notes`;
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.HACKMD_API_TOKEN}`,
    },
  };
  return fetch(url, options).then((response) => response.json());
}

export function getNoteContentById(id: string): Promise<string> {
  const downloadUrl = `https://hackmd.io/${id}/download`;
  return fetch(downloadUrl).then((response) => response.text());
}

export function isBlogNote(note: Note): boolean {
  const hasBlogTag = note.tags.includes('blog');
  const isPubliclyReadable = note.readPermission === 'guest';
  return hasBlogTag && isPubliclyReadable;
}
