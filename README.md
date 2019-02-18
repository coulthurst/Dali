# Dali
Dali is used to simplify and automate animations based on scroll location.

## Usage

```javascript
Dali.init({
    dalis: [{
        el: '.card',
        ani: 'fade-in',
        style: {
            transition: '1s ease-in-out'
        }
    }]
})
```

Additionally, you can overwrite any of the default properties of a dali object by adding them at the time of init.
```javascript
Dali.init({
    dalis: [{
        el: '.card',
        ani: 'fade-in',
        style: {
            transition: '1s ease-in-out'
        },
        getTrigger: function() {
          return (window.innerheight) / 3)
        }
    }]
})
```
