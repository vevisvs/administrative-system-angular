export interface Admin {
  id: number,
  name: string,
  lastname: string,
  email: string,
  password: string,
}

export interface DialogData {
  name: string;
  lastname: string;
  email: string;
  password: string
}

export interface DataEdit{
  id?: number,
  name: string,
  lastname: string,
  email: string,
  password: string
}

export interface AdminLogin{
  id: number,
  name: string,
  lastname: string,
  email: string,
  password: string,
  token: string;
}
