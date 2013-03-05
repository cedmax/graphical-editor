var GraphicalEditor = require("../GraphicalEditor.js");

exports.testFill = function (test) {
    var ge = new GraphicalEditor();
    
    ge.draw(5, 3);
    ge.drawVLine(1, 1, 3, "C");
    ge.colorPixel(4, 2, "F");
    ge.fill(2, 1, "A");

    test.equals(ge.show(), 'CAAAA\nCAAFA\nCAAAA');

    ge.draw(3, 1);
    ge.drawVLine(1, 1, 1, "C");
    ge.colorPixel(1, 3, "F");
    ge.fill(1, 1, "A");
    test.equals(ge.show(), 'A00');

    ge.draw(3, 5);
    ge.drawVLine(2, 1, 4, "C");
    ge.drawHLine(1, 3, 5, "A");
    ge.fill(1, 1, "A");
    test.equals(ge.show(), 'AC0\nAC0\nAC0\nAC0\nAAA');
    
    ge.draw(4, 2);
    ge.drawVLine(4, 2, 3, "C");
    ge.drawVLine(5, 1, 3, "C");
    ge.fill(4,3, "A");
    test.equals(ge.show(), '0000\n0000');

    test.done();
};