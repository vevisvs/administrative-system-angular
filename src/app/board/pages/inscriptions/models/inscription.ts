import { Course } from "../../courses/models/course";
import { Users } from "../../users/models/users";

export interface Inscription{
  id: number;
  userId: number;
  courseId: number;
}

export interface CreateInscription {
  userId: number | null;
  courseId: number | null;
}

export interface InscriptionComplete extends Inscription {
  course: Course;
  user: Users;
}

// export interface userInscription {

// }
