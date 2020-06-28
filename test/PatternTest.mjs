import {Assert} from "//es.parts/ess/0.0.1/";

import * as Pattern from "../src/Pattern.mjs";

export {testRequalPatternbing};
export {testOptionNonNull};
export {testAllowNullPatternExpansion};
export {testMatchAll};
export {testLarryCrashesBashes};
export {testBash23Test};
export {testNocase};

const basicFiles = ["a", "b", "c", "d", "abc", "abd", "abe", "bb", "bcd", "ca", "cb", "dd", "de"];
const bash23Files = ["man/", "man/man1/", "man/man1/bash.1"];

const nonNull = {nonull: true};

function testRequalPatternbing() {
    Assert.deepEqual(Pattern.match("a*", basicFiles), ["a", "abc", "abd", "abe"]);
}

function testOptionNonNull() {
    Assert.deepEqual(Pattern.match("X*", basicFiles, nonNull), ["X*"]);
}

function testAllowNullPatternExpansion() {
    Assert.deepEqual(Pattern.match("X*", basicFiles), []);
}

function testMatchAll() {
    Assert.deepEqual(Pattern.match("**", basicFiles), basicFiles);
}

function testLarryCrashesBashes() {
    const expr1 = "/^root:/{s/^[^:]*:[^:]*:\([^:]*\).*$/\\1/";
    Assert.deepEqual(Pattern.match(expr1, basicFiles, nonNull), [expr1]);

    const expr2 = "/^root:/{s/^[^:]*:[^:]*:\([^:]*\).*$/\u0001/";
    Assert.deepEqual(Pattern.match(expr2, basicFiles, nonNull), [expr2]);
}

function testBash23Test() {
    // https://opensource.apple.com/source/bash/bash-23/bash/tests/glob-test
    Assert.deepEqual(Pattern.match("*/man*/bash.*", bash23Files), ['man/man1/bash.1']);
    Assert.deepEqual(Pattern.match("man/man1/bash.1", bash23Files), ['man/man1/bash.1']);

    Assert.deepEqual(Pattern.match("a***c", ["abc"]), ["abc"]);
    Assert.deepEqual(Pattern.match("a*****?c", ["abc"]), ["abc"]);
    Assert.deepEqual(Pattern.match("?*****??", ["abc"]), ["abc"]);
    Assert.deepEqual(Pattern.match("*****??", ["abc"]), ["abc"]);
    Assert.deepEqual(Pattern.match("?*****?c", ["abc"]), ["abc"]);
    Assert.deepEqual(Pattern.match("?***?****c", ["abc"]), ["abc"]);
    Assert.deepEqual(Pattern.match("?***?****?", ["abc"]), ["abc"]);
    Assert.deepEqual(Pattern.match("?***?****", ["abc"]), ["abc"]);
    Assert.deepEqual(Pattern.match("*******c", ["abc"]), ["abc"]);
    Assert.deepEqual(Pattern.match("*******?", ["abc"]), ["abc"]);

    Assert.deepEqual(Pattern.match("a*cd**?**??k", ["abcdecdhjk"]), ["abcdecdhjk"]);
    Assert.deepEqual(Pattern.match("a**?**cd**?**??k", ["abcdecdhjk"]), ["abcdecdhjk"]);
    Assert.deepEqual(Pattern.match("a**?**cd**?**??k***", ["abcdecdhjk"]), ["abcdecdhjk"]);
    Assert.deepEqual(Pattern.match("a**?**cd**?**??***k", ["abcdecdhjk"]), ["abcdecdhjk"]);
    Assert.deepEqual(Pattern.match("a**?**cd**?**??***k**", ["abcdecdhjk"]), ["abcdecdhjk"]);
    Assert.deepEqual(Pattern.match("a****c**?**??*****", ["abcdecdhjk"]), ["abcdecdhjk"]);

    Assert.deepEqual(Pattern.match("[-abc]", ["-"]), ["-"]);
    Assert.deepEqual(Pattern.match("[abc-]", ["-"]), ["-"]);
    Assert.deepEqual(Pattern.match("\\", ["\\"]), ["\\"]);
    Assert.deepEqual(Pattern.match("[\\\\]", ["\\"]), ["\\"]);
    Assert.deepEqual(Pattern.match("[[]", ["["]), ["["]);
    Assert.deepEqual(Pattern.match("[", ["["]), ["["]);
    Assert.deepEqual(Pattern.match("[*", ["[abc"]), ["[abc"]);
}

function testNocase() {
    Assert.deepEqual(Pattern.match("XYZ", ["xYz"], {nocase: 1}), ["xYz"]);
}
