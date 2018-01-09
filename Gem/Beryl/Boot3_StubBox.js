//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License
//  Boot3_StubBox: Boot - Phase 3 - Add a stub for `Gem.Box`
//
'use strict'                                                //  Strict mode helps catch JavaScript errors, very useful!


Gem.Boot.Core.execute(
    function execute$setup__Gem_Box() {
        //
        //  Imports
        //
        var Gem = window.Gem

        var Configuration = Gem.Configuration
        var Trace         = Gem.Trace

        var clarity       = Configuration.clarity
        var trace         = Configuration.trace
        var box_name      = Configuration.Box.box_name
        var wrap_function = Trace.wrap_function

        if (clarity || trace) {
            var _Core = Gem._.Core

            var who_what = _Core.who_what
        }


        //
        //  Implementation
        //
        if (box_name) {
            //
            //  Imports
            //
            var wrap_constructor = Trace.wrap_constructor


            //
            //  Implementation
            //
            var ModuleExports$Box = wrap_constructor(
                    function ModuleExports$Box() {
                        //  A constructor for nw.js 0.12 so that Developer Tools shows the "class name" of an instance
                        //  created using this constructor as "ModuleExports$Box".
                    }//,
                )

            var create_ModuleExports$Box = function Gem__Box__create_ModuleExports$Box($who, $what) {
                //  Stub to create a box named "ModuleExports" to be used for the exports of a module.

                var result = new ModuleExports$Box()

                if (clarity || trace) {
                    who_what(result, $who, $what)
                }

                return result
            }
        } else {
            //
            //  Imports
            //
            var create_Object = Object.create


            //
            //  Implementation
            //
            var create_ModuleExports$Box = function Gem__Box__create_ModuleExports$Box($who, $what) {
                //  Stub to create an anonymous box to be used for the exports of a module.
                //
                //  NOTE:
                //      If `Gem.Configuration.Box.box_name` is set to `true` then the box created would have a
                //      "name" of `ModuleExports$Box" in Developer Tools.

                var result = create_Object(null)

                if (clarity || trace) {
                    who_what(result, $who, $what)
                }

                return result
            }
        }


        var wrapped$create_ModuleExports$Box = wrap_function(
                create_ModuleExports$Box,
                'Gem.Box.create_ModuleExports$Box'
            )

        Gem.Box = wrapped$create_ModuleExports$Box('Gem.Box', 'Exports of the Box module.', true)

        Gem.Boot.Core.method(
            Gem.Box,
            'create_ModuleExports$Box',
            (
                box_name
                    ? 'Stub to create a box named "ModuleExports" to be used for the exports of a module.'
                    : (
                            'Stub to create an anonymous box to be used for the exports of a module.\n'
                          + '\n'
                          + 'NOTE:\n'
                          + '    If `Gem.Configuration.Box.box_name` is set to `true` then the box created would have'
                          + ' a "name" of `ModuleExports$Box" in Developer Tools.'
                      )
            ),
            create_ModuleExports$Box//,
        )
    }
)


if (Gem.Configuration.unit_test) {
    Gem.Boot.Core.execute(
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
