export interface Admin {
  // id: string,
  name: string,
  lastname: string,
  email: string,
  password: string,
  // token?: string,
  role: string
}

export interface DialogData {
  name: string;
  lastname: string;
  email: string;
  password: string;
  role?: string;
}

export interface DataEdit{
  // id?: string,
  name: string,
  lastname: string,
  email: string,
  password: string,
  // token: string,
  role: string
}

export interface AdminLogin{
  id: string,
  name: string,
  lastname: string,
  email: string,
  password: string,
  token: string,
  role: string
}
