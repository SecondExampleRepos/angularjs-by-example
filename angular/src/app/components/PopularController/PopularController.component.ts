<!-- PopularController.component.html -->
<div class="popular-shows">
  <div *ngFor="let show of shows" class="show-item">
    <h2>{{ show.name }}</h2>
    <!-- Additional show details can be added here -->
  </div>
</div>
