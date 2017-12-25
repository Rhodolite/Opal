//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
//  Boot2_Manifest: Boot - Phase 2 - Load rest of Boot files
//
'use strict'                                                //  Strict mode helps catch JavaScript errors, very useful!


//
//  Load next script:
//      "Gem/Beryl/Boot3_Clarity.js"    - Add `.$who`, and `.$what`, prepare to reload `Gem` (only in clarity mode)
//      "Gem/Beryl/Boot4_Methods.js"    - Initial Methods
//      "Gem/Beryl/Boot5_Module.js"     - Method to define a module
//      "Gem/Beryl/Boot7.js"            - Rest of code under development
//
Gem.Beryl.execute(
    function execute$load_next_scripts() {
        //
        //  Imports
        //
        var clarity = Gem.Configuration.clarity
        var load    = Gem.Script.load


        //
        //  Load "Gem/Beryl/Boot3_Clarity.js" (clarity mode only)
        //
        if (clarity) {
            load('Gem/Beryl/Boot3_Clarity.js')
        }


        //
        //  Load rest of scripts
        //
        var manifest = [
                'Gem/Beryl/Boot4_Methods.js',
                'Gem/Beryl/Boot5_Module.js',
                'Gem/Beryl/Boot7.js'//,
            ]


        for (var i = 0; i < manifest.length; i ++) {
            var name = manifest[i]

            load(name)
        }
    }//,
)


//--------------------------------------------------------+
//  This code is formatted for clarity.                   |
//  Hence this code does not use unnecessary semicolons.  |
//  Reasoning: https://mislav.net/2010/05/semicolons/     |
//--------------------------------------------------------+


//  The full MIT License is available here: https://github.com/Rhodolite/Opal/blob/master/LICENSE
