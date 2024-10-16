<!-- Converted from src/sections/premieres/premieres.ctrl.js -->
<div>
  <h1>{{ pageValues.title }}</h1>
  <p>{{ pageValues.description }}</p>
  <ul>
    <li *ngFor="let show of shows">
      {{ show.name }}
    </li>
  </ul>
</div>
