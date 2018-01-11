//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
//  Boot4_Throw: Boot - Phase 4 - Add throw functions (clarity mode only)
//
'use strict'                                                //  Strict mode helps catch JavaScript errors, very useful!

Gem.Boot.Core.execute(
    function execute$setup__Gem__Throw() {
        //
        //  Imports
        //
        var Gem = window.Gem

        var _Boot_Core = Gem.Boot._.Core

        var who_what = _Boot_Core.who_what


        //
        //  Implementation
        //
        if ( ! ('Throw' in Gem)) {
            Gem.Throw = {}
        }


        who_what(Gem.Throw, 'Gem.Throw',   'Exports of the Throw module.', true)
    }//,
)


//
//  The following four methods call each other, hence they have to be defined together in the same closure:
//
//      Gem.Throw.throw_must_be_a_number   - Throw a type error when a parameter is not a number.
//      Gem.Throw.throw_must_be_a_string   - Throw a type error when a parameter is not a string.
//      Gem.Throw.throw_type_error         - Throw a type error (usually ... received invalid parameters).
//      Gem.Throw.throw_wrong_arguments    - Throw a type error when a method receives wrong number of arguments.
//
Gem.Boot.Core.execute(
    function execute$setup__Gem__throw_methods() {
        //
        //  Imports
        //
        var Error = window.Error
        var Gem   = window.Gem

        var Core  = Gem.Boot.Core
        var Throw = Gem.Throw

        var interim_method = Core.interim_method


        //
        //  Implementation
        //
        var throw_must_be_a_number = function Gem__Throw__throw_must_be_a_number(name, v) {
            //  Throw a type error when a parameter is not a number.

            /*arguments*/ {
                if (arguments.length !== 2) {
                    throw_wrong_arguments('Gem.Throw.throw_must_be_a_number', 2, arguments.length)
                }

                if (typeof name !== 'string') { throw_must_be_a_string('name', name) }
                //  `v` can by any type (though obviously it is not a string)
            }

            throw_type_error("parameter `" + name + "` must be a number; was instead", v)
        }


        var throw_must_be_a_string = function Gem__Throw__throw_must_be_a_string(name, v) {
            //  Throw a type error when a parameter is not a string.

            /*arguments*/ {
                if (arguments.length !== 2) {
                    throw_wrong_arguments('Gem.Throw.throw_must_be_a_string', 2, arguments.length)
                }

                if (typeof name !== 'string') { throw_must_be_a_string('name', name) }
                //  `v` can by any type (though obviously it is not a string)
            }

            throw_type_error("parameter `" + name + "` must be a string; was instead", v)
        }


        var throw_type_error = function Gem__Throw__throw_type_error(prefix, v) {
            //  Throw a type error (usually used when a method received invalid parameters).

            /*arguments*/ {
                if (arguments.length !== 2) {
                    throw_wrong_arguments('Gem.Throw.throw_type_error', 2, arguments.length)
                }

                if (typeof prefix !== 'string') { throw_must_be_a_string(prefix, 'prefix') }
                //  `v` handled below
            }

            if (typeof v === 'function') {
                if (v.name.length) {
                    var suffix = " a function named `" + v.name + "`"
                } else {
                    var suffix = ' an unnamed function'
                }
            } else {
                if (typeof v === 'undefined') {
                    var suffix = " `undefined`"
                } else {
                    var suffix = ' the value: ' + v.toString()
                }
            }

            var message = 'TypeError: ' + prefix + suffix

            throw new Error(message)
        }


        var throw_wrong_arguments = function Gem__Throw__throw_wrong_arguments(name, actual, expected) {
            //  Throw a type error when a method receives wrong number of arguments.

            /*arguments*/ {
                if (arguments.length !== 3) {
                    throw_wrong_arguments('Gem.Throw.throw_wrong_arguments', 3, arguments.length)
                }

                if (typeof name     !== 'string') { throw_must_be_a_string('name',     name)     }
                if (typeof actual   !== 'number') { throw_must_be_a_number('actual',   actual)   }
                if (typeof expected !== 'number') { throw_must_be_a_number('expected', expected) }
            }

            if (expected === 0) {
                var takes = 'takes no arguments'
            } else if (expected == 1) {
                var takes = 'takes exactly 1 argument'
            } else {
                var takes = 'takes exactly ' + expected.toString() + ' arguments'
            }

            var message = "TypeError: function `" + name + "` " + takes + ' (' + actual.toString() + ' given)'

            throw new Error(message)
        }


        //
        //  Gem.Throw.throw_must_be_a_number
        //      Throw a type error when a parameter is not a number.
        //
        interim_method(
            Throw,
            'throw_must_be_a_number',
            'Throw a type error when a parameter is not a number.',
            throw_must_be_a_number//,
        )


        //
        //  Gem.Throw.throw_must_be_a_string
        //      Throw a type error when a parameter is not a string.
        //
        interim_method(
            Throw,
            'throw_must_be_a_string',
            'Throw a type error when a parameter is not a string.',
            throw_must_be_a_string//,
        )


        //
        //  Gem.Throw.throw_type_error
        //      Throw a type error (usually used when a method received invalid parameters).
        //
        interim_method(
            Throw,
            'throw_type_error',
            'Throw a type error (usually used when a method received invalid parameters).',
            throw_type_error//,
        )


        //
        //  Gem.Throw.throw_wrong_arguments
        //      Throw a type error when a method receives wrong number of arguments.
        //
        interim_method(
            Throw,
            'throw_wrong_arguments',
            'Throw a type error when a method receives wrong number of arguments.',
            throw_wrong_arguments//,
        )
    }
)


//
//  Gem.Throw.throw_must_be_an_object
//      Throw a type error when a parameter is not an object.
//
Gem.Boot.Core.codify_method(
    Gem.Throw,
    'throw_must_be_an_object',
    'Throw a type error when a parameter is not an object.',
    function codifier$Gem__Throw__throw_must_be_an_object() {
        //
        //  Imports
        //
        var Gem = window.Gem

        var Throw = Gem.Throw

        var throw_wrong_arguments  = Throw.throw_wrong_arguments
        var throw_must_be_a_string = Throw.throw_must_be_a_string
        var throw_type_error        = Throw.throw_type_error


        //
        //  Implementation
        //
        return function Gem__Throw__throw_must_be_an_object(name, v) {
            //  Throw a type error when a parameter is not an object.

            /*arguments*/ {
                if (arguments.length !== 2) {
                    throw_wrong_arguments('Gem.Throw.throw_must_be_an_object', 2, arguments.length)
                }

                if (typeof name !== 'string') { throw_must_be_a_string('name', name) }
                //  `v` can by any type (though obviously it is not an object)
            }

            throw_type_error("parameter `" + name + "` must be a string; was instead", v)
        }
    }//,
)
