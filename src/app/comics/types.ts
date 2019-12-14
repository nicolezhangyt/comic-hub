export interface Comics {
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

export interface NewCharacters {
  id: NewCharacter[];
}
