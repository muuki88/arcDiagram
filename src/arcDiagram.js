/**
 * @see http://www.bewitched.com/song.html
 * @see http://mbostock.github.com/protovis/ex/arc.html
 */

(function() {

    d3.arcDiagram = function() {
        var width = 900,
            height = 300;

        // For each small multiple…
        function arcDiagram(g) {
            g.each(function(d,i) {
                g = d3.select(this)
                    .attr('class', 'arc-diagram');
                var arcHeight = height - 50;
                var x = d3.scale.linear()
                    .domain([ 0, d.content.length ])
                    .range([ 0, width ]);
                var tickWidth = x(1) - x(0);
                
                // Adding arcs
                g.append('g')
                    .selectAll('path')
                    .data(d.patterns)
                    .enter().append('path')
                    .attr('d', function(d) {
                        var p1 = startPoint(d, tickWidth, arcHeight, x);
                        var p2 = endPoint(d, tickWidth, x);
                        var radius = '100,0'; // rx, ry
                        return  p1 + ' a' + radius + ' 0 1 1 ' + p2;
                    })
                    .transition().duration(1000)
                    .attr('d', function(d) {
                        var p1 = startPoint(d, tickWidth, arcHeight, x);
                        var p2 = endPoint(d, tickWidth, x);
                        var rx = ((d.target - d.source) * tickWidth) / 2;
                        var ry = arcHeight - (strokeWidth(d, tickWidth) / 2);
                        ry = rx <= ry ? rx : ry;
                        return p1 + ' a' + rx + ' ' + ry + ' 0 1 1 ' + p2; })
                    .attr('stroke-width', function(d) {return strokeWidth(d, tickWidth); });

                // Adding text
                g.append('g')
                    .selectAll('text')
                    .data(d.content)
                    .enter().append('text')
                    .attr('x', function(d, i) {  return x(i); })
                    .attr('y', (height - 25)).text(function(d, i) { return d; });
            });
        }

        arcDiagram.width = function(x) {
            if (!arguments.length)
                return width;
            width = x;
            return arcDiagram;
        };

        arcDiagram.height = function(x) {
            if (!arguments.length)
                return height;
            height = x;
            return arcDiagram;
        };

        return arcDiagram;
    };
    
    function strokeWidth(d, tickWidth) {
        return (d.length * tickWidth) - (tickWidth / 1.5); 
    }
    
    function startPoint(d, tickWidth, arcHeight, x) {
        // to start at the middle of the element
        var offset = (d.length / 2) - 0.4;
        return 'M ' + (x(d.source + offset)) + ',' + arcHeight;
    }
    
    function endPoint(d, tickWidth, x) {
        return ((d.target - d.source) * tickWidth) + ',0';
    }

})();