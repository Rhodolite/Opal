//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License
//  Boot3_StubAnonymousBox: Boot - Phase 3 - Add a stub for AnonymousBox
//
'use strict'                                                //  Strict mode helps catch JavaScript errors, very useful!


Gem.Boot.Core.codify_method(
    Gem.Box,
    'create_AnonymousBox',
    'Stub to create an anonymous box (an object with no `.__proto__`)',
    function codifier$Gem__Box__create_AnonymousBox() {
        //
        //  Imports
        //
        var create_Object = Object.create


        //
        //  Implementation
        //
        return function codifier$Gem__Box__create_AnonymousBox(properties) {
            //  Stub to create an anonymous box (an object with no `.__proto__`).

            return create_Object(null, properties)
        }
    }//,
)


if (Gem.Configuration.unit_test) {
    Gem.Boot.Core.execute(
        function execute$test_AnonymousBox() {
            var module = 'Gem.Beryl.Boot3_StubAnonymousBox'

            //
            //  Imports
            //
            var Gem = window.Gem

            var Box           = Gem.Box
            var Configuration = Gem.Configuration

            var create_AnonymousBox     = Box.create_AnonymousBox
            var own_property_descriptor = Object.getOwnPropertyDescriptor
            var unit_test               = Configuration.unit_test


            //
            //  Implementation
            //
            var anonymous_box = create_AnonymousBox({
                    $what : { enumerable : true, value : 'A test of Gem.Box.create_AnonymousBox()' }//,
                })


            /*verify*/ {
                //  Verify the `.$what` property created is a
                //      1.  non-configurable
                //      2.  visible
                //      3.  constant attribute
                //      4.  with a string value

                var property = own_property_descriptor(anonymous_box, '$what')

                console.assert(
                    property.configurable === false,                                        //  1.  Non Configurable
                    'The `$what` attribute must be non configurable'//,
                )

                console.assert(
                    property.enumerable === true,                                           //  2.  Invisible
                    'The `$what` attribute must be visible (enumerable)'//,
                )

                console.assert(
                    property.writable === false,                                            //  3.  Constant
                    'The `$what` attribute must be constant (not writable)'//,
                )

                console.assert(
                    typeof(property.value) === 'string',                                    //  4.  String value
                    'The `$what` attribute must be a string'//,
                )
            }


            if (unit_test === 7) {
                console.log('%c%s%c: %cAn AnonymousBox%c: %o',
                            'color:green', module, 'color:none',
                            'color:orange', 'color:none',
                            anonymous_box)
            }
        }//,
    )
}


//  The full MIT License is available here: https://github.com/Rhodolite/Opal/blob/master/LICENSE
