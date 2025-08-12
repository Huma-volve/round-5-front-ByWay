export interface LaravelPagination<T> {
  current_page: number;
  data: T[];
  first_page_url: string | null;
  from: number;
  last_page: number;
  last_page_url: string | null;
  links: { url: string | null; label: string; active: boolean }[];
  next_page_url: string | null;
  path: string | null;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export function paginateLaravel<T>(
  data: T[],
  currentPage: number = 1,
  perPage: number = 5
): LaravelPagination<T> {
  const total = data.length;
  const lastPage = Math.ceil(total / perPage);
  const from = (currentPage - 1) * perPage + 1;
  const to = Math.min(currentPage * perPage, total);

  const paginatedData = data.slice(from - 1, to);

  return {
    current_page: currentPage,
    data: paginatedData,
    first_page_url: null,
    from,
    last_page: lastPage,
    last_page_url: null,
    links: [
      { url: null, label: "<", active: currentPage > 1 },
      ...Array.from({ length: lastPage }, (_, i) => ({
        url: null,
        label: `${i + 1}`,
        active: i + 1 === currentPage
      })),
      { url: null, label: ">", active: currentPage < lastPage }
    ],
    next_page_url: null,
    path: null,
    per_page: perPage,
    prev_page_url: null,
    to,
    total
  };
}
