var GraphicalEditor = require("../GraphicalEditor.js");

exports.testDrawH = function (test) {
    var ge = new GraphicalEditor();
    
    ge.draw(5, 3);
    ge.drawHLine(1, 3, 2, "C");
    test.equals(ge.show(), '00000\nCCC00\n00000');

    ge.draw(3, 1);
    ge.drawHLine(1, 2, 1, "C");
    test.equals(ge.show(), 'CC0');

    ge.draw(3, 5);
    ge.drawHLine(2, 3, 4, "C");
    test.equals(ge.show(), '000\n000\n000\n0CC\n000');

    ge.draw(4, 2);
    ge.drawHLine(5, 6, 2, "C");
    ge.drawHLine(1, 3, 3, "C");
    test.equals(ge.show(), '0000\n0000');

    test.done();
};
