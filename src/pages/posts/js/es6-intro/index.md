## Intro

"Ouais mais javascript ça a été développé en 10 jours aussi". Bah justement, depuis ces 10 jours en 1995, il s'en est passé du temps et des gens pas trop bêtes réfléchissent et travaillent à comment faire évoluer le langage, et en bien. Et actuellement, on arrive doucement sur la version 6 d'ECMAScript qui standardise les comportements de notre langage préféré (mais si, mais si).

Cet article aura pour but de vous présenter les différentes nouvelles fonctionnalités du langage, mais aussi de vous les faire comprendre. Pas de période de chauffe ou d'intro trop longue vu que vous allez bookmarker cet article et souvent y revenir dans les prochaines semaines pour vous habituer au turfu du dev js, on rentre direct dans le vif du sujet.

## Sommaire

* [Variables](#variables)
* [Fonctions](#fonctions)

## Variables
### let, const

ES6 introduit 2 nouvelles manières de déclarer vos variables: `const`, qui permet de déclarer des constantes block scopées et `let`, qui est l'équivalent de `var`, mais version block scopée.
```javascript
function fn() {
  let foo = true
  if(true) {
    const foo = "bar"
    console.log(foo) // "bar"
  }
  console.log(foo) // true
  return foo
}
```

### Utilisations, erreurs et pièges

Simplement : utilisez `const` quasiment tout le temps, `let` quand vous êtes obligés, et `var` quand vous savez exactement pourquoi vous en avez besoin. ES5 nous a donné de mauvaises habitudes et ne nous forçait pas à rélféchir à nos déclarations de variables, changeons ça de suite.

Pour ce qui est des différents types d'erreurs possibles :
* `const` doit être initialisé avec une valeur (tout simplement, vous devez avoir un signe = après le nom de la variable déclarée avec const)
* une `const` ne peut pas être réassignée
* déclarer 2 fois une variable avec let dans un même scope lève une TypeError, mais pas dans le corps d'une fonction
* let et const ne sont pas [hoistés](#hoisting,-tdz)

```javascript
let foo
let foo // TODO TypeError, la variable "foo" a déjà été déclarée  

function fn() {
  let foo = true
  if(true) {
    const foo // SyntaxError, const a besoin d'une valeur d'initialisation
    const foo = "bar"
    foo = "baz" // SyntaxError, foo est une const, en lecture seule
    let baz
  }
  console.log(baz) // ReferenceError, baz n'existe pas dans ce scope
  let foo = false // TODO Je ne crois pas que ça lève d'erreur dans le body d'une fonction, à vérifier
}
```

### Hoisting, TDZ

Pour rappel, javascript possède un mécanisme de hoisting, par exemple, vous pouvez écrire :

```javascript
function fn() {
  console.log(foo) // "bar"
  var foo = "bar"
}
```

Concrètement, le moteur d'exécution javascript va lire toutes les déclarations et remonter les déclarations avec `var` au début du scope de votre fonction.

`let` et `const` ne bénéficient pas de ce mécanisme de hoisting, ce qui peut mener à des problèmes de TDZ (Temporal Dead Zone). Vu que la déclaration de votre variable n'est pas remontée au scope de la fonction, il existe un moment où votre variable n'existe pas, ce moment, c'est la TDZ.

```javascript
function fn() {
  console.log(foo) // ReferenceError, on est dans la TDZ pour la variable foo
  let foo = "bar"
}
```


## Fonctions
### Genérateurs
### Tail-call

## Objets
### Types
#### Map
#### Weakmap
#### Set
#### WeakSet
### Proxies
### Réflection
### Object.assign / Ajout défault proto

## Strings
### Templates
### Multiline

### Unicode

## Classes
### Syntaxes
### Héritage

## Modules

## Destructuring, Spread, Default

## Symboles
### for or

## Nombres
### Nouveautés
Number.EPSILON
Number.isInteger()
### Octal, Binaire

## Promesses
