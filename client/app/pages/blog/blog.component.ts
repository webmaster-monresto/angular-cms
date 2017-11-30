import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Blog } from './blog.pagetype';

@Component({
    template: `
    <div class="card">
        <h4 class="card-header">About</h4>
        <div class="card-block">
        <ul>
            <li><b>Author:</b> <a href="https://github.com/DavideViolante" target="_blank">Davide Violante</a></li>
            <li><b>GitHub:</b> <a href="https://github.com/DavideViolante/Angular-Full-Stack" target="_blank">project repository</a></li>
            <li><b>This project uses the MEAN stack:</b></li>
            <ul>
            <li><a href="http://www.mongoosejs.com" target="_blank"><b>M</b>ongoose.js</a> (<a href="https://www.mongodb.com" target="_blank">MongoDB</a>)</li>
            <li><a href="http://www.expressjs.com" target="_blank"><b>E</b>xpress.js</a></li>
            <li><a href="https://www.angular.io" target="_blank"><b>A</b>ngular 2+</a></li>
            <li><a href="https://www.nodejs.org" target="_blank"><b>N</b>ode.js</a></li>
            </ul>
            <li><b>Other tools and technologies used:</b></li>
            <ul>
            <li><a href="https://cli.angular.io" target="_blank">Angular CLI</a></li>
            <li><a href="http://www.getbootstrap.com" target="_blank">Bootstrap</a></li>
            <li><a href="http://www.fontawesome.io" target="_blank">Font Awesome</a></li>
            <li><a href="https://jwt.io" target="_blank">JSON Web Token</a></li>
            <li><a href="https://github.com/auth0/angular2-jwt" target="_blank">Angular 2 JWT</a></li>
            <li><a href="https://github.com/dcodeIO/bcrypt.js" target="_blank">Bcrypt.js</a></li>
            </ul>
        </ul>
        </div>
    </div>
  `
})
export class BlogComponent {
    @Input() blog: Blob;
}