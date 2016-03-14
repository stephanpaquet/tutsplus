# 2.1 Working with Elements

In some ways, D3 is like many other DOM manipulation libraries: it makes it very simple to work with elements in the DOM. D3 is different in that it allows us to bind data to these elements and use the data itself to manipulate the elements. Before we get to the data, let’s look at the functions we can use to work with DOM elements.

Dans la console de chrome
```javascript
d3
Object {
    version: "3.5.16",
     ascending: function,
      descending: function,
       min: function,
        max: function…}
```

## Quelques fonctions de base
- select()
- selectAll()
- append()
- attr()
- style()
- classed()
- html()
- text()
- insert()
- remove()

### Selection d'un élément dans le DOM
```javascript
d3.select('body');
[Array[1]
    0: body
    length: 1
    parentNode: html
    __proto__: Array[0]]

d3.selectAll('p'); // tout les paragraphe du document    
```

```javascript
var body = d3.select('body');

body
[Array[1]
    0: body
    length: 1
    parentNode: html
    __proto__: Array[0]]

body.selectAll('p');    

// Ajouter un élément a la fin
body.append('H1').text('Hello D3 !');

var h1 =  body.select('h1');

h1.attr('id', 'heading')

h1.attr({id: 'somehing-else', class: 'my-class'});

h1.style({'font-family': 'sans-serif', color: 'blue'})

```

### Toggle de class
```javascript
// ajouter une class
h1.classed("my-second-class", true);

// supprimer une classe
h1.classed("my-class", false);
```

```javascript
h1.html('Hello <span>D3 !</span>');
```

## Insérer avant un certain élément
```javascript
body.insert('p', 'script');
```

### supprimer un élément
```javascript
h1.remove();
```
