/**
 * Created by azu on 2014/09/17.
 * LICENSE : MIT
 */
"use strict";
var gui = require('nw.gui');
var win = gui.Window.get();
if (process.platform == 'darwin') {
    var mb = new gui.Menu({type: "menubar"});
    mb.createMacBuiltin("");
    win.menu = mb;
}