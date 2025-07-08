import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-other-profile',
  imports: [],
  templateUrl: './other-profile.component.html',
  styleUrl: './other-profile.component.css'
})
export class OtherProfileComponent {
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      const otherId = params['otherId'];
      console.log('otherId:', otherId);
    });
  }
}
