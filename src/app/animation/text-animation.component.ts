import {Component, animate, trigger, state, style, transition} from '@angular/core';

@Component({
    selector: 'text-animation',
    directives:[],
    styles:[`
    
        .label {
            -moz-animation:ease-in 30s infinite;
            -webkit-animation:ease-in 30s infinite;
            animation:ease-in 30s infinite;
        }

        .columns {
            display: flex;
            flex-direction: row;
        }
        .column {
            flex: 1;
            padding: 10px;
        }
        .column p {
            min-height: 6em;
        }
    
    `],
    template: `
        <div class="columns">
            <div class="column" @flyInOut="'in'">
                <h4>Animation example in </h4>
                
            </div>
        </div>

    `,
    animations:[
        trigger('flyInOut', [
    state('in', style({transform: 'translateX(0)'})),
    transition('void => *', [
      style({transform: 'translateX(-100%)'}),
      animate(5000)
    ]),
    transition('* => void', [
      animate(5000, style({transform: 'translateY(100%)'}))
    ])
  ])
    ]
})
export class TextAnimationComponent {

} 
