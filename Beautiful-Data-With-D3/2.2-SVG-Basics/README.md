# 2.2 SVG Basics
You can do a lot with D3 using regular DOM elements, however it won’t be long before you find that you can make much better visualizations by using SVG elements. SVG is supported in all the latest browsers, and has been for a while in most browsers. You might not be familiar with SVG, so we’re going to check it out in this screencast.

## Related Links
- [Introduction to SVG](https://developer.mozilla.org/en/docs/SVG_In_HTML_Introduction)
- [SVG Elements](https://developer.mozilla.org/en-US/docs/Web/SVG/Element)
- [SVG Attributes](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute)

```javascript
// copier dans la console
var svg = d3.select('svg');

svg.append('circle').attr({
    cx: 250,
    cy: 250,
    r: 200,
    fill: '#123ab34'
});
```
