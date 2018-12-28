interface Sublevel3 {
  id: number;
  name: string;
}

interface Sublevel2 {
  id: number;
  name: string;
  sublevels?: Sublevel3[];
}

export interface Sublevel {
  id: number;
  name: string;
  sublevels?: Sublevel2[];
}

export interface Category {
  id: number;
  name: string;
  sublevels?: Sublevel[];
}

export interface Categories {
  categories: Category[];
}
