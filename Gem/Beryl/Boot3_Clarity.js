//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
//  Boot3_Clarity: Boot - Phase 3 - Add Clarity
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
Gem.Core.execute(
    function execute$add_clarity() {
        //
        //  Imports
        //
        var Gem = window.Gem

        var _Core = Gem._.Core

        var who_what = _Core.who_what


        //
        //  Implementation
        //
        who_what(Gem.Configuration,     'Gem.Configuration',     'Gem Configuration values.',                   false)
        who_what(Gem.Script.script_map, 'Gem.Script.script_map', 'Map of all the scripts loaded (or loading).', false)

        who_what(
            Gem.Source,
            'Gem.Source',
            (
                  'A map, for each `<script>` tag, a function from the source file to "hold onto"'
                + ' to avoid garbage collection of all functions from that source file'
                + ', which causes the source file to disappear from the "Sources" tab of Developer Tools.'
            ),
            false//,
        )

        who_what(Gem.Tracing, 'Gem.Tracing', 'Map of functions, methods & bound_methods being traced.', false)
        who_what(Gem._,       'Gem._',       'Private members & methods of all Gem modules.',           false)
        who_what(Gem._.Trace, 'Gem._.Trace', 'Private members & methods of the Trace module.',          true)
    }
)


//  The full MIT License is available here: https://github.com/Rhodolite/Opal/blob/master/LICENSE
