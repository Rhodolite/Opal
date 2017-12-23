        //
        //  Gem.codify:
        //      Temporary bootstrap function to create the code for a function or procedure, typically as a closure to
        //      avoid the use of any global variables.
        //
        function codifier__Gem__codify() {
            //
            //  Imports
            //
            var Gem = window.Gem


            return function Gem__codify(who, $what, codifier) {
                //  Temporary bootstrap function to create the code for a function or procedure, typically as a
                //  closure to avoid the use of any global variables.

                var m = name_match(who)

                if ( ! m) {
                    throw Error('Unknown name to codify: ' + who)
                }

                var module = m[1]
                var first  = m[2]
                var second = m[3]

                var codifier_name = 'codifier__Gem__' + module
                var code_name     =           'Gem__' + module

                if (first !== undefined) {
                    codifier_name += '__' + first
                    code_name     += '__' + first
                }

                if (second !== undefined) {
                    codifier_name += '__' + second
                    code_name     += '__' + second
                }

                if (codifier_name !== codifier.name) {
                    throw Error(
                            (
                                  "Codifier must be named '" + codifier_name + "'"
                                + "; was instead named: '"   + codifier.name + "'"
                            )//,
                        )
                }

                var code = codifier()

                if (typeof code === 'undefined') {
                    throw Error(
                            (
                                  'Codifier `' + codifier_name + '`'
                                + ' did not return a function; returned `undefined` instead'
                            )//,
                        )
                }

                if (code_name !== code.name) {
                    throw Error(
                            (
                                  "Codifier `" + codifier_name + "`"
                                +       " must return a function named '"  + code_name + "'"
                                + "; instead returned a function named: '" + code.name + "'"
                            )//,
                        )
                }

                if (clarity) {
                    concealed_constant_property.value = who

                    define_property(code, '$who', concealed_constant_property)

                    concealed_constant_property.value = $what

                    define_property(code, '$what', concealed_constant_property)

                    delete concealed_constant_property.value
                }

                if (first === undefined) {
                    Gem[module] = code

                    return
                }

                if (second === undefined) {
                    Gem[module][first] = code

                    return
                }

                Gem[module][first][second] = code
            }
        }


        var temporary__Gem__codify = codifier__Gem__codify()    //  Grab a temporary copy of `Gem.codify` ...


        temporary__Gem__codify(                         //  ... And use the temporary `Gem.codify` to codify itself ...
            'Gem.codify',
            (
                  'Temporary bootstrap function to create the code for a function or procedure, typically as a'
                + ' closure to avoid the use of any global variables'
                + '.'
            ),
            codifier__Gem__codify//,
        )


