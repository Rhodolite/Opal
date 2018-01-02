//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License
//  Boot3_StubAnonymousBox: Boot - Phase 3 - Add a stub for AnonymousBox
//
'use strict'                                                //  Strict mode helps catch JavaScript errors, very useful!


Gem.Core.execute(
    function execute$setup__Gem_Box() {
        //
        //  Imports
        //
        var Gem = window.Gem

        var _Core = Gem._.Core

        var who_what = _Core.who_what


        //
        //  Implementation
        //
        Gem.Box = {}


        who_what(Gem.Box, 'Gem.Box', 'Exports of the Box module.', true)
    }
)


Gem.Core.codify_method.call(
    Gem.Box,
    'create_AnonymousBox',
    'Stub to create an anonymous box (an object with no `.__proto__`)',
    function codifier$Gem__Box__create_AnonymousBox() {
        //
        //  Imports
        //
        var create_Object = Object.create


        //
        //  Implementation
        //
        return function codifier$Gem__Box__create_AnonymousBox(properties) {
            //  Stub to create an anonymous box (an object with no `.__proto__`).

            return create_Object(null, properties)
        }
    }//,
)


if (Gem.Configuration.unit_test) {
    Gem.Core.execute(
        function execute$test_AnonymousBox() {
            var module = 'Gem.Beryl.Boot3_StubAnonymousBox'

            var anonymous_box = Gem.Box.create_AnonymousBox({
                    $what : { enumerable : true, value : 'A test of Gem.Box.create_AnonymousBox()' }//,
                })

            console.log('%c%s%c: %cAn AnonymousBox%c: %o',
                        'color:green', module, 'color:none',
                        'color:orange', 'color:none',
                        anonymous_box)
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
