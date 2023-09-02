import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Users } from '../../models/users';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { InscriptionsActions } from '../../../inscriptions/store/inscriptions.actions';
import { InscriptionComplete } from '../../../inscriptions/models/inscription';
import { selectUserInscriptions } from '../../../inscriptions/store/inscriptions.selectors';


@Component({
  selector: 'app-detail-users',
  templateUrl: './detail-users.component.html',
  styleUrls: ['./detail-users.component.scss'],
})
export class DetailUsersComponent implements OnInit {
  userDetail: Users | undefined;
  userInscriptions: InscriptionComplete[] = [];
  userCourseTitle: string | null;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router,
    private userService: UserService
  ) {
    this.userCourseTitle = null;
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      const idUser = parseInt(userId, 10);
      this.userService.getUserById(idUser).subscribe((u) => {
      this.userDetail = u;
      this.store.dispatch(InscriptionsActions.loadUserInscriptions({ userId: idUser }));
    })
    this.store.select(selectUserInscriptions).subscribe((inscriptions) => {
      this.userInscriptions = inscriptions;
      if (inscriptions.length > 0) {
        const course = inscriptions[0].course;
        if (course) {
          this.userCourseTitle = course.title;
        } else{
          this.userCourseTitle = null;
        }
      } else{
        this.userCourseTitle = null;
      }
    });
  }}

  goBack(): void {
    this.router.navigate(['board/users']);
  }

}
