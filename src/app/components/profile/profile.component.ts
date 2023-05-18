import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit {
  updateProfileForm!: FormGroup
  userProfile!: User

  constructor(
    private fb: FormBuilder,
    private profileSvc: ProfileService) { }

  ngOnInit(): void {
    this.updateProfileForm = this.fb.group({
      email: this.fb.control<string>("", [Validators.required]),
      givenname: this.fb.control<string>("", [Validators.required]),
      familyname: this.fb.control<string>("", [Validators.required]),
      schedule: this.fb.control<number | null>(null, [Validators.required]),
    })
  }
  ngAfterViewInit(): void {
    // Get user details
    this.profileSvc.getProfile()
      .then((response) => {
        this.userProfile = response;
        this.updateProfileForm.patchValue({
          email: this.userProfile.email
        });
      })
      .catch((error) => {
        console.error('Error retrieving user profile:', error);
      });
  }



  update() {

  }
}
