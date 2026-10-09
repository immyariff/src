type Name = (firstName: string, lastName: string) => string;
type Email = (email: string) => string;

///const email: Email = email => email;
export type Person = {
  readonly name:  Name
  
  readonly email:  Email
  
};
