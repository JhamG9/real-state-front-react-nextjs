export interface Owner {
  idOwner: string;
  name: string;
  address: string;
  photo: string;
  birthday: string;
}

export interface PropertyTrace {
  dateSale: Date;
  name: string;
  value: number;
  tax: number;
  idProperty: string;
}

export interface Property {
  idProperty: string;
  name: string;
  address: string;
  price: number;
  codeInternal: string;
  year: number;
  idOwner: string;
  images: string[];
  owner?: Owner;
  propertyTraces?: PropertyTrace[];
}
