# Restricting Directive Usage

An Angular directive can be used in several different ways: as an element, as an attribute, as a class, and even as a comment. We'll look at how to control this behaviour with the restrict property.

## possible restricted values (default EA)
### (E)lement
<heading></heading>

```html
<p heading></p>
```

### (A)ttribute
```html
<p heading></p>
```

### (C)lass
```html
<div class="heading"></div>
```

### co(M)ment (need replace value to be true)
```html
<!-- directive: heading -->
```


