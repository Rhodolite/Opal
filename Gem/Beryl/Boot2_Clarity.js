//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
//  Boot2_Clarity: Boot - Phase 2 - Add Clarity
//
'use strict'                                                //  Strict mode helps catch JavaScript errors, very useful!


Gem.Beryl.execute(
    function execute$Gem__clear__and__log_Gem() {
        Gem.NodeWebKit.show_developer_tools()
        //console.clear()
        console.log('%o', Gem)
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
if (Gem.Configuration.clarity) {
    Gem.Beryl.execute(
        function execute$setup__Gem__throw_methods() {
            var throw_must_be_number = function Gem__Beryl__throw_must_be_number(name, v) {
                //  Throw a type error when a parameter is not a number.

                if (7) {
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

                if (7) {
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

                if (7) {
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

                if (7) {
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
}


//
//  Gem.Beryl.constant
//      Store a global Gem constant.
//
//      Also in clarity mode adds an explanation of what the constant does.
//
Gem.Beryl.codify_method(
    'constant',
    (
          'Store a global Gem constant.\n'
        + '\n'
        + 'Also in clarity mode adds an explanation of what the variable does.'
    ),
    function codifier$Gem__Beryl__constant() {
        //
        //  Imports
        //
        var simple          = ( ! Gem.Configuration.clarity)
        var define_property = Object.defineProperty


        //
        //  Implementation: Simple version
        //
        if (simple) {
            return function Gem__Beryl__constant(who, $what, constant) {
                //  Store a global Gem constant.
                //
                //  Ignores the `$what` parameter, which is only used in clarity mode.

                visible_constant_attribute.value = constant
                define_property(this, who, visible_constant_attribute)
                delete visible_constant_attribute.value
            }
        }


        //
        //  Implementation: Clarity version
        //
        var throw_wrong_arguments      = Gem.Beryl.throw_wrong_arguments
        var throw_type_error           = Gem.Beryl.throw_type_error
        var visible_constant_attribute = Gem.Beryl.visible_constant_attribute


        //
        //  Implementation
        //
        return function Gem__Beryl__constant(who, $what, constant) {
            //  Store a global Gem constant.
            //
            //  Also in clarity mode adds an explanation of what the constant does.

            if (arguments.length !== 3) {
                throw_wrong_arguments('Gem.Beryl.constant', 3, arguments.length)
            }

            if (typeof constant === 'undefined' || typeof constant === 'function') {
                throw_type_error(
                        'parameter `constant` must be a value; was instead',
                        constant//,
                    )
            }

            visible_constant_attribute.value = constant
            define_property(this, who, visible_constant_attribute)

            if (7) {
                visible_constant_attribute.value = $what
                define_property(this, who + '$', visible_constant_attribute)
            }

            delete visible_constant_attribute.value
        }
    }//,
)


//  
//  Gem.Beryl.qualify_constant
//      Qualify a global Gem constant.
//
//      The `qualifier` argument is a function that returns the value of the constant.
//
//      Also in clarity mode adds an explanation of what the variable does.
//
Gem.Beryl.codify_method(
    'qualify_constant',
    (
          'Qualify a global Gem constant.\n'
        + '\n'
        + 'The `qualifier` argument is a function that returns the value of the constant.'
        + '\n'
        + 'Also in clarity mode adds an explanation of what the constant does.'
    ),
    function codifier$Gem__Beryl__qualify_constant() {
        //
        //  Imports
        //
        var simple                     = ( ! Gem.Configuration.clarity)
        var define_property            = Object.defineProperty
        var visible_constant_attribute = Gem.Beryl.visible_constant_attribute


        //
        //  Implementation: Simple version
        //
        if (simple) {
            return function Gem__Beryl__qualify_constant(who, $what, qualifier) {
                //  Qualify a global Gem constant.
                //
                //  The `qualifier` argument is a function that returns the value of the constant.
                //
                //  Ignores the `$what` parameter, which is only used in clarity mode.

                visible_constant_attribute.value = qualifier()
                define_property(this, who, visible_constant_attribute)
                delete visible_constant_attribute.value
            }
        }


        //
        //  Implementation: Clarity version
        //
        var throw_wrong_arguments = Gem.Beryl.throw_wrong_arguments
        var throw_type_error      = Gem.Beryl.throw_type_error


        return function Gem__Beryl__qualify_constant(who, $what, qualifier) {
            //  Qualify a global Gem variable.
            //
            //  The `qualifier` argument is a function that returns the value of the constant.
            //
            //  Also in clarity mode adds an explanation of what the variable does.

            if (arguments.length !== 3) {
                throw_wrong_arguments('Gem.Beryl.qualify_constant', 3, arguments.length)
            }

            var middle         = this.$who.replace('.', '__')
            var qualifier_name = 'qualifier$' + middle + '__' + who

            if (typeof qualifier !== 'function' || qualifier_name !== qualifier.name) {
                throw_type_error(
                        (
                              'qualifier must be a function named `' + qualifier_name + '`'
                            + '; was instead'
                        ),
                        qualifier//,
                    )
            }

            var constant = qualifier()

            if (typeof constant === 'undefined' || typeof constant === 'function') {
                throw_type_error(
                        (
                              'qualifier `' + qualifier_name + '` did not return a constant'
                            + '; instead returned'
                        ),
                        value//,
                    )
            }

            visible_constant_attribute.value = constant
            define_property(this, who, visible_constant_attribute)

            if (7) {
                visible_constant_attribute.value = $what
                define_property(this, who + '$', visible_constant_attribute)
            }

            delete visible_constant_attribute.value
        }
    }
)


//
//  Push for a later callback, a recodify of:
//      Gem.Script.load
//          Load JavaScript code using a `<script>` tag.
//
Gem.Beryl.execute(
    function execute$push_to_execute_later$recodify$Gem__Script__load() {
        debugger

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
//  Load Gem/Beryl/Boot.js
//
Gem.Beryl.execute(
    function execute$load_next_script() {
        Gem.Script.load('Gem/Beryl/Boot.js')
    }
)


//--------------------------------------------------------+
//  This code is formatted for clarity.                   |
//  Hence this code does not use unnecessary semicolons.  |
//  Reasoning: https://mislav.net/2010/05/semicolons/     |
//--------------------------------------------------------+


//  The full MIT License is available here: https://github.com/Rhodolite/Opal/blob/master/LICENSE
