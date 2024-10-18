// Converted from src/sections/home/home.ctrl.js

import { Component, OnInit } from '@angular/core';
import { PageValues } from 'src/services/page.val';

@Component({
  selector: 'app-home-controller',
  templateUrl: './HomeController-6174dee8b8.component.html',
  styleUrls: ['./HomeController-6174dee8b8.component.css']
})
export class HomeControllerComponent implements OnInit {
  tutorials = [
    {
      title: "INTRODUCTION",
      description: "An introduction to the AngularJS by example application and the tutorial series. All about why this project exists, what the tutorial series is likely to include and who the tutorials are for.",
      link: "http://www.revillweb.com/angularjs-by-example/1-introduction/"
    },
    {
      title: "PROJECT STRUCTURE & MODULARITY",
      description: "Looking at project structure in terms of AngularJS modularity and also how best to lay out your directories to make development a breeze.",
      link: "http://www.revillweb.com/angularjs-by-example/2-project-structure/"
    },
    {
      title: "CONTROLLERS",
      description: "Investigating the different ways you can write AngularJS controllers along with recommended best practices.",
      link: "http://www.revillweb.com/angularjs-by-example/3-controllers/"
    },
    {
      title: "SHARING DATA WITH ANGULARJS SERVICES",
      description: "The fourth part in the AngularJS by Example series showing how to use AngularJS services to consume a third-party API and share data throughout your entire application.",
      link: "http://www.revillweb.com/angularjs-by-example/4-sharing-data-with-angularjs-services/"
    },
    {
      title: "WRITING DIRECTIVES",
      description: "Theories behind directive design and how to best implement them within your application.",
      link: "#"
    },
    {
      title: "BUILD PROCESS",
      description: "So you have an awesome AngularJS app, how do you get it ready for production and deployment? Using Gulp & GitFlow to get the job done.",
      link: "#"
    }
  ];

  constructor(private pageValues: PageValues) {}

  ngOnInit(): void {
    this.pageValues.title = "HOME";
    this.pageValues.description = "Learn AngularJS using best practice real world examples.";
  }
}
