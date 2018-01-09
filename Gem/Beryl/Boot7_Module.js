//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
//  Boot7_Module: Boot - Phase 7 - Add Method to define a module
//
'use strict'                                                //  Strict mode helps catch JavaScript errors, very useful!


//
//  Gem.Boot.Core.module
//      Define a Gem Module.
//
//      The module may be specified as 'dynamic' if it can be reloaded.
//
//      Also in clarity mode adds a `.$who`, and `.$what` to the module.
//
Gem.Boot.Core.codify_method(
    Gem.Boot.Core,
    'module',
    (
          'Define a Gem Module.\n'
        + '\n'
        + "The module may be specified as 'dynamic' if it can be reloaded.\n"
        + '\n'
        + 'Also in clarity mode adds a `.$who`, and `.$what` to the module.'
    ),
    function codifier$Gem__Core__module() {
        //
        //  Imports
        //
        var Gem = window.Gem

        var Configuration = Gem.Configuration
        var Core          = Gem.Boot.Core

        var clarity           = Configuration.clarity
        var constant_property = Core.constant_property
        var define_property   = Object.defineProperty


        //
        //  Implementation: Simple version
        //
        if ( ! clarity) {
            return function Gem__Core__module(who, $what, dynamic) {
                //  Store a global Gem constant.
                //
                //  Ignores the `$what` parameter, which is only used in clarity mode.

                constant_property.value = constant
                define_property(this, who, constant_property)
                delete constant_property.value
            }
        }


        //
        //  Implementation: Clarity version
        //
        var Throw = Gem.Throw

        var identifier_test          = Core.identifier_test
        var throw_must_be_identifier = Throw.throw_must_be_identifier
        var throw_must_be_a_string   = Throw.throw_must_be_a_string
        var throw_type_error         = Throw.throw_type_error
        var throw_wrong_arguments    = Throw.throw_wrong_arguments


        //
        //  Implementation
        //
        return function Gem__Core__module(who, $what, dynamic) {
            //  Store a global Gem constant.
            //
            //  Also in clarity mode adds an explanation of what the constant does.

            /*arguments*/ {
                if (arguments.length !== 3) {
                    throw_wrong_arguments('Gem.Boot.Core.module', 3, arguments.length)
                }

                if ( ! (typeof who === 'string' && identifier_test(who))) {
                    throw_must_be_identifier('$who', who)
                }

                if (typeof $what !== 'string') { throw_must_be_a_string('$what', $what) }

                /*constant*/ {
                    var typeof_constant = typeof constant

                    if (typeof_constant === 'undefined' || typeof_constant === 'function') {
                        throw_type_error(
                                'parameter `constant` must be a value; was instead',
                                constant//,
                            )
                    }
                }
            }

            constant_property.value = constant
            define_property(this, who, constant_property)

            /*clarity*/ {
                constant_property.value = $what
                define_property(this, who + '$', constant_property)
            }

            delete constant_property.value
        }
    }//,
)


//--------------------------------------------------------+
//  This code is formatted for clarity.                   |
//  Hence this code does not use unnecessary semicolons.  |
//  Reasoning: https://mislav.net/2010/05/semicolons/     |
//--------------------------------------------------------+


//  The full MIT License is available here: https://github.com/Rhodolite/Opal/blob/master/LICENSE
