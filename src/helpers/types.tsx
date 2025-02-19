export type RegisterStepOne = {
  fullName: string;
  email: string;
  phone: string;
  cpf: string;
  birthDate: string;
  password: string;
  confirmPassword: string;
};

export type RegisterStepTwo = {
    zipcode: string;
    city: string;
    state: string;
    neighborhood: string;
    thoroughfare: string;
    addressNumber: string;
    additionalDetails: string;
}
