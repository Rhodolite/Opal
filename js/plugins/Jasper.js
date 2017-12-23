//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
//  Jasper: Joy's Amazingly Simple Plugin, Easily Readable 
//
(function module_Jasper(){                                  //  Anonymous scope to avoid "polluting" global scope
    "use strict"                                            //  Strict mode helps catch JavaScript errors, very useful!


    function GemModule() {}
    GemModule.prototype = Object.create(null, { constructor : { value : GemModule } })


    //  Local variable `$` is a copy of `window.Jasper` as it is shorter & easier to read '$'
    var $ = window.Jasper                                   //  Reuse global variable `Jasper` ...
        || (window.Jasper = new GemModule())                //      ... or create global variable `Jasper`


    $.name        = 'Jasper'                                //  Name of module
    $.version     = '0.0.1'                                 //  Version 0.0.2
    $.debug       = true                                    //  Set Jasper debug mode to true
    $.debug_clear = true                                     //  Only meaningful if .debug is also set


    //----------------------------------+
    //  Summary: produce module Jasper  |
    //----------------------------------+


    function summary() {
        clear_console()
        cleanup()
        show_developer_tools()
        show_version()
        development()
    }


    //----------------------------------+
    //  Details: produce module Jasper  |
    //----------------------------------+


    //  Imports
    var define_property        = Object.defineProperty      //  Currently unused -- will be used in the future
    var define_properties      = Object.defineProperties
    var set_prototype_of       = Object.setPrototypeOf
//  var create_Object          = Object.create
//  var create_Pattern         = RegExp
    var console                = window.console || null
    var process                = window.process || null
    var process__versions      = (process && process.versions) || null
    var parse_integer__or__NaN = Number.parseInt
    var is_NaN                 = Number.isNaN
    var NaN                    = window.NaN


    //  Copy members from $, to local variables (for code clarity below)
    var debug       = $.debug
    var debug_clear = $.debug_clear


    //  log
    if (console && console.log) {
        var log = function log(/*...*/) {                   //  Easier to type 'log' instead of 'console.log'
            if (console) {
                console.log.apply(console, arguments)
            }
        }
    } else {
        var log = function log(/*...*/) {}
    }


    //  clear_console
    if (console && console.clear) {
        var clear_console = function clear_console() {      //  Clear console, *IF* in debug mode
            if (debug) {
                if (debug_clear) {
                    console.clear()
                }
            }
        }
    } else {
        var clear_console = function clear_console() {}
    }


    //  cleanup
    function cleanup() {
    }


    //  VersionInformation
    function VersionInformation(name, major, minor, micro, release_level) {
        this.name          = name
        this.major         = major
        this.minor         = minor
        this.micro         = micro
        this.release_level = release_level
    }


    VersionInformation.prototype = Object.create(null, { constructor : { value : VersionInformation } })


    VersionInformation.prototype.toString = function VersionInformation__toString() {
        var s = '<VersionInformation ' + this.name

        if ( ! is_NaN(this.major)) { s += ', major: ' + this.major.toString() }
        if ( ! is_NaN(this.minor)) { s += ', minor: ' + this.minor.toString() }
        if ( ! is_NaN(this.micro)) { s += ', micro: ' + this.micro.toString() }

        if ( ! is_NaN(this.release_level)) {
            s += ', release_level: ' + this.release_level.toString()
        }

        return s + '>'
    }


    function create_version_information(name) {
        var major         = NaN
        var minor         = NaN
        var micro         = NaN
        var release_level = NaN

        if (process__versions) {
            var versions = process__versions[name].split('.')
            var total    = versions.length

            if (total > 0) { major         = parse_integer__or__NaN(versions[0]) }
            if (total > 1) { minor         = parse_integer__or__NaN(versions[1]) }
            if (total > 2) { micro         = parse_integer__or__NaN(versions[2]) }
            if (total > 3) { release_level = parse_integer__or__NaN(versions[3]) }
        }

        return new VersionInformation(name, major, minor, micro, release_level)
    }


    var node_webkit_version       = create_version_information('node-webkit')
    var is_node_webkit_12_or_less = (node_webkit_version.major == 0) && (node_webkit_version.minor <= 12)
    var is_node_webkit_13_or_more = (node_webkit_version.major > 0 ) || (node_webkit_version.minor >= 13)



    //  show_developer_tools
    function show_developer_tools() {
        //log('node_webkit_version: ', node_webkit_version.toString(), node_webkit_version)

        if (is_node_webkit_13_or_more) {
            //  Show developer tools (nw.js 0.13 or later version)
            nw.Window.get().showDevTools(false)
        } else if (is_node_webkit_12_or_less) {
            //  Show developer tools (nw.js 0.12 or earlier version)
            require('nw.gui').Window.get().showDevTools()
        }
    }


    //  show_version
    function show_version() {
        var begin_font         = 'font-weight: bold'
        var end_color_and_font = 'font-weight: normal; color: none'

        log('%c%s%c %c%s%c %o',
            'color: green;  ' + begin_font, $.name,    end_color_and_font,
            'color: orange; ' + begin_font, $.version, end_color_and_font,
            $)
    }


    //  Development code
    function development() {
        //  GemPrototype
        function GemPrototype() {
        }

        if (7) {
            function GemMetaProtoType() {}

            GemMetaProtoType.prototype = null

            var object_like_prototype = new GemMetaProtoType()

            if (0) {
            var object_like_prototype = Object.create(
                null,
                {
//                  constructor : { value : Object },
//                  hasOwnProperty : { value : Object.prototype.hasOwnProperty },
//                  isPrototypeOf : { value : Object.prototype.isPrototypeOf },
//                  propertyIsEnumerable : { value : Object.prototype.propertyIsEnumerable },
//                  toLocaleString : { value : Object.prototype.toLocaleString },
//                  toString : { value : Object.prototype.toString },
//                  valueOf : { value : Object.prototype.valueOf },
//                  __defineGetter__ : { value : Object.prototype.__defineGetter__ },
//                  __defineSetter__ : { value : Object.prototype.__defineSetter__ },
//                  __lookupGetter__ : { value : Object.prototype.__lookupGetter__ },
//                  __lookupSetter__ : { value : Object.prototype.__lookupSetter__ },
                }
            )
            }

            if (0) {
            GemPrototype.prototype = Object.create(
                    object_like_prototype,
                    { constructor : { value : GemPrototype }  }
                )
            }

            if (is_node_webkit_12_or_less) {
                define_property(
                    GemPrototype,
                    '__proto__',
                    { get : Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').get }
                )
            }

            //GemPrototype.prototype.alternate = object_like_prototype
        }


        var BuildGemClass__slot_name    = { value   : null }
        var BuildGemClass__slot_summary = { summary : null }


        var BuildGemClass__properties = {
            name    : BuildGemClass__slot_name,
            summary : BuildGemClass__slot_summary,
        }


        //  BuildGemClass
        function BuildGemClass(name, summary) {
            BuildGemClass__slot_name   .value = name
            BuildGemClass__slot_summary.value = summary

            define_properties(this, BuildGemClass__properties)
        }

        if (is_node_webkit_12_or_less) {
            function GemPrototype() {}

            Object.setPrototypeOf(GemPrototype, null)
            GemPrototype.prototype = null
            GemPrototype.toString  = function() { return 'class GemPrototype' }

            BuildGemClass.prototype = Object.create(null, { constructor : { value : GemPrototype } })


            //
            //  In nw.js 0.12 or earlier, we need to have a 'get __proto__' method, in order for Developer
            //  Tools to show the `.__proto__` member (this is not neccesary in nw.js 0.13 or later).
            //
            //  NOTE:
            //      The '__proto__' member can *ONLY* be set after the class is created.
            //
            //      If you attempt to set it in the call to Object.create, it will fail -- nasty bug ;(
            //      
            Object.defineProperty(
                     BuildGemClass.prototype,
                    '__proto__',
                    { get : Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').get }
                )
        } else {
            BuildGemClass.prototype = Object.create(null, { constructor : { value : BuildGemClass } })
        }

        function create_gem_class(name, summary) {
            return new BuildGemClass(name, summary)
        }


        var Apple = create_gem_class('Apple', 'An example of a GemClass named Apple')

        log('%o', Apple)
    }


    //  Finally: Run all the code in `Jasper`
    summary()
})();


//--------------------------------------------------------+
//  This code is formatted for clarity.                   |
//  Hence this code does not use unnecessary semicolons.  |
//  Reasoning: https://mislav.net/2010/05/semicolons/     |
//--------------------------------------------------------+


//  The full MIT License is available here: https://github.com/Rhodolite/Opal/blob/master/LICENSE
/*: @plugindesc Joy's Amazingly Simple Plugin, Easily Readable */


//
//  Bootstrap `Gem.codify`
//      [Temporary Bootstrap] to codify code to Gem.Beryl
//
Gem.codify(
    'Gem.Beryl.codify',
    '[Temporary Bootstrap] to codify code to Gem.Beryl',
    function codifier__Gem__Beryl__codify() {
        //
        //  NOTE:
        //      Since this is temporary code, we don't need to recalculate `Beryl` and `$Beryl` when `Gem` is
        //      changed (since this code will be thrown away before `Gem` is changed).
        //
        var Beryl = Gem.Beryl

        if (Gem.Configuration.clarity) {
            var $Beryl = Gem.$.Beryl

            return function Gem__Beryl__codify(name, $what, codifier) {
                //  [Temporary Bootstrap] to codify code to `Gem.Beryl` (and an introspection to `Gem.$.Beryl`)

                Beryl[name] = codifier()
                $Beryl[name] = { $who : name, $what : $what, $code : Gem.Beryl[name] }
            }
        }

        return function Gem__Beryl__codify(name, $what, codifier) {
            //  [Temporary Bootstrap] to codify code to `Gem.Beryl`

            Beryl[name] = codifier()
        }
    }
)


//
//  Properly define `Gem.Beryl.codify` like all other functions will be defined:
//
//      One time only: Uses previously defined bootstrap version of `Gem.Beryl.codify`.
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
        if (Gem.Configuration.clarity) {
            var $who    = '<closure for Gem.$.ModuleName.produce_codify>'
            var $what = (
                      'The closure for `Gem.$.ModuleName.produce_codify`'
                    + '.  Contains all closure variables *EXCEPT* `exports` & `$`'
                    + ' (`exports` & `$` are created in a different closure)'
                    + '.'
                )

            function _force_$who_and_$what_to_appear_in_the_closure() { return $who + $what }
        }


        //
        //  Imports
        //
        var create_object = Object.create


        //
        //  NOTE:
        //      There are two *different* uses of `enumerable` here.
        //
        //      Here is what `Gem.Beryl.codify.properties` will look like when used:
        //
        //          properties = {
        //              $$who  : 'Gem.Beryl.codify.properties', //  #1: `.$who__`  is *NOT* enumerable
        //              $$what : 'Property descriptor ...',     //  #1: `.$$what` is *NOT* enumerable
        //              $who : {                                //  #1: `.$who` is enumerable
        //                  $who       : 'Gem.codifiy.properties.$who',
        //                  $what      : 'Property descriptor ...',
        //              //  enumerable : false,             //  #2. `.$who` creates a `.$who` that is NOT enumerable
        //                  value      : To-Be-Determined
        //              },
        //              $what : {                           //  #1: `.$what` is enumerable
        //                  $who       : 'Gem.codifiy.properties.$who',
        //                  $what      : 'Property descriptor ...',
        //              //  enumerable : false,             //  #2. `.$what` creates a `.$what` that is NOT enumerable
        //                  value      : To-Be-Determined
        //              },
        //              $code : {                           //  #1: `.$code` is enumerable
        //                  $who       : 'Gem.codifiy.properties.$who',
        //                  $what      : 'Property descriptor ...',
        //              //  enumerable : false,             //  #2. `.$code` creates a `.$code` that is enumerable
        //                  value      : To-Be-Determined
        //              },
        //          }
        //
        //      Thus the attributes #1 are marked with enumerable as follows:
        //
        //          A.  *NOT* enumerable -- documentation only of `properties`, does *NOT* create attributes when
        //                                  `properties` is used to create attributes.
        //          B.  enumerable       -- create a attribute when `properties` is used to create attributes.
        //
        //      For those attributes #1 that are marked enumerable, there is a [default] #2 enumerable that means:
        //
        //          C.  The attribute that is being created, that attribute itself is *NOT* enumerable.
        //
        //  Thus `Gem.Beryl.codify.properties` has 5 members, but only 3 are enumerable:
        //
        //      Two members `.$$who` & `.$$what` are to document `Gem.Beryl.codify.properties`, and are thus
        //      *NOT* enumerable.
        //
        //      Three members `.$who`, `.$what`, and `.$code` are to be used to create other attributes, and
        //      thus are enumerable.
        //
        //      Thus when `Gem.Beryl.codify.properties` is used to add attributes to an object, it only adds the
        //      three enumerable attributes (i.e.: `.$who`, `.$what`, and `.$code`).
        //
        //      Since these three members do not each have a (nested) enumerable property
        //      (i.e.: `.$who.enumerable`, `.$what.enumerable`, and `.$code.enumerable` all default to `false`)
        //      then the attributes created when `Gem.Beryl.codify.properties` is used are all notk enumerable.
        //
        //  Thus *IF* we wanted to create an enumerable attribute (not that we do, but if we did) say called
        //  `.visible`, we would have to mark it as follows:
        //
        //      #1.  Make `.visible` (itself) enumerable, so it creates a `.visible` attribute when
        //           `Gem.Beryl.codify.properties` is used to create attributes; and
        //
        //      #2.  Make (the nested value of) `.visible.enumerable` to `true`, so it creates a enumerable
        //           `.visible` attribute
        //
        //  Finally in comments below, #1 or #2 refers to the same #1 & #2 as in this comment; i.e.:
        //
        //      #1.  Means create an attribute; and
        //      #2.  Means the attribute created will be enumerable.
        //
        function _create_non_enumerable_property_with_uninitialized_value($who) {
            return create_object(
                    null,
                    {
                        $who : {
                                value : 'Gem.Beryl.codify.properties.' + $who//,
                                //enumerable : false//, //  Only to document `properties_$*`, hence not enumerable
                            },

                        $what : {
                                value : (
                                          'Property descriptor used to initialize the `.' + $who + '`'
                                         + ' attribute of a new member of `Gem.$.ModuleName`.'
                                    )//,
                                //enumerable : false//, //  Only to document `properties_$*`, hence not enumerable
                            }//,

                        //value      : { value : uninitialized }//  `.value` is set below
                        //enumerable : { value : false }//,     //  #2: Attributes that are created will be enumerable
                    }//,
                )
        }


        var property_$who  = _create_non_enumerable_property_with_uninitialized_value('$who')
        var property_$what = _create_non_enumerable_property_with_uninitialized_value('$what')
        var property_$code = _create_non_enumerable_property_with_uninitialized_value('$code')

        var properties = create_object(
                null,
                {
                    $$who : {
                            value        : 'Gem.Beryl.codify.properties'//,
                            //enumerable : false//,     //  Only to document `properties`, hence not enumerable
                        },

                    $$what : {
                            value : (
                                      'Property descriptors used to initialize'
                                     + ' a new member of `Gem.$.ModuleName`.'
                                )//,
                            //enumerable : false//,     //  Only to document `properties`, hence not enumerable
                        },

                    $who  : { value : property_$who,  enumerable : true },  //  #1: create a `.$who` attribute
                    $what : { value : property_$what, enumerable : true },  //  #1: create a `.$what` attribute
                    $code : { value : property_$code, enumerable : true }//,//  #1: create a `.$code` attribute
                }//,
            )


        return function Beryl__produce_codify(exports, $) {
            if (Gem.Configuration.clarity) {
                var $who  = '<closure Gem.$.ModuleName.codify>'
                var $what = (
                          'The closure for `Gem.$.ModuleName.codify`'
                        + '.  Contains `exports` which is where the code is exported to'
                        + ' (Also contains `$` which is the introspection for the module this codify function'
                        + ' is specificaly for)'
                        + '.'
                    )

                function _force_$who_and_$what_to_appear_in_the_closure() { return $who + $what }
            }


            return function Beryl__codify(name, $what, codifier) {
                //  Create the code for a function or procedure, typically as a closure to avoid the use of any global
                //  variables.

                var $code = exports[name] = codifier()

                property_$who .value = name
                property_$what.value = $what
                property_$code.value = $code

                $[name] = create_object(null, properties)

                //
                //  Delete these unused attributes, for two reasons:
                //
                //      1.  So they do not appear when introspecting in Developer Tools; AND
                //      2.  So the can be properly garbage collected if `exports[name]` is deleted.
                //
                delete property_$who .value
                delete property_$what.value
                delete property_$code.value
            }
        }
    }
)


//
//  Now run `Gem.Beryl.codify` on `Gem.Beryl.produce_codify` & `Gem.Beryl.codify`
//  (so it uses it's newly defined itself on itself).
//
if (Gem.Configuration.clarity) {
    Gem.Beryl.codify(
        Gem.$.Beryl.produce_codify.$who,
        Gem.$.Beryl.produce_codify.$what,
        function codifier__Beryl__produce_codify() {
            return Gem.$.Beryl.produce_codify.$code
        }
    )
}


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


