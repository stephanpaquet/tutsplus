# 2.1 Primitive Data Types
Not everything in JavaScript is an object. In this lesson, you'll learn how JavaScript handles primitive types like integers and booleans.

Primitive types
- Boolean
- String
- Number
- Undefined
- Null
- Symbol (ES 2015)

Si on cré un Primitive object, Javascript va créer un Objet temporaire et le détruira par la suite

```JavaScript
var length  = "Hello".length; // 5
var length2 = new String("hello").length; // 5

typeof "hello";                       // "string"
typeof new String("hello");           // "object" (calling like a construction)
typeof String("hello");               // "string" (calling like a fonction)
typeof new String("hello").valueOf(); // string

"Hello".valueOf(); // "Hello"

typeof 10 // Number
typeof new Number(10); // object
typeof Number(10); // number
typeof new Number(10).valueOf(); // number

```

```JavaScript
var hello = "hello";

hello.foo = "foo";
hello.foo; // undefined (car on part de la primitive)

var num = new Number(10);
var sum = 10 + num; // 20

num.foo = "foo";
num.foo; // "foo" (maintenant on un objet)

var value = new Boolean(false);
value; // Boolean {}
value.valueOf() // false

```
