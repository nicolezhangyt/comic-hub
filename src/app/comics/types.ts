export interface Comics {
  characters: character[];
  id: string;
  name: string;
  image: string;
  description: string;
}

export interface character {
  description: string;
  id: string;
  image: string;
  isGood: string;
  name: string;
  numberOfRoles: string;
}
export interface NewCharacter {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

export interface localCharacter {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}
