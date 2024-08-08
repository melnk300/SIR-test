export interface Repository {
  id: string;
  title: string;
  language: string;
  forks: number;
  stars: number;
  update: string;
  tags: string[];
  license: string;
}