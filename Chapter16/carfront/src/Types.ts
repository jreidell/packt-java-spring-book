export type CarResponse = {
    brand : string;
    model : string;
    color : string;
    registrationNumber : string;
    modelYear : number;
    price : number;
    _links : {
      self : {
        href : string;
      },
      car : {
        href : string;
      },
      owner : {
        href : string;
      }
    };
  };

  export type Car = {
    brand : string;
    model : string;
    color : string;
    registrationNumber : string;
    modelYear : number;
    price : number;
  };

  export type CarEntry = {
    car: Car;
    url: string;
  };

  export type User = {
    username: string;
    password: string;
  };

  export type DialogFormProps = {
    car: Car,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };

  export type EditFormProps = {
    cardata: CarResponse;
  };

  export type CarlistProps = {
    logoutHandler?: () => void;
  };
