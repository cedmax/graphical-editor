var GraphicalEditor = require("../GraphicalEditor.js");

exports.testCreate = function (test) {
    var ge = new GraphicalEditor();
    
    ge.draw(5, 3);
    test.equals(ge.show(), '00000\n00000\n00000');

    ge.draw(3, 1);
    test.equals(ge.show(), '000');

    ge.draw(3, 5);
    test.equals(ge.show(), '000\n000\n000\n000\n000');

    ge.draw(4, 2);
    test.equals(ge.show(), '0000\n0000');

    test.done();
};
