var GraphicalEditor = require("./GraphicalEditor.js");
var prompt = require('prompt');
var log = console.log;

(function(){
    "use strict";
    
    var ge;
    var Interface = {
        "I": {
            adapter: function(cmds){
                ge = new GraphicalEditor();

                var params = [];
                params.push(parseInt(cmds[0], 10));
                params.push(parseInt(cmds[1], 10));
              
                ge.draw.apply(ge, params);
            },
            docs: ["I M N.","Create a new M x N image with all pixels coloured white (O). => I 4 4"],
            params: 2
        },
        "L": {
            adapter: function(cmds){
                var params = [];
                params.push(parseInt(cmds[0], 10));
                params.push(parseInt(cmds[1], 10));
                params.push(cmds[2]);

                ge.colorPixel.apply(ge, params);
            },
            docs: ["L X Y C." , "Colours the pixel (X,Y) with colour C. => L 2 3 A"],
            params: 3
        },
        "C": {
            adapter: function(cmds){
                ge.clear();
            },
            docs: ["C.","Clears the table, setting all pixels to white (O). => C"],
            params: 0
        },
        "V": {
            adapter: function(cmds){
                var params = [];
                params.push(parseInt(cmds[0], 10));
                params.push(parseInt(cmds[1], 10));
                params.push(parseInt(cmds[2], 10));
                params.push(cmds[3]);

                ge.drawVLine.apply(ge, params);
            },
            docs: ["V X Y1 Y2 C.","Draw a vertical segment of colour C in column X between rows Y1 and Y2 (inclusive) => V 1 2 4 A"],
            params: 4
        },
        "H": {
            adapter: function(cmds){
                var params = [];
                params.push(parseInt(cmds[0], 10));
                params.push(parseInt(cmds[1], 10));
                params.push(parseInt(cmds[2], 10));
                params.push(cmds[3]);

                ge.drawHLine.apply(ge, params);
            },
            docs: ["H X1 X2 Y C.","Draw a horizontal segment of colour C in row Y between columns X1 and X2 (inclusive) => H 1 3 1 A"],
            params: 4
        },
        "F": {
            adapter: function(cmds){
                var params = [];
                params.push(parseInt(cmds[0], 10));
                params.push(parseInt(cmds[1], 10));
                params.push(cmds[2]);

                ge.fill.apply(ge, params);
            },
            docs: [
                "F X Y C.",
                "Fill the region R with the colour C. R is defined as: Pixel (X,Y) belongs to R.",
                "Any other pixel which is the same colour as (X,Y) and shares a common side with any pixel in R also belongs to this region. => F 1 2 A"
            ],
            params: 3
        },
        "S": {
            adapter: function(cmds){
                log(ge.show());
            },
            docs: ["S.","Show the contents of the current image"],
            params: 0
        },
        "X": {
            adapter: function(cmds){
                process.exit();
            },
            docs: ["X.", "Terminate the session"],
            params:0
        }
    };

    var getDoc = function(cmd){
        return ("check your input:\n" + Interface[cmd].docs.join("\n     "));
    };

    var getDocs = function(){
        log("Use one of the following commands:");
        for (var key in Interface){
            if (Interface.hasOwnProperty(key)){
                log(key + " -> " + Interface[key].docs.join("\n     "));
            }
        }
    };

    var checkParams = function(cmd, cmds, expected){
        if (cmds.length!==expected){
            log(getDoc(cmd));
            return false;
        }
        return true;
    };
    

    prompt.start();

    var promptGet = function(){
        prompt.get("command", function (err, result) {
            if (err) { return onErr(err); }
            var cmds = result.command.split(" ");
            var cmd = cmds.splice(0,1)[0];

            if (!Interface[cmd]){
                getDocs();
            } else if (!(ge) && cmd!=="I") {
                log("You should first draw your image:\n " + getDoc("I"));

            } else if ((cmd && checkParams(cmd, cmds, Interface[cmd].params))){
                Interface[cmd].adapter(cmds);
            }

            promptGet();
        });
    };

    promptGet();

    function onErr(err) {
        log(err);
    }

})();
