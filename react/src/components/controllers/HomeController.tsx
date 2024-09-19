// Converted from src/sections/home/home.ctrl.js

import React from 'react';
import PageValues from '../../utils/constants/PageValues';

type Tutorial = {
    title: string;
    description: string;
    link: string;
};

const HomeController: React.FC = () => {
    // Set page title and description
    PageValues.title = "HOME";
    PageValues.description = "Learn AngularJS using best practice real world examples.";

    // Setup view model object
    const tutorials: Tutorial[] = [
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

    return (
        <div>
            <h1>{PageValues.title}</h1>
            <p>{PageValues.description}</p>
            <ul>
                {tutorials.map((tutorial, index) => (
                    <li key={index}>
                        <h2>{tutorial.title}</h2>
                        <p>{tutorial.description}</p>
                        <a href={tutorial.link} target="_blank" rel="noopener noreferrer">
                            Read more
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomeController;
