//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
//  Boot3_Manifest: Boot - Phase 3 - Load rest of Boot files
//
'use strict'                                                //  Strict mode helps catch JavaScript errors, very useful!


//
//  Load next scripts
//
Gem.Boot.Core.execute(
    function execute$load_next_scripts() {
        //
        //  Imports
        //
        var Gem = window.Gem

        var Node = Gem.Boot

        var Configuration = Gem.Configuration
        var Script        = Node.Script

        var box_name = Configuration.Box.box_name
        var clarity  = Configuration.clarity
        var load     = Script.load
        var trace    = Configuration.trace


        //
        //  Rest of immediate boot code
        //
        var manifest_list = [
//          'js/plugins/Beryl.js',                          0,      //  Already loaded -- Initial script
//          'Gem/Beryl/Boot2_Dynamic.js',                   0,      //  Already loaded -- Allows scripts to be dynamic.
//          'Gem/Beryl/Boot3_Manifest.js',                  0,      //  Already loaded -- This Script

            'Gem/Beryl/Boot4_WhoWhat.js',                   clarity || trace,
            'Gem/Beryl/Boot4_Trace_WhoWhat.js',             trace,

            // Renumber
            'Gem/Beryl/Boot4_Methods.js',                   0,
            'Gem/Beryl/Boot4_Throw.js',                     0,//clarity,
            'Gem/Beryl/Boot4_StubCodifyTracedMethod.js',    0,//trace,
            'Gem/Beryl/Boot4_StubConstructor.js',           0,//box_name,
            'Gem/Beryl/Boot3_TraceConstructor.js',          0,//1,
            'Gem/Beryl/Boot3_StubBox.js',                   0,//1,
            'Gem/Beryl/Boot3_StubAnonymousBox.js',          0,//7,
            'Gem/Beryl/Boot4_StubAttribute.js',             0,

            // Redo
            'Gem/Beryl/Boot3_Attribute.js',         0,
            'Gem/Beryl/Boot4_Trace.js',             0,  //  trace,
            'Gem/Beryl/Boot5_Clarity.js',           0,  //  clarity,
            'Gem/Beryl/Boot6_Methods.js',           0,
            'Gem/Beryl/Boot7_Module.js',            0,
            'Gem/Beryl/Boot8_Bind.js',              0,
            'Gem/Beryl/Boot9_Development.js',       0,
        ]


        for (var i = 0; i < manifest_list.length; i += 2) {
            var manifest = manifest_list[i]
            var use      = manifest_list[i + 1]

            if (use) {
                load(manifest)
            }
        }
    }//,
)


//--------------------------------------------------------+
//  This code is formatted for clarity.                   |
//  Hence this code does not use unnecessary semicolons.  |
//  Reasoning: https://mislav.net/2010/05/semicolons/     |
//--------------------------------------------------------+


//  The full MIT License is available here: https://github.com/Rhodolite/Opal/blob/master/LICENSE
