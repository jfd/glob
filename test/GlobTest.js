import {Assert} from "//es.parts/ess/0.0.1/";

import * as Glob from "../src/Glob.js";

export {testFind};

function testFind() {
    return Glob.find("**/*.js", {cwd: "/Users/jfd/workspace/silo-dev/packages/glob"})
        .then(result => {
            console.log(result);
        })


    // return Fs.find("test/*.js", {cwd: "/Users/jfd/workspace/silo-dev/packages/isofs"})
    //     .then(result => {
    //         console.log(result);
    //     })
}

