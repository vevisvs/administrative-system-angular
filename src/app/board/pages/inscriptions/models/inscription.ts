import { Course } from "../../../../core/services/course.service";
import { Users } from "../../users/models/users";

export interface Inscription{
  id?: string;
  userId: string;
  courseId: string;
}

export interface CreateInscription {
  userId: string;
  courseId: string;
}

export interface InscriptionComplete extends Inscription {
  course: Course;
  user: Users;
}


