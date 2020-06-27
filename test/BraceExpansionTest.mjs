import {Assert} from "//es.parts/ess/0.0.1/";

import * as BraceExpansion from "../src/BraceExpansion.js";

export {testIgnoresDollarBrace};
export {testEmptyOption};
export {testNegativeIncrement};
export {testNested};
export {testOrder};
export {testPad};
export {testSameType};
export {testSequence};

function testIgnoresDollarBrace() {
    Assert.deepEqual(BraceExpansion.expand("${1..3}"), ["${1..3}"]);
    Assert.deepEqual(BraceExpansion.expand("${a,b}${c,d}"), ["${a,b}${c,d}"]);
    Assert.deepEqual(BraceExpansion.expand("x${a,b}x${c,d}x"), ["x${a,b}x${c,d}x"]);
}

function testEmptyOption() {
    Assert.deepEqual(BraceExpansion.expand("-v{,,,,}"), ["-v", "-v", "-v", "-v", "-v"]);
}

function testNegativeIncrement() {
    Assert.deepEqual(BraceExpansion.expand("{3..1}"), ["3", "2", "1"]);
    Assert.deepEqual(BraceExpansion.expand("{10..8}"), ["10", "9", "8"]);
    Assert.deepEqual(BraceExpansion.expand("{10..08}"), ["10", "09", "08"]);
    Assert.deepEqual(BraceExpansion.expand("{c..a}"), ["c", "b", "a"]);

    Assert.deepEqual(BraceExpansion.expand("{4..0..2}"), ["4", "2", "0"]);
    Assert.deepEqual(BraceExpansion.expand("{4..0..-2}"), ["4", "2", "0"]);
    Assert.deepEqual(BraceExpansion.expand("{e..a..2}"), ["e", "c", "a"]);
}

function testNested() {
    Assert.deepEqual(BraceExpansion.expand("{a,b{1..3},c}"), [
      "a", "b1", "b2", "b3", "c"
    ]);
    Assert.deepEqual(BraceExpansion.expand("{{A..Z},{a..z}}"),
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("")
    );
    Assert.deepEqual(BraceExpansion.expand("ppp{,config,oe{,conf}}"), [
      "ppp", "pppconfig", "pppoe", "pppoeconf"
    ]);
}

function testOrder() {
    Assert.deepEqual(BraceExpansion.expand("a{d,c,b}e"), ["ade", "ace", "abe"]);
}

function testPad() {
    Assert.deepEqual(BraceExpansion.expand("{9..11}"), ["9", "10", "11"]);
    Assert.deepEqual(BraceExpansion.expand("{09..11}"), ["09", "10", "11"]);
}

function testSameType() {
    Assert.deepEqual(BraceExpansion.expand("{a..9}"), ["{a..9}"]);
}

function testSequence() {
    Assert.deepEqual(BraceExpansion.expand("a{1..2}b{2..3}c"), ["a1b2c", "a1b3c", "a2b2c", "a2b3c"]);
    Assert.deepEqual(BraceExpansion.expand("{1..2}{2..3}"), ["12", "13", "22", "23"]);
    Assert.deepEqual(BraceExpansion.expand("{0..8..2}"), ["0", "2", "4", "6", "8"]);
    Assert.deepEqual(BraceExpansion.expand("{1..8..2}"), ["1", "3", "5", "7"]);
    Assert.deepEqual(BraceExpansion.expand("{3..-2}"), ["3", "2", "1", "0", "-1", "-2"]);
    Assert.deepEqual(BraceExpansion.expand("1{a..b}2{b..c}3"), ["1a2b3", "1a2c3", "1b2b3", "1b2c3"]);
    Assert.deepEqual(BraceExpansion.expand("{a..b}{b..c}"), ["ab", "ac", "bb", "bc"]);
    Assert.deepEqual(BraceExpansion.expand("{a..k..2}"), ["a", "c", "e", "g", "i", "k"]);
    Assert.deepEqual(BraceExpansion.expand("{b..k..2}"), ["b", "d", "f", "h", "j"]);
}
