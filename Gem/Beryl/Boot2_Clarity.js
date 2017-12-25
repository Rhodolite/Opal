//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
//  Boot2_Clarity: Boot - Phase 2 - Add Clarity
//
'use strict'                                                //  Strict mode helps catch JavaScript errors, very useful!


//
//  In Gem clarity mode, *every* object created has a `.$who` and `.$what` member to help introspect the object
//  in developer tools:
//
//      This makes it a lot clearer what the object is used for.
//
//      All "clarity" objects begin with `$` (see below for an exeption, when instead `.$$who` or `.$$what` is used to
//      avoid conflicts).
//
//      Also each module appears in `Gem.$.ModuleName`, with each member of that module having a `.$who` & `.$what`
//      members.
//
//      By *every* object this includes all closure objects that are used.  This make it very easy to examine
//      the `.[[Scopes]]` member of a function and introspect the value of each of it's closure objects.
//
//  Minor Exception:
//
//      When an object uses `.$who` or `.$what` members for it's own purposes, then the extra members created
//      are named `.$$who` and `.$$what` to avoid conflicts.
//
Gem.Beryl.execute(
    function execute$Gem__add_clarity() {
        var create_Box = Gem.Beryl.create_Box

        if ( ! ('$' in Gem)) {
            Gem.$ = {                                           //  Map of introspection of all the Gem modules
                $who  : 'Gem.$',
                $what : 'Map of introspection of all the Gem modules.',
                Beryl : {
                    $who  : 'Gem.$.Beryl',
                    $what : 'An introspection of the Beryl module.'//,
                }//,
            }
        }

        Gem.Configuration.$who  = 'Gem.Configuration'
        Gem.Configuration.$what = 'Gem Configuration values'

        Gem.Script.script_map.$who  = 'Gem.Script.script_map'
        Gem.Script.script_map.$what = 'Map of all the scripts loaded (or loading).'

        Gem.Source.$who  = 'Gem.Source'
        Gem.Source.$what = 'A map, for each `<script>` tag, a function from the source file to "hold onto"'
                         + ' to avoid garbage collection of all functions from that source file,'
                         + ' which causes the source file to disappear from the "Sources" tab of Developer Tools'

        Gem._.$who  = 'Gem._'
        Gem._.$what = 'Private members & methods of all Gem modules.'

        Gem._.Beryl.$who  = 'Gem._.Beryl'
        Gem._.Beryl.$what = 'Private members & methods of the Beryl module.'
    }
)


//
//  The following four methods call each other, hence they have to be defined together in the same closure:
//
//      Gem.Beryl.throw_must_be_a_number    - Throw a type error when a parameter is not a number.
//      Gem.Beryl.throw_must_be_a_string    - Throw a type error when a parameter is not a string.
//      Gem.Beryl.throw_type_error          - Throw a type error (usually ... received invalid parameters).
//      Gem.Beryl.throw_wrong_arguments     - Throw a type error when a method receives wrong number of arguments.
//
Gem.Beryl.execute(
    function execute$setup__Gem__throw_methods() {
        var throw_must_be_number = function Gem__Beryl__throw_must_be_number(name, v) {
            //  Throw a type error when a parameter is not a number.

            /*arguments*/ {
                if (arguments.length !== 2) {
                    throw_wrong_arguments('Gem.Beryl.throw_must_be_number', 2, arguments.length)
                }

                if (typeof name !== 'string') { throw_must_be_string('name', name) }
                //  `v` can by any type (though obviously is not a string)
            }

            throw_type_error('parameter `' + name + '` must be a number; was instead', v)
        }


        var throw_must_be_string = function Gem__Beryl__throw_must_be_string(name, v) {
            //  Throw a type error when a parameter is not a string.

            /*arguments*/ {
                if (arguments.length !== 2) {
                    throw_wrong_arguments('Gem.Beryl.throw_must_be_string', 2, arguments.length)
                }

                if (typeof name !== 'string') { throw_must_be_string('name', name) }
                //  `v` can by any type (though obviously is not a number)
            }

            throw_type_error('parameter `' + name + '` must be a string; was instead', v)
        }


        var throw_type_error = function Gem__Beryl__throw_type_error(prefix, v) {
            //  Throw a type error (usually used when a method received invalid parameters).

            /*arguments*/ {
                if (arguments.length !== 2) {
                    throw_wrong_arguments('Gem.Beryl.throw_type_error', 2, arguments.length)
                }

                if (typeof prefix !== 'string') { throw_must_be_string(prefix, 'prefix') }
                //  `v` handled below
            }

            if (typeof v === 'function') {
                if (v.name.length) {
                    var suffix = ' a function named `' + v.name + '`'
                } else {
                    var suffix = ' an unnamed function'
                }
            } else {
                if (typeof v === 'undefined') {
                    var suffix = ' `undefined`'
                } else {
                    var suffix = ' the value: ' + v.toString()
                }
            }

            var message = 'TypeError: ' + prefix + suffix

            throw new Error(message)
        }


        var throw_wrong_arguments = function Gem__Beryl__throw_wrong_arguments(name, actual, expected) {
            //  Throw a type error when a method receives wrong number of arguments.

            /*arguments*/ {
                if (arguments.length !== 3) {
                    throw_wrong_arguments('Gem.Beryl.throw_wrong_arguments', 3, arguments.length)
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

            var message = 'TypeError: function `' + name + '` ' + takes + ' (' + actual.toString() + ' given)'

            throw new Error(message)
        }


        //
        //  Gem.Beryl.throw_must_be_number
        //      Throw a type error when a parameter is not a number.
        //
        Gem.Beryl.method(
            'throw_must_be_number',
            'Throw a type error when a parameter is not a number.',
            throw_must_be_number//,
        )


        //
        //  Gem.Beryl.throw_must_be_string
        //      Throw a type error when a parameter is not a string.
        //
        Gem.Beryl.method(
            'throw_must_be_string',
            'Throw a type error when a parameter is not a string.',
            throw_must_be_string//,
        )


        //
        //  Gem.Beryl.throw_type_error
        //      Throw a type error (usually used when a method received invalid parameters).
        //
        Gem.Beryl.method(
            'throw_type_error',
            'Throw a type error (usually used when a method received invalid parameters).',
            throw_type_error//,
        )


        //
        //  Gem.Beryl.throw_wrong_arguments
        //      Throw a type error when a method receives wrong number of arguments.
        //
        Gem.Beryl.method(
            'throw_wrong_arguments',
            'Throw a type error when a method receives wrong number of arguments.',
            throw_wrong_arguments//,
        )
    }
)


//
//  Push for a later callback, a recodify of:
//      Gem.Script.load
//          Load JavaScript code using a `<script>` tag.
//
Gem.Beryl.execute(
    function execute$push_to_callback_later$recodify$Gem__Script__load() {
        if ( ! ('codify_method_load' in Gem.Script)) {
            //
            //  This file is being reloaded by itself, so there is no `Gem.Script.codify_method_load` since
            //  it was deleted earlier (and has not been recreated by reloading the original file).
            //
            return
        }


        //  Imports
        var clarity_mode$global_variable_Gem_changed = Gem._.Beryl.clarity_mode$global_variable_Gem_changed
        var codify_method_load                       = Gem.Script.codify_method_load


        //
        //  Callback to recodify `Gem.Script.load` (and also delete `Gem.Script.codify_method_load`
        //
        function callback$recodify$Gem__Script__load() {
            codify_method_load()

            //
            //  Delayed deletion (instead of now):
            //      This allows the user to introspect `Gem.Script.codify_method_load` until it is used & deleted.
            //
            //  NOTE:
            //      We have to use the global `Gem` here, as we want to delete it from the currently modified `Gem`.
            //
            delete window.Gem.Script.codify_method_load
        }


        //
        //  Push the callback to be executed when global variable `Gem` is changed.
        //
        clarity_mode$global_variable_Gem_changed.push(callback$recodify$Gem__Script__load)
    }
)


//
//  Load Gem/Beryl/Boot3_Methods.js
//
Gem.Beryl.execute(
    function execute$load_next_script() {
        Gem.Script.load('Gem/Beryl/Boot3_Methods.js')
    }
)


//--------------------------------------------------------+
//  This code is formatted for clarity.                   |
//  Hence this code does not use unnecessary semicolons.  |
//  Reasoning: https://mislav.net/2010/05/semicolons/     |
//--------------------------------------------------------+


//  The full MIT License is available here: https://github.com/Rhodolite/Opal/blob/master/LICENSE
