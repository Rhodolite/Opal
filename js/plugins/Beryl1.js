//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
//  Beryl: Boot Engine, Reliable Yet Limber
//
"use strict"                                                //  Strict mode helps catch JavaScript errors, very useful!


//
//  Create global variable `Gem`
//
//  NOTE:
//      Later `Gem` will be replaced with a proper instance of class `Gem.module.Gem.Global`
//
window.Gem = {
        clarity : true,                                     //  Set Gem clarity mode to true
        debug   : true,                                     //  Set Gem debug mode to true

        //
        //  Clarity mode only: `Gem.$` is the map of introspection of all the Gem modules.
        //
        //$ : { Beryl : {} }

        _ : {                                               //  Private members & methods of all Gem modules
            Beryl : {}//,                                   //  Private members & methods of module Beryl
        },
        Beryl   : {},                                       //  Exports of the Beryl module.
        scripts : {}//,
    }


//
//  In Gem "clarity" mode, *every* object created has a `.$who` and `.$what` member to help introspect the object
//  in developer tools:
//
//      This makes it a lot clearer what the object is used for.
//
//      All "clarity" objects begin with `$` (see below for an exeption, when instead `.__who__`
//      or `.__what__` is used to avoid conflicts).
//
//      Also each module appears in `Gem.$.ModuleName`, with each member of that module having a
//      `.$who` & `.$what` members.
//
//      By *every* object this includes all closure objects that are used.  This make it very easy to examine
//      the `.[[Scopes]]` member of a function and introspect the value of each of it's closure objects.
//
//      When an object uses `.$who` or `.$what` members for it's own purposes, then the extra members created
//      are named `.__who__` and `.__what__` to avoid conflicts.
//
if (Gem.clarity) {
    Gem.$who  = 'Gem'                                       //  Name of this variable.
    Gem.$what = 'The only global variable used by Gem.'     //  What `Gem` is used for.

    Gem.$ = {                                               //  Map of introspection of all the Gem modules
        $who  : 'Gem.$',
        $what : 'Map of introspection of all the Gem modules.',
        Beryl : {
            $who  : 'Gem.$.Beryl',
            $what : 'An introspection of the Beryl module.'//,
        }//,
    }

    Gem._.$who  = 'Gem._'
    Gem._.$what = 'Private members & methods of all Gem modules.'

    Gem._.Beryl.$who  = 'Gem._.Beryl'
    Gem._.Beryl.$what = 'Private members & methods of the Beryl module.'

    Gem.Beryl.$who  = 'Gem.Beryl'
    Gem.Beryl.$what = 'Exports of the Beryl module.'

    Gem.scripts.$who  = 'Gem.scripts'
    Gem.scripts.$what = 'Map of all the scripts loaded (or loading).'
}


//
//  Bootstrap `Gem.codify`
//
//      The reason the function is named `Beryl__codify` (meaning `Gem.codify`) is so that it shows
//      up in stack traces as the full name `Beryl__codify` instead of shorter name `codify`
//      (this is really really helpful when reading stack traces).
//
Gem.Beryl.codify = function Beryl__codify(name, $what, codifier) {
    Gem.Beryl[name] = codifier()

    if (Gem.clarity) {
        Gem.$.Beryl[name] = { $who : name, $what : $what, $code : Gem.Beryl[name] }
    }
}


//
//  Properly define `Gem.codify` like all other functions will be defined:
//
//      One time only: Uses previously defined bootstrap version of `Gem.codify`.
//
Gem.Beryl.codify(
    'produce_codify',
    (
          'Produce a "codify" function for a specific module'
        + '.  A "codify" function creates the code for a function or procedure'
        + ', typically as a closure to avoid the use of any global variables'
        + '.'
    ),
    function codifier__Beryl__produce_codify() {
        if (Gem.clarity) {
            var $who    = '<closure for Gem.$.ModuleName.produce_codify>'
            var $what = (
                      'The closure for `Gem.$.ModuleName.produce_codify`'
                    + '.  Contains all closure variables *EXCEPT* `module` & `$`'
                    + ' (`module` & `$` ared created in a different closure)'
                    + '.'
                )

            function _force_$who_and_$what_to_appear_in_the_closure() { return $who + $what }
        }


        var create_object = Object.create


        //
        //  NOTE:
        //      There are two *different* uses of `enumerable` here.  Here is what `Gem.cofify.properties1 will look
        //      like when used:
        //
        //          properties = {
        //              __who__ :  'Gem.codify.properties'      //  #1: '.__who__'  is *NOT* enumerable
        //              __what__ : 'Property descriptor ...'    //  #1: '.__what__' is *NOT* enumerable
        //              $who : {                                //  #1: '.$who' is enumerable
        //                  $who       : 'Gem.codifiy.properties.$who',
        //                  $what      : 'Property descriptor ...',
        //                  enumerable : true,                  //  #2. '.$who' creates a '.$who' that is enumerable
        //                  value      : To-Be-Determined
        //              },
        //              $what : {                               //  #1: '.$what' is enumerable
        //                  $who       : 'Gem.codifiy.properties.$who',
        //                  $what      : 'Property descriptor ...',
        //                  enumerable : true,                  //  #2. '.$what' creates a '.$what' that is enumerable
        //                  value      : To-Be-Determined
        //              },
        //              $code : {                               //  #1: '.$code' is enumerable
        //                  $who       : 'Gem.codifiy.properties.$who',
        //                  $what      : 'Property descriptor ...',
        //                  enumerable : true,                  //  #2. '.$code' creates a '.$code' that is enumerable
        //                  value      : To-Be-Determined
        //              }
        //          }
        //
        //      Thus the attributes #1 are marked with enumerable as follows:
        //
        //          A.  *NOT* enumerable -- documentation only of `properties`, does *NOT* create attributes when
        //                                  `properties` is used to create attributes.
        //          B.  enumerable       -- create a attribute when `properties` is used to create attributes.
        //
        //      For those attributes #1 that are marked enumerable, there is a #2 enumerable that means:
        //
        //          C.  The attribute that is being created, that attribute itself is enumerable.
        //
        //  Thus `Gem.codify.properties` has 5 members, but only 3 are enumerable:
        //
        //      Two members `.__who__` & `.__what__` are to document `Gem.codify.properties`, and are thus
        //      *NOT* enumerable.
        //
        //      Three members `.$who`, `.$what`, and `.$code` are to be used to create other attributes, and
        //      thus are enumerable.
        //
        //      Thus when `Gem.codify.properties` is used to add attributes to an object, it only adds the
        //      three enumerable attributes (i.e.: `.$who`, `.$what`, and `.$code`).
        //
        //      Since these three members each have a (nested) enumerable property that is true
        //      (i.e.: `.$who.enumerable`, `.$what.enumerable`, and `.$code.enumerable` are all true)
        //      then the attributes created when `Gem.codify.properties` is used are all enumerable.
        //
        //  Thus *IF* we wanted to create an non-enumerable attribute (not that we do, but if we did) say called
        //  `.invisible`, we would have to mark it as follows:
        //
        //      #1.  Make `.invisible` (itself) enumerable, so it creates a `.invisible` attribute when
        //           `Gem.codify.properties` is used to create attributes; and
        //
        //      #2.  Make (the nested value of) `.invisible.enumerable` false, so it creates a non-enumerable
        //           `.invisible` attribute
        //
        //           (Actually since the nested value of `.invisible.enumerable` defaults to false, we would
        //           just omit it & not set it to true).
        //               
        //  Finally in comments below, #1 or #2 refers to the same #1 & #2 as in this comment; i.e.:
        //
        //      #1.  Means create an attribute; and
        //      #2.  Means the attribute created will be enumerable.
        //
        function _create_enumerable_property_with_uninitialized_value($who) {
            //
            //  `r` is a alias for `result`, less typing ...
            //
            var r = create_object(
                    null,
                    {
                        enumerable : { value : true }//,        //  #2: Attributes that are created will be enumerable
                        //value    : { value : uninitialized }  //  `.value` is set below
                    }//,
                )

            if (Gem.clarity) {
                Object.defineProperties(
                        r,
                        {
                            $who : {
                                    value : 'Gem.codify.properties.' + $who//,
                                    //enumerable : false//, //  Only to document `properties_$*`, hence not enumerable
                                },

                            $what : {
                                    value : (
                                              'Property descriptor used to initialize the `.' + $who + '`'
                                             + ' attribute of a new member of `Gem.$.ModuleName`.'
                                        )//,
                                    //enumerable : false//, //  Only to document `properties_$*`, hence not enumerable
                                }//,
                        }//,
                    )
            }

            return r
        }


        var property_$who  = _create_enumerable_property_with_uninitialized_value('$who')
        var property_$what = _create_enumerable_property_with_uninitialized_value('$what')
        var property_$code = _create_enumerable_property_with_uninitialized_value('$code')

        var properties = create_object(
                null,
                {
                    $who  : { value : property_$who,  enumerable : true },  //  #1: create a `.$who` attribute
                    $what : { value : property_$what, enumerable : true },  //  #1: create a `.$what` attribute
                    $code : { value : property_$code, enumerable : true }//,//  #1: create a `.$code` attribute
                }//,
            )

        if (Gem.clarity) {
            Object.defineProperties(
                    properties,
                    {
                        __who__ : {
                                value        : 'Gem.codify.properties'//,
                                //enumerable : false//,     //  Only to document `properties`, hence not enumerable
                            },

                        __what__ : {
                                value : (
                                          'Property descriptors used to initialize'
                                         + ' a new member of `Gem.$.ModuleName`.'
                                    )//,
                                //enumerable : false//,     //  Only to document `properties`, hence not enumerable
                            }//,
                    }//,
                )
        }

        return function Beryl__produce_codify(module, $) {
            if (Gem.clarity) {
                var $who    = '<closure Gem.$.ModuleName.codify>'
                var $what = (
                          'The closure for `Gem.$.ModuleName.codify`'
                        + '.  Contains `module` which is the module this codify function is specifically for'
                        + ' (Also contains `$` which is the introspection for the module this codify function'
                        + ' is specificaly for)'
                        + '.'
                    )

                function _force_$who_and_$what_to_appear_in_the_closure() { return $who + $what }
            }

            return function Beryl__codify(name, $what, codifier) {
                //
                //  Create the code for a function or procedure, typically as a closure to avoid the use of any global
                //  variables.
                //
                var $code = module[name] = codifier()

                property_$who .value = name
                property_$what.value = $what
                property_$code.value = $code

                $[name] = create_object(null, properties)

                //
                //  Delete these unused attributes, for two reasons:
                //
                //      1.  So they do not appear when introspecting in Developer Tools; AND
                //      2.  So the can be properly garbage collected if `Gem.$.Beryl[name]` is deleted.
                //
                delete property_$who .value
                delete property_$what.value
                delete property_$code.value
            }
        }
    }
)


Gem.Beryl.codify(
    'codify',
    (
          'Create the code for a function or procedure'
        + ', typically as a closure to avoid the use of any global variables.'
    ),
    function codifier__Beryl__codify() {
        return Gem.Beryl.produce_codify(Gem.Beryl, Gem.$.Beryl)
    }
)


//
//  Now run `Gem.Beryl.codify` on `Gem.Beryl.produce_codify` & `Gem.Beryl.codify`
//  (so it uses it's newly defined itself on itself).
//
Gem.Beryl.codify(
    Gem.$.Beryl.produce_codify.$who,
    Gem.$.Beryl.produce_codify.$what,
    function codifier__Beryl__produce_codify() {
        return Gem.$.Beryl.produce_codify.$code
    }
)

Gem.Beryl.codify(
    Gem.$.Beryl.codify.$who,
    Gem.$.Beryl.codify.$what,
    function codifier__Beryl__codify() {
        return Gem.$.Beryl.codify.$code
    }
)

console.log(Gem.$.Beryl)


if (Gem.debug && 'Proxy' in window) {
    Gem.codify(
        'lookup_attribute__or__throw_error',
        'Throw an attribute error when an undefined attribute is accessed by mistake.',
        function codify_lookup_attribute__or__throw_error() {
            var Error = window.Error

            return function lookup_attribute__or__throw_error(target, name) {
                //
                //  Throw an attribute error when an undefined attribute is accessed by mistake.
                //
                if (name in target) {
                    return target[name]
                }

                throw Error('AttributeError: `' + target.name + '` does not have a `.' + name + '` member')
            }
        }
    )

    Gem.proxy_traps = Object.create(
            null,
            {
                name : { value : 'Gem.proxy_traps' },

                summary : {
                    value :
                          '`traps` argument to Proxy'
                        + ': To throw an attribute error when an undefined attribute is accessed by mistake.'
                },

                get : { value : Gem.lookup_attribute__or__throw_error },
            },
        )

    window.Gem = new Proxy(
            Object.create(
                null,
                {
                    name                              : { value : Gem.name                              },
                    summary                           : { value : Gem.summary                           },
                    codify                            : { value : Gem.codify                            },
                    debug                             : { value : Gem.debug                             },
                    lookup_attribute__or__throw_error : { value : Gem.lookup_attribute__or__throw_error },

                    modules : {
                        value : new Proxy(
                                Object.create(
                                    null,
                                    {
                                        name    : { value : Gem.modules.name    },
                                        summary : { value : Gem.modules.summary },
                                        Gem     : { value : Gem.modules.Gem     },
                                    }
                                ),
                                Gem.proxy_traps//,
                            )//,
                    },

                    scripts : {
                        value : new Proxy(Object.create(null), Gem.proxy_traps)//,
                    }//,
                }//,
            ),
            Gem.proxy_traps//,
        )
}
    

//
//  We only bring up an alert if four conditions are met:
//
//      1)  This is running in Gem debug mode;
//      2)  This is running in RPG Maker MV "test" mode;
//      3)  This is running under nw.js (i.e.: not a normal browser like Firefox, etc.); AND
//      4)  The browser has a `.addEventListener` method (all modern browsers do).
//
if (
       Gem.debug
    && ('Utils' in window) && Utils.isOptionValid('test')
    && Utils.isNwjs()
    && ('addEventListener' in document)
) {
    Gem.execute(
        'produce_handle_load_error',
        function brew_produce_handle_load_error() {
            var alert                = window.alert
            var show_developer_tools = Gem.show_developer_tools

            return function Gem__produce_handle_load_error(path) {
                //
                //  NOTE:
                //      There is no way to get the error message, if there is one, when attempting to load a script
                //      using <script> (You can't use try/catch on a <script></script> tag that is inserted into the
                //      DOM).
                //
                //      Hence in case of an error, the following is done:
                //
                //          1)  Alert the user with an alert message which says to see Developer Tools for full error;
                //          2)  Force the user to acknowledge the alert box by hitting 'OK';
                //          3)  Then, and only then, bring up Developer tool, so the user can read the rest of the
                //          error.
                //
                return function handle_load_error() {
                    alert('Failed to load ' + path + ': please see Developer Tools for full error')
                    show_developer_tools()
                }
            }
        }
    )
}


Gem.load_script = (
    function enclose_load_script()
    {
        "use strict"

        var produce_handle_load_error = (Gem.produce_handle_load_error || null)
        var script_map         = Gem.scripts


        return function load_script(path, container) {
            var self = script_map[path] || (script_map[path] = {})

            //  Create an element: `<script></script>`
            var script_tag = self.tag = document.createElement('script')

            if (script_tag.setAttribute) {
                script_tag.setAttribute('src', path)    //  Modify to `<script src='Gem/Beryl/Boot.js></script>`
            } else {
                script_tag.src = path                   //  Modify to `<script src='Gem/Beryl/Boot.js></script>`
            }

            if (produce_handle_load_error) {
                var handle_load_error = self.handle_load_error = produce_handle_load_error(path)

                script_tag.addEventListener('error', handle_load_error)
            }

            container.appendChild(script_tag)           //  Attempt to load path as a module
        }
    }
)();


(function module_Beryl(){                                   //  Anonymous scope to avoid "polluting" global scope
    "use strict"                                            //  Strict mode helps catch JavaScript errors, very useful!

    //
    //  Create global variable `Gem`
    //
    //      Also for convenience create a local variable `$` as an alias for `Gem`.
    //
    //  NOTE:
    //      Later `Gem` will be replaced with a proper instance of class `Gem.Global`
    //
    var $ = window.Gem

    $.debug           = true                                //  Set Gem debug mode to true
    $.beryl_boot_path = 'Gem/Beryl/Boot.js'                 //  Module to load the rest of Gem modules


    //
    //  Imports
    //
    var parse_integer__or__NaN = Number.parseInt


    //
    //  Node_WebKit version
    //
    //  NOTE:
    //      If not using nw.js, then both `is_node_webkit_12_or_lower` & `is_node_webkit_13_or_higher` will be `false`.
    //
    var node_webkit__major   = NaN
    var node_webkit__minor   = NaN
    var node_webkit__version = (window.process && process.versions && process.versions['node-webkit'])

    if (typeof node_webkit__version == 'string') {
        var version_list = node_webkit__version.split('.')

        if (version_list.length > 0) { node_webkit__major = parse_integer__or__NaN(version_list[0]) }
        if (version_list.length > 1) { node_webkit__minor = parse_integer__or__NaN(version_list[1]) }
    }

    $.is_node_webkit_12_or_lower  = (node_webkit__major === 0 && node_webkit__minor <= 12)
    $.is_node_webkit_13_or_higher = (node_webkit__major >   0 || node_webkit__minor >= 13)


    //
    //  show_developer_tools
    //
    if ($.is_node_webkit_12_or_lower) {                     //  Show developer tools (nw.js 0.12 or lower)
        var game_window = require('nw.gui').Window.get()

        $.show_developer_tools = function show_developer_tools() {
            game_window.showDevTools()
        }
    } else if ($.is_node_webkit_13_or_higher) {             //  Show developer tools (nw.js 0.13 or higher)
        var game_window = nw.Window.get()

        $.show_developer_tools = function show_developer_tools() {
            game_window.showDevTools(false)
        }
    } else {                                                //  Not using nw.js: Don't show developer tools
        $.show_developer_tools = function show_developer_tools() {}
    }


    //
    //  We only bring up an alert if three conditions are met:
    //
    //      1)  This is running in Gem debug mode;
    //      2)  This is running under nw.js (i.e.: not a normal browser like Firefox, etc.); AND
    //      3)  This is running in RPG Maker MV "test" mode.
    //
    if ($.debug && Utils.isNwjs() && Utils.isOptionValid('test')) {
        //
        //  NOTE:
        //      There is no way to get the error message, if there is one, when attempting to load Gem/Boot.Beryl.js
        //      (You can't use try/catch on a <script></script> tag that is inserted into the DOM).
        //
        //      Hence in case of an error, the following is done:
        //
        //          1)  Alert the user with an alert message which says to see Developer Tools for full error;
        //          2)  Force the user to acknowledge the alert box by hitting 'OK';
        //          3)  Then, and only then, bring up Developer tool, so the user can read the rest of the error.
        //
        $.beryl_boot_error = function beryl_boot_error() {
            alert('Failed to load ' + $.beryl_boot_path + ': please see Developer Tools for full error')
            $.show_developer_tools()
        }
    }

    var script = $.beryl_script = document.createElement('script')  //  Create an element: `<script></script>`

    script.src = $.beryl_boot_path                          //  Modify to `<script src='Gem/Beryl/Boot.js></script>`

    if ($.beryl_boot_error) {                               //  *IF* three conditions above met, then:
        if (script.addEventListener) {
            script.addEventListener('error', $.beryl_boot_error)    //  Alert user if any error happens
        }

        //
        //  Note, we could do:
        //
        //      else {
        //          script.onerror = $.beryl_boot_error     //  Alert user if any error happens (alternate method)
        //      }
        //      
        //  However, all modern browsers have an 'addEventListener', no need to be backwards compatiable with
        //  super super old browsers.
        //
        //  More importantly, we can't test this code -- untested code should not be inplemented.
        //
    }

    document.head.appendChild(script)                       //  Attempt to load 'Gem/Beryl/Boot.js' as a module
})();


//
//  The "sources" tab of Developer tools shows what has been loaded into the HTML page:
//
//      However, for a JavaScript file to appear under "sources" it must have at least one function that has not
//      been garbage collected.
//
//      In debug mode, `Gem.sources` is used to make sure that there is least once such function from each JavaScript
//      file that has been loaded in.
//
if (Gem.debug) {
    Gem.sources.js_plugins_Gem = function() {}
}


//--------------------------------------------------------+
//  This code is formatted for clarity.                   |
//  Hence this code does not use unnecessary semicolons.  |
//  Reasoning: https://mislav.net/2010/05/semicolons/     |
//--------------------------------------------------------+


//  The full MIT License is available here: https://github.com/Rhodolite/Opal/blob/master/LICENSE
/*: @plugindesc Boot Engine, Reliable Yet Limber */
