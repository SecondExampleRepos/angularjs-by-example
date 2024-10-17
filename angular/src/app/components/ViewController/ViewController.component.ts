<!-- ViewController.component.html -->
<div class="show-details">
  <div [ngStyle]="setBannerImage()"></div>
  <h1>{{ show.original_name }}</h1>
  <p>{{ show.overview }}</p>
  <ul>
    <li *ngFor="let member of cast">{{ member.name }} as {{ member.character }}</li>
  </ul>
</div>
