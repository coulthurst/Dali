let Dali = (function() {
    'use strict';

    let daliElements = [];
    // builds an object to be sent to the Dali constructor as props
    // create a dali object and push to daliElements array
    // createDali takes in obj props which contains 1 dali element
    const createDali = function(props) {
        let temp = {},
            elArray = document.querySelectorAll(props.el);
        // elArray pulls all selected elements from the DOM into an array
        for (let i = 0; i < elArray.length; i++) {
            // for each element in elArray, create a new temporary dali using props[i]
            for (let prop in props) {
                temp[prop] = props[prop]
            }
            // overwrite the 'el' property with the elArray[i] element
            temp.el = elArray[i]

            // send these settings to create a new Dali
            const dali = new Dali(temp);
            // Push to dali array

            daliElements.push(dali);
        }
    }

    // create Dali object
    class Dali {
        constructor(props) {
            for (let prop in props) {
                this[prop] = props[prop];
            }
            // initialize all style attributes
            // ie: transition, delay, etc
            if (props.style) {
                for (let attr in props.style) {
                    this.el.style[attr] = props.style[attr];
                }
            }
        }

        fire() {
            let _this = this;

            _this.beforeAni();
            setTimeout(function(){
                _this.afterAni();
            }, _this.getTime());
            _this.addAni();
            _this.unsubscribe();
        }

        beforeAni(){
            // Run this code before addAni() is fired
        }

        addAni() {
            this.el.classList.add(this.ani);
        }

        afterAni() {
            //TODO Finish this block
            // Run this code after addAni() is fired
            // store the transition duration and delay for the element
            let tDuration = this.el.style.transitionDuration,
                tDelay = this.el.style.transitionDelay;

            this.el.style.transitionDuration = 0;
            this.el.style.transitionDelay = 0;

            // turn the transition duration and delay to 0 to prevent lag
            // make necessary style changes, or add classes
            this.removeAni();

            // reset duration and delay to saved variables

            this.el.style.transitionDuration = tDuration;
            this.el.style.transitionDelay = tDelay;
        }

        removeAni() {
            this.el.classList.remove(this.ani);
        }

        addReverse() {
            this.el.classList.add(this.reverse);
        }

        removeReverse() {
            this.el.classList.remove(this.reverse);
        }

        onLoad(onLoadAni, OnLoadUnsubscribe) {
            // TODO create check to see if this should be run on load or not,
            // based off of property set on element.
            if (this.el.onLoadAni){
                this.el.classList.add(onLoadAni);
                if (OnLoadUnsubscribe) {
                    this.unsubscribe();
                }
            }
        }

        calcTop() {
            return this.el.getBoundingClientRect().top;
        }

        calcLeft() {
            return this.el.getBoundingClientRect().left;
        }

        getTrigger() {
            return (window.innerHeight / 2);
        }

        setTrigger(newTrigger) {
            this.getTrigger = function() {
                return (newTrigger);
            }
        }

        getTime() {
            let duration = this.el.style.transitionDuration,
                splitString = duration.split(''),
                time;

            for (let i = 0; i < splitString.length; i++){
                if( splitString[i] == 's' ) {
                    let index = splitString.indexOf(splitString[i]);
                    if (index !== -1) {
                        splitString.splice(index, 1);
                    }
                }
            }

            time = splitString.join('') * 1000;
            return time
        }

        subscribe() {
            // subscribe to observer
            observer.watchedElements.push(this)
        }

        unsubscribe() {
            // unscubscribe from observer
            let index = observer.watchedElements.indexOf(this);
            if (index !== -1) {
                observer.watchedElements.splice(index, 1);
            }
        }
    }

    class Observer {
        constructor() {
            this.watchedElements = [];
        }
        init() {
            let _this = this;
            window.onscroll = function() {
                _this.watch();
            }
        }
        watch() {
            for (let i in this.watchedElements) {
                if (this.watchedElements[i].calcTop() < this.watchedElements[i].getTrigger()) {
                    this.update(this.watchedElements[i])
                }
            }
        }
        pause() {
            this.watch = '';
        }
        resume() {
            this.watch = function() {
                for (let i in this.watchedElements) {
                    if (this.watchedElements[i].calcTop() < this.watchedElements[i].getTrigger()) {
                        this.update(this.watchedElements[i])
                    }
                }
            }
        }
        update(dali) {
            dali.fire();
        }
    }
    const observer = new Observer();


    return {
        daliElements: daliElements,
        init: function() {
            this.addData(daliData.dalis);
            this.subscribeAll();
            observer.init();
        },
        addData: function(arr) {
            for (let obj in arr) {
                let dali = createDali(arr[obj]);
            }
        },
        subscribeAll: function() {
            for (let dali in daliElements) {
                daliElements[dali].subscribe();
            }
        },
        unsubscribeAll: function() {
            for (let dali in daliElements) {
                daliElements[dali].unsubscribe();
            }
        },
        subscribe: function(dali) {
            daliElements[dali].subscribe();
        },
        unsubscribe: function(dali){
            daliElements[dali].unsubscribe();
        },
        pause: function() {
            observer.pause();
        },
        resume: function() {
            observer.resume();
        }
    }


})();

Dali.init({
    dalis: [{
        el: '',
        ani: '',
        style: {
            transition: '1s ease-in-out'
        }
    }]
})
