//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
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

        var _             = Node._
        var _Core         = _.Core
        var Box           = Node.Box
        var Configuration = Gem.Configuration
        var Gem_Script    = Gem.Script
        var Trace         = Node.Trace

        var clarity          = Configuration.clarity
        var cocoon           = Trace.cocoon
        var dynamic          = Gem_Script.dynamic
        var trace            = Configuration.trace
        var produce_who_what = _Core.produce_who_what


        if (clarity && trace) {
            var interim_constant_attribute = Box.interim_constant_attribute
        }


        //
        //  Closures
        //
        var dot_pattern = new Pattern('\\.', 'g')

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
                    '_prefix' : duration_property___prefix//,
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
                var duration_$who_$what_properties = Box.$who_$what_properties

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
        var who_what = produce_who_what(
            dot_pattern, duration_property_$who, duration_property_$what, duration_property___prefix,
            duration_module_properties, duration_$who_$what_properties//,
        )

        who_what(Gem.Script, 'Gem.Script', "`<script>` handling.", false)

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


        if ( ! Gem_Script.dynamic) {
            delete _Core.produce_who_what
        }
    }
)


//  The full MIT License is available here: https://github.com/Rhodolite/Opal/blob/master/LICENSE
