//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License
//  Boot3_StubBox: Boot - Phase 3 - Add a stub for `Gem.Box`
//
'use strict'                                                //  Strict mode helps catch JavaScript errors, very useful!


Gem.Core.execute(
    function execute$setup__Gem_Box() {
        //
        //  Imports
        //
        var Gem = window.Gem

        var Configuration = Gem.Configuration

        var clarity  = Configuration.clarity
        var trace    = Configuration.clarity
        var box_name = Configuration.Box.box_name


        //
        //  Implementation
        //
        /*create*/ {
            if (box_name) {
                function ModuleExports$Box() {
                    //  A constructor for nw.js 0.12 so that Developer Tools shows the "class name" of an instance
                    //  created using this constructor as "ModuleExports$Box".
                }

                Gem.Box = new ModuleExports$Box()
            } else {
                //
                //  Imports
                //
                var create_Object = Object.create


                //
                //  Implementation
                //
                Gem.Box = create_Object(null)
            }
        }

        /*clarity*/ {
            if (clarity || trace) {
                //
                //  Imports
                //
                var _Core = Gem._.Core

                var who_what = _Core.who_what

                //
                //  Implementation
                //
                who_what(Gem.Box, 'Gem.Box', 'Exports of the Box module.', true)
            }
        }
    }
)


if (Gem.Configuration.unit_test) {
    Gem.Core.execute(
        function execute$test__Gem__Box() {
            var module = 'Gem.Beryl.Boot3_StubBox'

            //
            //  Imports
            //
            var Gem = window.Gem

            var Configuration = Gem.Configuration

            var unit_test = Configuration.unit_test


            //
            //  Implementation
            //
            /*verify*/ {
                //  `Gem.Box` exists

                console.assert('Box' in Gem, '`Gem.Box` must exist')
            }


            if (unit_test === 7) {
                console.log('%c%s%c: %c`Gem.Box`%c: %o',
                            'color:green', module, 'color:none',
                            'color:DeepPink', 'color:none',
                            Gem.Box)
            }
        }//,
    )
}


//  The full MIT License is available here: https://github.com/Rhodolite/Opal/blob/master/LICENSE
