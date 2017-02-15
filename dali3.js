'use strict';

let daliElements = [];

// dynamically add elements to dali array
// addData takes in array of objects and sends them
// one by one to createDali
const addData = function (objs) {
  for ( let i in objs ) {
    let dali = createDali(objs[i]);
    daliElements.push(dali);
  }
}

// create a dali object and push to array
// createDali takes in obj props which contains 1 dali elements
const createDali = function(props) {
  let temp = {},
      elArray = document.querySelectorAll(props.el);
      // elArray pulls all elements from the DOM into an array
  for ( let i = 0; i < elArray.length; i++){
    // for each element in elArray, create a new temporary dali using props[i]
    for( let prop in props ){
      temp[prop] = props[prop]
    }
    // overwrite the 'el' property with the elArray[i] element
    temp.el = elArray[i]

    // send these settings to create a new Dali
    const dali = new Dali(temp);

    return dali
  }
}

// create Dali object
class Dali {
  constructor(props){
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

  addAni() {
    this.el.classList.add(this.ani);
  }

  removeAni() {
    this.el.classList.remove(this.ani);
  }

  addReverse() {
    this.el.classList.add(this.reverse);
  }

  removeReverse(){
    this.el.classList.remove(this.reverse);
  }

  calcTop() {
      return this.el.getBoundingClientRect().top;
  }

  calcLeft() {
      return this.el.getBoundingClientRect().left;
  }

  subscribe() {
      // subscribe to observer
  }

  unscubscribe() {
      // unscubscribe from observer
  }

}











addData([
  {
    el: '#save-a-life',
    ani: 'something',
    reverse: 'slizzurp'
  },
  {
    el: '.why-text',
    ani: 'animation',
    style: {
      transition: '1s linear'
    },
    log: function() {
        console.log(this);
    }
  }
])
