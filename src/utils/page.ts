import type { Page } from 'astro';
import { siteUrl } from 'src/constants/site';

export function paginate<Type = unknown>(
  data: Type[],
  options?: { page?: number; pageSize?: number },
): Page {
  const pageNumber = options?.page ?? 1;
  const pageIndex = pageNumber - 1;
  const pageSize = options?.pageSize ?? 10;
  const startIndex = pageIndex * pageSize;
  const endIndex = startIndex + pageSize;

  return {
    data: data.slice(startIndex, endIndex),
    start: startIndex,
    end: endIndex,
    total: data.length,
    currentPage: pageNumber,
    size: pageSize,
    lastPage: Math.ceil(data.length / pageSize),
    url: {
      current: `${siteUrl}/blog/page/${pageNumber}`,
      prev: `${siteUrl}/blog/page/${pageNumber - 1}`,
      next: `${siteUrl}/blog/page/${pageNumber + 1}`,
    },
  };
}
