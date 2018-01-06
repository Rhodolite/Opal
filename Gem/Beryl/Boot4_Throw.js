//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
//  Boot4_Throw: Boot - Phase 4 - Add throw functions (clarity mode only)
//
'use strict'                                                //  Strict mode helps catch JavaScript errors, very useful!


Gem.Script.dynamic = true                                   //  Allow this `<script>` to be reloaded


//
//  The following four methods call each other, hence they have to be defined together in the same closure:
//
//      Gem.Core.throw_must_be_a_number    - Throw a type error when a parameter is not a number.
//      Gem.Core.throw_must_be_a_string    - Throw a type error when a parameter is not a string.
//      Gem.Core.throw_type_error          - Throw a type error (usually ... received invalid parameters).
//      Gem.Core.throw_wrong_arguments     - Throw a type error when a method receives wrong number of arguments.
//
Gem.Core.execute(
    function execute$setup__Gem__throw_methods() {
        //
        //  Imports
        //
        var Error = window.Error


        //
        //  Implementation
        //
        var throw_must_be_number = function Gem__Core__throw_must_be_number(name, v) {
            //  Throw a type error when a parameter is not a number.

            /*arguments*/ {
                if (arguments.length !== 2) {
                    throw_wrong_arguments('Gem.Core.throw_must_be_number', 2, arguments.length)
                }

                if (typeof name !== 'string') { throw_must_be_string('name', name) }
                //  `v` can by any type (though obviously is not a string)
            }

            throw_type_error("parameter `" + name + "` must be a number; was instead", v)
        }


        var throw_must_be_string = function Gem__Core__throw_must_be_string(name, v) {
            //  Throw a type error when a parameter is not a string.

            /*arguments*/ {
                if (arguments.length !== 2) {
                    throw_wrong_arguments('Gem.Core.throw_must_be_string', 2, arguments.length)
                }

                if (typeof name !== 'string') { throw_must_be_string('name', name) }
                //  `v` can by any type (though obviously is not a number)
            }

            throw_type_error("parameter `" + name + "` must be a string; was instead", v)
        }


        var throw_type_error = function Gem__Core__throw_type_error(prefix, v) {
            //  Throw a type error (usually used when a method received invalid parameters).

            /*arguments*/ {
                if (arguments.length !== 2) {
                    throw_wrong_arguments('Gem.Core.throw_type_error', 2, arguments.length)
                }

                if (typeof prefix !== 'string') { throw_must_be_string(prefix, 'prefix') }
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


        var throw_wrong_arguments = function Gem__Core__throw_wrong_arguments(name, actual, expected) {
            //  Throw a type error when a method receives wrong number of arguments.

            /*arguments*/ {
                if (arguments.length !== 3) {
                    throw_wrong_arguments('Gem.Core.throw_wrong_arguments', 3, arguments.length)
                }

                if (typeof name     !== 'string') { throw_must_be_string('name',     name)     }
                if (typeof actual   !== 'number') { throw_must_be_number('actual',   actual)   }
                if (typeof expected !== 'number') { throw_must_be_number('expected', expected) }
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
        //  Gem.Core.throw_must_be_number
        //      Throw a type error when a parameter is not a number.
        //
        Gem.Core.method(
            Gem.Core,
            'throw_must_be_number',
            'Throw a type error when a parameter is not a number.',
            throw_must_be_number//,
        )


        //
        //  Gem.Core.throw_must_be_string
        //      Throw a type error when a parameter is not a string.
        //
        Gem.Core.method(
            Gem.Core,
            'throw_must_be_string',
            'Throw a type error when a parameter is not a string.',
            throw_must_be_string//,
        )


        //
        //  Gem.Core.throw_type_error
        //      Throw a type error (usually used when a method received invalid parameters).
        //
        Gem.Core.method(
            Gem.Core,
            'throw_type_error',
            'Throw a type error (usually used when a method received invalid parameters).',
            throw_type_error//,
        )


        //
        //  Gem.Core.throw_wrong_arguments
        //      Throw a type error when a method receives wrong number of arguments.
        //
        Gem.Core.method(
            Gem.Core,
            'throw_wrong_arguments',
            'Throw a type error when a method receives wrong number of arguments.',
            throw_wrong_arguments//,
        )
    }
)
