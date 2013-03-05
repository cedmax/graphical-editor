var GraphicalEditor = require("../GraphicalEditor.js");

exports.testClear = function (test) {
    var ge = new GraphicalEditor();
    
    ge.draw(5, 3);
    ge.colorPixel(3,2, "C");
    ge.clear();
    test.equals(ge.show(), '00000\n00000\n00000');

    ge.draw(3, 1);
    ge.colorPixel(1, 1, "C");
    ge.clear();
    test.equals(ge.show(), '000');

    ge.draw(3, 5);
    ge.colorPixel(2, 4, "C");
    ge.clear();
    test.equals(ge.show(), '000\n000\n000\n000\n000');

    ge.draw(4, 2);
    ge.colorPixel(5, 2, "C");
    ge.clear();
    test.equals(ge.show(), '0000\n0000');

    test.done();
};
