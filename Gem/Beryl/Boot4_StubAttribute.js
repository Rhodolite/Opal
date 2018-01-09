//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License
//  Boot4_StubAttribute: Boot - Phase 4 - Add stubs for Attributes
//
'use strict'                                                //  Strict mode helps catch JavaScript errors, very useful!


Gem.Boot.qualify_constant(
    Gem.Box,
    'invisible_constructor_property',
    'Stub for a property to create an invisible `.constructor` attribute.',
    function qualifier$Gem__Core__invisible_constructor_property() {
        //
        //  Imports
        //
        var Gem = window.Gem

        var Box           = Gem.Box
        var Configuration = Gem.Configuration

        var box_name = Configuration.Box.box_name
        var clarity  = Configuration.clarity
        var seal     = Object.seal

        if (box_name) {
            var define_properties = Object.defineProperties
        } else {
            var create_Object = Object.create
        }


        //
        //  Implementation
        //
        if (box_name) {
            var InvisibleConstructorProperty$Crate = function InvisibleConstructorProperty$Crate() {
                //  A constructor for nw.js 0.12 so that Developer Tools shows the "class name" of an instance
                //  created using this constructor as "InvisibleConstantProperty$Crate".
            }
        }


        function create_InvisibleConstructorProperty$Crate(properties) {
            //  Stub to create a sealed box with a class name of "InvisibleConstructorProperty" (used for creating an'
            //  creating an invisible `.constructor` attribute).

            if (box_name) {
                return seal(                                                //  #3: Seal
                           define_properties(
                               new InvisibleConstructorProperty$Crate(),    //  #1: Create InvisibleConstructor...
                               properties//,                                //  #2: Define properties
                           )//,
                       )
            }

            return seal(create_Object(null, properties))                //  #1: Create object with properties; #2: Seal
        }


        if ( ! clarity) {
            return create_InvisibleConstructorProperty$Crate({
                       value : { enumerable: true, value : undefined, writable : true },
                   })
        }


        //
        //  The three values `configurable`, `enumerable`, and `writable` are set to their default values:
        //
        //      1.  This is unncessary, but makes the unit test code clearer.
        //
        //      2.  Also when examining the result in Developer Tools, it is a lot clearer.
        //
        return create_InvisibleConstructorProperty$Crate({
                $who : {
                    enumerable : true,
                    value      : 'Gem.Box.invisible_constructor_property',
                },

                $what : {
                    enumerable : true,
                    value      : 'Stub for a property to create an invisible `.constructor` attribute.'//,
                },

                configurable : { enumerable: true, value : false                      },    //  Default
                enumerable   : { enumerable: true, value : false                      },    //  Default
                value        : { enumerable: true, value : undefined, writable : true },
                writable     : { enumerable: true, value : false                      },    //  Default

                configurable$ : {
                    enumerable : true,
                    value : '`.configurable = false`: non configurable {default value, but set for clarity}.'//,
                },

                enumerable$ : {
                    enumerable : true,
                    value : (
                                  '`.enumerable = false`: invisible (non enumerable)'
                                + ' {default value, but set for clarity}.'
                            )//,
                },

                value$ : {
                    enumerable : true,

                    value : (
                                  '`.value` is initialized as `undefined`, and is replaced with an actual'
                                + ' constructor when used; and then restored to `undefined`.\n'
                                + '\n'
                                + 'Since `.value` is changed, then it is mutable (i.e.: writable).\n'
                                + '\n'
                                + 'Since `.value` is non-configurable, then it cannot be deleted; hence it is'
                                + ' replaced with `undefined` after being used (important for garbage collection).'
                            )//,
                },

                writable$ : {
                    enumerable : true,
                    value : '`.writable = true`: constant (not writable) {default value, but set for clarity).'//,
                }//,
            })
    }
)


if (Gem.Configuration.unit_test) {
    Gem.Boot.Core.execute(
        function execute$test_InvisibleConstructorProperty() {
            var module = 'Gem.Beryl.Boot4_StubAttribute'


            //
            //  Imports
            //
            var Gem = window.Gem

            var Box           = Gem.Box
            var Configuration = Gem.Configuration

            var create_AnonymousBox            = Box.create_AnonymousBox
            var invisible_constructor_property = Box.invisible_constructor_property
            var own_property_descriptor        = Object.getOwnPropertyDescriptor
            var unit_test                      = Configuration.unit_test


            //
            //  Implementation
            //
            function Test_Of_A_Fake_Invisible_Constructor() {
                //  A constructor for nw.js 0.12 so that Developer Tools shows the "class name" of an instance
                //  created using this constructor as "Test_Of_A_Fake_Invisible_Constructor".
            }


            /*create*/ {
                invisible_constructor_property.value = Test_Of_A_Fake_Invisible_Constructor

                var test_of_a_fake_invisible_constructor = create_AnonymousBox({
                        $what       : { enumerable : true, value : 'A test of invisible_constructor_property' },
                        constructor : invisible_constructor_property//,
                    })

                invisible_constructor_property.value = undefined
            }


            /*verify*/ {
                //  Verify the `.constructor` property created is a
                //      1.  non-configurable
                //      2.  INVISIBLE
                //      3.  constant attribute
                //      4.  with a value of `Test_Of_A_Fake_Invisible_Constructor`.

                var property = own_property_descriptor(test_of_a_fake_invisible_constructor, 'constructor')

                console.assert(
                    property.configurable === false,                                        //  1.  Non Configurable
                    'The `.constructor` attribute must be non configurable'//,
                )

                console.assert(
                    property.enumerable === false,                                          //  2.  Invisible
                    'The `.constructor` attribute must be invisible (not enumerable)'//,
                )

                console.assert(
                    property.writable === false,                                            //  3.  Constant
                    'The `.constructor` attribute must be constant (not writable)'//,
                )

                console.assert(
                    property.value === Test_Of_A_Fake_Invisible_Constructor,                //  4.  Proper value
                    'The `.constructor` attribute must have a value of `Test_Of_A_Fake_Invisible_Constructor`'//,
                )
            }


            if (unit_test === 7) {
                console.log((
                                  '%c%s%c'
                                + ': %cinvisible_constructor_property%c: %o'
                                + '; %ctest_of_a_fake_invisible_constructor%c: %o'
                            ),
                            'color:green', module, 'color:none',
                            'color:orange', 'color:none', invisible_constructor_property,
                            'color:orange', 'color:none', test_of_a_fake_invisible_constructor)
            }
        }//,
    )
}


//--------------------------------------------------------+
//  This code is formatted for clarity.                   |
//  Hence this code does not use unnecessary semicolons.  |
//  Reasoning: https://mislav.net/2010/05/semicolons/     |
//--------------------------------------------------------+


//  The full MIT License is available here: https://github.com/Rhodolite/Opal/blob/master/LICENSE
/*: @plugindesc Boot Engine, Reliable Yet Limber */
