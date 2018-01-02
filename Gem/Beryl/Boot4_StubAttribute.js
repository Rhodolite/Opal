//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License
//  Boot4_StubAttribute: Boot - Phase 4 - Add stubs for Attributes
//
'use strict'                                                //  Strict mode helps catch JavaScript errors, very useful!


Gem.Core.codify_method.call(
    Gem.Box,
    'create_InvisibleConstructorAttribute',
    (
            'Stub for a sealed object with a class name of "InvisibleConstructorAttribute" (used for creating an'
          + ' invisible `.constructor` attribute).'
    ),
    function codifier$Gem__Core__create_InvisibleConstructorAttribute() {
        var define_properties = Object.defineProperties
        var seal              = Object.seal


        function InvisibleConstructorAttribute() {
            //  A constructor for nw.js 0.12 so that Developer Tools shows the "class name" of an instance
            //  created using this constructor as "InvisibleConstantAttributeBox".
        }


        return function Gem__Core__create_InvisibleConstructorAttribute(properties) {
            //  Create a sealed object named "InvisibleConstructorAttribute" (used for creating an invisible
            //  `.constructor` attribute.

            return seal(                                            //  #3: Seal
                    define_properties(
                        new InvisibleConstructorAttribute(),        //  #1: Create InvisibleConstructorAttribute
                        properties//,                               //  #2: Define properties
                    )//,
                )
        }
    }
)


if (Gem.Configuration.unit_test) {
    Gem.Core.execute(
        function execute$test_InvisibleConstructorAttribute() {
            var module = 'Gem.Beryl.Boot4_StubAttribute'


            //
            //  Imports
            //
            var Gem = window.Gem

            var Box           = Gem.Box
            var Configuration = Gem.Configuration

            var create_AnonymousBox                  = Box.create_AnonymousBox
            var create_InvisibleConstructorAttribute = Box.create_InvisibleConstructorAttribute
            var own_property_descriptor              = Object.getOwnPropertyDescriptor
            var unit_test                            = Configuration.unit_test


            //
            //  Implementation
            //
            function Test_Of_A_Fake_Invisible_Constructor() {
                //  A constructor for nw.js 0.12 so that Developer Tools shows the "class name" of an instance
                //  created using this constructor as "Test_Of_A_Fake_Invisible_Constructor".
            }


            var invisible_constructor_attribute = create_InvisibleConstructorAttribute({
                    $what : {
                        enumerable : true,
                        value      : 'A test of Gem.Box.create_InvisibleConstructorAttribute()'//,
                    },
                    configurable : { enumerable: true, value : false                      },
                    enumerable   : { enumerable: true, value : false                      },
                    value        : { enumerable: true, value : undefined, writable : true },
                    writeable    : { enumerable: true, value : false                      }//,
                })


            invisible_constructor_attribute.value = Test_Of_A_Fake_Invisible_Constructor


            var test_of_a_fake_invisible_constructor  = create_AnonymousBox({
                    $what       : { enumerable : true, value : 'A test of invisible_constructor_attribute' },
                    constructor : invisible_constructor_attribute//,
                })


            invisible_constructor_attribute.value = undefined


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
                                + ': %cinvisible_constructor_attribute%c: %o'
                                + '; %ctest_of_a_fake_invisible_constructor%c: %o'
                            ),
                            'color:green', module, 'color:none',
                            'color:orange', 'color:none', invisible_constructor_attribute,
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
