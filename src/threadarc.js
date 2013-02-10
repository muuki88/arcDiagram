(function() {

    // Chart design based on the recommendations of Stephen Few. Implementation
    // based on the work of Clint Ivy, Jamie Love, and Jason Davies.
    // http://projects.instantcognition.com/protovis/threadarcchart/
    d3.threadarc = function() {
        var width = 900,
            height = 300;

        // For each small multiple…
        function threadarc(g) {
            var x = d3.scale.linear()
                .domain([ 0, data.content.length ])
                .range([ 0, width ]);

            var svg = d3.select('body')
                .append('svg:svg')
                .attr('width', width)
                .attr('height', height)
                .attr('class', 'threadarc');

            var step = x(1) - x(0);
            var radius = '100,100'; // rx, ry
            // Adding arcs
            svg.selectAll('path')
                .data(data.patterns)
                .enter().append('path')
                .attr('d', function(d) {
                    var offset = (d.length / 2);
                    var p1 = 'M ' + (x(d.x1 + offset)-(step/2)) + ',' + (height - 50);
                    var p2 = ((d.x2 - d.x1) * step) + ',0';
                    var radius = '100,0'; // rx, ry
                    return  p1 + ' a' + radius + ' 0 1 1 ' + p2;
                })
                .transition().duration(1000)
                .attr('d', function(d) {
                    var offset = (d.length / 2);
                    var p1 = 'M ' + (x(d.x1 + offset) - (step / 2)) + ',' + (height - 50);
                    var p2 = ((d.x2 - d.x1) * step) + ',0';
                    return p1 + ' a' + radius + ' 0 1 1 ' + p2; })
                .attr('stroke-width', function(d) { return d.length * step - (step / 1.5);  });

            // Adding text
            svg.selectAll('text')
                .data(data.content)
                .enter().append('text')
                .attr('x', function(d, i) {  return x(i); })
                .attr('y', (height - 25)).text(function(d, i) { return d; });
        }

        // patterns (actual, forecast)
        threadarc.patterns = function(x) {
            if (!arguments.length)
                return patterns;
            patterns = x;
            return threadarc;
        };

        threadarc.width = function(x) {
            if (!arguments.length)
                return width;
            width = x;
            return threadarc;
        };

        threadarc.height = function(x) {
            if (!arguments.length)
                return height;
            height = x;
            return threadarc;
        };

        return threadarc;
    };

})();