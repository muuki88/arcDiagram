# Arc Diagram

Simple [Arc Diagram](http://www.bewitched.com/song.html) implementation with d3.js

# Usage

```javascript
var data = {
     // the actuel content
     content : 'abc123abc456abc789abc123'.split(''),
        
    // patterns found
    patterns : [ 
        { source: 0, target: 6, length: 3 },
        { source: 6, target: 12, length: 3 },
        { source: 12, target: 18, length: 3 },
        { source: 0, target: 18, length: 6 }
    ]
},
width = 900,
height = 500;
    
var chart = d3.threadarc()
.width(width)
.height(height);
        
d3.select('body')
    .append('svg:svg')
    .attr('width', width)
    .attr('height', height)
    .datum(data)
    .call(chart);

```

# Data

The json object has a simple structure.

`content` field contains an array of string objects, which will
be lined up on the x-Axis

`patterns` field contains an array of objects, which describe a pattern
to be displayed.

`pattern` object contains source and target index (in the content array) and
a length element. The length determines for how much elements the pattern
spans. A length of _3_ means 3 objects in the content array.
