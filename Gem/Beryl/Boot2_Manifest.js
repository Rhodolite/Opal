//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
//  Boot2_Manifest: Boot - Phase 2 - Load rest of Boot files
//
'use strict'                                                //  Strict mode helps catch JavaScript errors, very useful!


//
//  Load next scripts:
//      "Gem/Beryl/Boot3_Trace.js"      - Trace functions, methods & bound_methods           (clarity mode only)
//      "Gem/Beryl/Boot4_Clarity.js"    - Add `.$who`, and `.$what`, prepare to reload `Gem` (clarity mode only)
//      "Gem/Beryl/Boot5_Methods.js"    - Initial Methods
//      "Gem/Beryl/Boot6_Module.js"     - Method to define a module
//      "Gem/Beryl/Boot7.js"            - Rest of code under development
//
Gem.Core.execute(
    function execute$load_next_scripts() {
        //
        //  Imports
        //
        var clarity = Gem.Configuration.clarity
        var load    = Gem.Script.load


        //
        //  Clarity mode only: Load:
        //      "Gem/Beryl/Boot3_Trace.js"
        //      "Gem/Beryl/Boot4_Clarity.js"
        //
        if (clarity) {
            load('Gem/Beryl/Boot3_Trace.js')
            load('Gem/Beryl/Boot4_Clarity.js')
        }


        //
        //  Load rest of scripts
        //
        var manifest_list = [
                'Gem/Beryl/Boot5_Methods.js',
                'Gem/Beryl/Boot6_Module.js',
                'Gem/Beryl/Boot7.js'//,
            ]


        for (var i = 0; i < manifest_list.length; i ++) {
            var manifest = manifest_list[i]

            load(manifest)
        }
    }//,
)


//--------------------------------------------------------+
//  This code is formatted for clarity.                   |
//  Hence this code does not use unnecessary semicolons.  |
//  Reasoning: https://mislav.net/2010/05/semicolons/     |
//--------------------------------------------------------+


//  The full MIT License is available here: https://github.com/Rhodolite/Opal/blob/master/LICENSE
