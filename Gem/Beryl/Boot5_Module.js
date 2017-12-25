//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
//  Boot5_Module: Boot - Phase 5 - Add Method to define a module
//
'use strict'                                                //  Strict mode helps catch JavaScript errors, very useful!


//
//  Gem.Beryl.module
//      Define a Gem Module.
//
//      The module may be specified as 'dynamic' if it can be reloaded.
//
//      Also in clarity mode adds a `.$who`, and `.$what` to the module.
//
Gem.Beryl.codify_method(
    'module',
    (
          'Define a Gem Module.\n'
        + '\n'
        + "The module may be specified as 'dynamic' if it can be reloaded.\n"
        + '\n'
        + 'Also in clarity mode adds a `.$who`, and `.$what` to the module.'
    ),
    function codifier$Gem__Beryl__module() {
        return function Gem__Beryl__module(who, $what, dynamic)
        {
        }
    }//,
)


//--------------------------------------------------------+
//  This code is formatted for clarity.                   |
//  Hence this code does not use unnecessary semicolons.  |
//  Reasoning: https://mislav.net/2010/05/semicolons/     |
//--------------------------------------------------------+


//  The full MIT License is available here: https://github.com/Rhodolite/Opal/blob/master/LICENSE
