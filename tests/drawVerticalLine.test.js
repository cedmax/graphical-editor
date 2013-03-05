var GraphicalEditor = require("../GraphicalEditor.js");

exports.testDrawV = function (test) {
    var ge = new GraphicalEditor();
    
    ge.draw(5, 3);
    ge.drawVLine(1, 1, 3, "C");
    test.equals(ge.show(), 'C0000\nC0000\nC0000');

    ge.draw(3, 1);
    ge.drawVLine(1, 1, 1, "C");
    test.equals(ge.show(), 'C00');

    ge.draw(3, 5);
    ge.drawVLine(2, 3, 4, "C");
    test.equals(ge.show(), '000\n000\n0C0\n0C0\n000');

    ge.draw(4, 2);
    ge.drawVLine(4, 2, 3, "C");
    ge.drawVLine(5, 1, 3, "C");
    test.equals(ge.show(), '0000\n0000');

    test.done();
};
