export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone?: string;
  website?: string;
  company: Company;
};

type Company = {
  name: string;
  catchPhrase?: string;
  bs?: string;
};
export type dialogVM = {
  user: User;
  isEdit: boolean;
  parentCall: boolean;
};
