'use strict';

let daliElements = [];

// dynamically add elements to dali array
// addData takes in array of objects and sends them
// one by one to createDali
const addData = function( arr ) {
    for ( let obj in arr ) {
        let dali = createDali( arr[obj] );
    }
}

// create a dali object and push to array
// createDali takes in obj props which contains 1 dali elements
const createDali = function( props) {
    let temp = {},
        elArray = document.querySelectorAll( props.el );
    // elArray pulls all elements from the DOM into an array
    for ( let i = 0; i < elArray.length; i++ ) {
        // for each element in elArray, create a new temporary dali using props[i]
        for ( let prop in props ) {
            temp[prop] = props[prop]
        }
        // overwrite the 'el' property with the elArray[i] element
        temp.el = elArray[i]

        // send these settings to create a new Dali
        const dali = new Dali( temp );
        // Push to dali array
        daliElements.push( dali );
    }
}

// create Dali object
class Dali {
    constructor( props ) {
        for ( let prop in props ) {
            this[prop] = props[prop];
        }
        // initialize all style attributes
        // ie: transition, delay, etc
        if ( props.style ) {
            for ( let attr in props.style ) {
                this.el.style[attr] = props.style[attr];
            }
        }
    }

    fire() {
        this.removeAni()
        this.unsubscribe()
    }

    addAni(_this) {
        this.el.classList.add( this.ani );
    }

    removeAni() {
        this.el.classList.remove( this.ani );
    }

    addReverse() {
        this.el.classList.add( this.reverse );
    }

    removeReverse() {
        this.el.classList.remove( this.reverse );
    }

    calcTop() {
        return this.el.getBoundingClientRect().top;
    }

    calcLeft() {
        return this.el.getBoundingClientRect().left;
    }

    getTrigger() {
        return ( window.innerHeight / 2 );
    }

    setTrigger( newTrigger ) {
        this.getTrigger = function() {
            return ( newTrigger );
        }
    }

    subscribe() {
        // subscribe to observer
        observer.watchedElements.push( this )
    }

    unsubscribe() {
        // unscubscribe from observer
        let index = observer.watchedElements.indexOf( this );
        if (index !== -1) {
            observer.watchedElements.splice( index, 1 );
        }
    }
}

class Observer {
    constructor() {
        this.watchedElements = [];
        this.triggerPoint = ( window.innerHeight / 3 ) * 2;
    }

    watch() {
        for ( let i in this.watchedElements ) {
            if ( this.watchedElements[i].calcTop() < this.watchedElements[i].getTrigger() ) {
                this.update( this.watchedElements[i] )
            }
        }
    }

    update( dali ) {
        dali.fire();
    }
}





// INITIALIZE DALI - NEEDS TO BE BROKE OUT INTO INIT FUNCTION


addData([
    {
        el: '.orange-slice-container',
        ani: 'slide-in-right',
        style: {
            transition: '1s ease-in-out'
        }
    }
])

const observer = new Observer();

const subscribeAll = function() {
    for ( let dali in daliElements ) {
        daliElements[dali].subscribe();
        daliElements[dali].el.classList.add(daliElements[dali].ani)
    }
}

subscribeAll();

window.onscroll = function() {
    observer.watch();
}
