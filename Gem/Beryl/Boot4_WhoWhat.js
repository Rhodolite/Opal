// //  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
//  Boot4_WhoWhat: Boot - Phase 4 - Add `.$who` and `.$what` to `Gem` (and nested objects).
//
'use strict'                                                //  Strict mode helps catch JavaScript errors, very useful!


//Gem.Configuration.trace = 7
Gem.Script.dynamic      = true


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
Gem.Boot.Core.execute(
    function execute$add_clarity() {
        //
        //  Imports
        //
        var Gem     = window.Gem
        var Pattern = window.RegExp

        var Node = Gem.Boot

        var Box           = Node.Box
        var Configuration = Gem.Configuration
        var Gem_Script    = Gem.Script
        var Trace         = Node.Trace

        var clarity = Configuration.clarity
        var cocoon  = Trace.cocoon
        var dynamic = Gem_Script.dynamic
        var trace   = Configuration.trace


        if (clarity) {
            var define_properties = Object.defineProperties
        }

        if ( ! clarity || trace) {
            var define_property = Object.defineProperty
        }

        if (trace) {
            var _Trace  = Node._.Trace
            var Tracing = Node.Tracing

            var function_call  = _Trace.function_call
            var procedure_done = _Trace.procedure_done
        }

        if (clarity && trace) {
            var interim_constant_attribute = Box.interim_constant_attribute
            var trace_attribute            = _Trace.trace_attribute
        }


        //
        //  Closures
        //
        var dot__pattern = new Pattern('\\.', 'g')

        if (dynamic || trace) {
            var interim_property_$who = {
                $who         : 'interim_property_$who',
                $what        : "`interim_property_$who` is used to create an interim `.$who` attribute",
                configurable : true,                            //  Interim (i.e.: configurable)
                enumerable   : true,
                writable     : false,                           //  Default value, shown for clarity
                value        : undefined//,
            }
        }

        if (dynamic) {
            var duration_property_$who = interim_property_$who
        } else {
            var duration_property_$who = Box.property_$who
        }


        if (clarity) {
            if (dynamic) {
                var duration_property_$what = {
                    $who         : 'duration_property_$what',
                    $what        : "`duration_property_$what` is used to create an interim `.$what` attribute",
                    configurable : true,                            //  Interim (i.e.: configurable)
                    enumerable   : true,
                    writable     : false,                           //  Default value, shown for clarity
                    value        : undefined//,
                }

                var duration_property___prefix = {                  //  3 Underscores
                    $who         : 'duration_property___prefix',
                    $what        : "`duration_property___prefix` is used to create an interim `._prefix` attribute",
                    configurable : true,                            //  Interim (i.e.: configurable)
                    enumerable   : true,
                    writable     : false,                           //  Default value, shown for clarity
                    value        : undefined//,
                }

                var duration_module_properties = {
                    '$who'    : duration_property_$who,
                    '$what'   : duration_property_$what,
                    '_prefix' : duration_property_$what//,
                }

                var duration_$who_$what_properties = {
                    '$who'    : duration_property_$who,
                    '$what'   : duration_property_$what,
                }

                var keyword_constant           = 'interim constant'
                var keyword_invisible_constant = 'invisible interim constant'
            } else {
                var duration_property_$what    = Box.property_$what
                var duration_property___prefix = Box.property___prefix

                var duration_module_properties     = Box.module_properties
                var duration_$who_$what_properties = Box.duration_$who_$what_properties

                var keyword_constant           = 'constant'
                var keyword_invisible_constant = 'invisible constant'
            }
        }


        //
        //  who_what
        //      Set the `.$who`, `.$what`, & `._prefix' of a Gem Modules.
        //
        //      This second implementation of `who_what` has the following additional two features:
        //
        //          1.  Allows replacing multiple '.' with '__'
        //          2.  Pays attention to `Gem.Script.dynamic` to create interim constants.
        //
        var who_what = cocoon(
            function who_what(module, $who, $what, create_prefix) {
                //      Set the `.$who`, `.$what`, & `._prefix' of a Gem Modules.
                //
                //      This second implementation of `who_what` has the following additional two features:
                //
                //          1.  Allows replacing multiple '.' with '__'
                //          2.  Pays attention to `Gem.Script.dynamic` to create interim constants.
                var trace = Configuration.trace             //  Get newest value of 'trace'

                var tracing_self = (trace === 7 || (trace && Tracing.who_what))

                if (tracing_self) {
                    if (tracing_self === 2) {
                        Configuration.trace = 7                     //  Nested trace
                    }

                    //
                    //  Must set `module.$who` temporarly before calling `function_call`
                    //      (Reset below to an [interim or permenant] constant)
                    //
                    /*=*/ {
                        //  interim constant module.$who = $who
                        interim_property_$who.value = $who
                        define_property(module, '$who', interim_property_$who)
                        interim_property_$who.value = undefined
                    }

                    function_call(who_what, arguments)
                }

                if (clarity) {
                    if (create_prefix) {
                        if ($who.startsWith('Gem.Boot._.')) {
                            var _prefix = $who.replace('Gem.Boot._.', 'Gem__private__').replace(dot__pattern, '__')
                        } else if ($who.startsWith('Gem.Boot.')) {
                            var _prefix = $who.replace('Gem.Boot.', 'Gem__').replace(dot__pattern, '__')
                        } else {
                            var _prefix = $who.replace(dot__pattern, '__')
                        }
                    }

                    /*=*/ {
                        //  [interim] constant            module.$who    = $who
                        //  [interim] constant            module.$what   = $what
                        //  [invisible [interim] constant module._prefix = _prefix]       //  Optional
                        duration_property_$who .value = $who
                        duration_property_$what.value = $what

                        if (create_prefix) {
                            duration_property___prefix.value = _prefix
                            define_properties(module, duration_module_properties)
                            duration_property___prefix.value = undefined
                        } else {
                            define_properties(module, duration_$who_$what_properties)
                        }

                        duration_property_$who     .value =
                            duration_property_$what.value = undefined

                        if (tracing_self) {
                            trace_attribute(keyword_constant, module, '$who',    $who)
                            trace_attribute(keyword_constant, module, '$what',   $what)

                            if (create_prefix) {
                                trace_attribute(keyword_invisible_constant, module, '_prefix', _prefix)
                            }
                        }
                    }
                } else {
                    //
                    //  trace mode without clarity mode: only need `$who`, do *NOT* need `$what` & `__prefix`.
                    //
                    /*=*/ {
                        //  [interim] constant module.$who = $who
                        duration_property_$who.value = $who
                        define_property(module, '$who', duration_property_$who)
                        duration_property_$who.value = undefined

                        if (tracing_self) {
                            trace_attribute(keyword_constant, module, '$who',    $who)
                        }
                    }
                }

                if (tracing_self) {
                    procedure_done()

                    if (tracing_self === 2) {
                        Configuration.trace = trace                 //  Restore trace
                    }
                }
            }//,
        )


        who_what(
            Gem.Boot.Script.script_map,
            'Gem.Boot.Script.script_map',
            'Map of all the scripts loaded (or loading).',
            false//,
        )

        who_what(
            Gem.Boot.Source,
            'Gem.Boot.Source',
            (
                  'A map, for each `<script>` tag, a function from the source file to "hold onto"'
                + ' to avoid garbage collection of all functions from that source file'
                + ', which causes the source file to disappear from the "Sources" tab of Developer Tools.'
            ),
            false//,
        )

        if (trace) {
            who_what(
                Gem.Boot.Tracing,
                'Gem.Boot.Tracing',
                'Map of functions, methods & bound_methods being traced.',
                false//,
            )
        }

        who_what(Gem.Configuration, 'Gem.Configuration', 'Gem Configuration values.', false)

        who_what(Gem.Boot._,       'Gem.Boot._',       'Private members & methods of all Boot Gem modules.',  false)
        who_what(Gem.Boot._.Trace, 'Gem.Boot._.Trace', 'Private members & methods of the Boot.Trace module.', true)
    }
)


//  The full MIT License is available here: https://github.com/Rhodolite/Opal/blob/master/LICENSE
