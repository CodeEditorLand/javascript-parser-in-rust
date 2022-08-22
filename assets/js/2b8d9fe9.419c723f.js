"use strict";(self.webpackChunkjavascript_parser_in_rust=self.webpackChunkjavascript_parser_in_rust||[]).push([[4],{5842:e=>{e.exports=JSON.parse('{"blogPosts":[{"id":"/rome","metadata":{"permalink":"/javascript-parser-in-rust/blog/rome","editUrl":"https://github.com/Boshen/javascript-parser-in-rust/tree/main/blog/blog/rome.md","source":"@site/blog/rome.md","title":"Rome Tools","description":"Rome uses a different set of techniques for parsing JavaScript and TypeScript.","date":"2022-08-22T12:51:34.000Z","formattedDate":"August 22, 2022","tags":[],"readingTime":2.04,"hasTruncateMarker":true,"authors":[],"frontMatter":{"title":"Rome Tools"},"nextItem":{"title":"Grammar","permalink":"/javascript-parser-in-rust/blog/grammar"}},"content":"[Rome](https://github.com/rome/tools) uses a different set of techniques for parsing JavaScript and TypeScript.\\nThis tutorial summarizes them in learning order for better understanding.\\n\\n\x3c!--truncate--\x3e\\n\\n## History\\n\\n- The Rome codebase was rewritten from TypeScript to Rust, see [Rome will be rewritten in Rust](https://rome.tools/blog/2021/09/21/rome-will-be-rewritten-in-rust)\\n- The decision was made after talking to the author of [rslint](https://github.com/rslint/rslint) and [rust-analyzer](https://github.com/rust-lang/rust-analyzer)\\n- rust-analyzer proved that IDE-centric tools built around concrete syntax tree are possible\\n- rslint proved that it is possible to write a JavaScript parser in Rust, with the same base libraries as rust-analyzer\\n- Rome ported the rslint codebase to their own repo with permission from rslint\'s author\\n\\n## Concrete Syntax Tree\\n\\n- The base library is called [rowan](https://github.com/rust-analyzer/rowan), see [overview of rowan](https://github.com/rust-lang/rust-analyzer/blob/master/docs/dev/syntax.md)\\n- Rowan is named after the real green [rowan tree](https://en.wikipedia.org/wiki/Rowan) that makes red berries\\n- The origin of rowan is described in this [blog post](https://ericlippert.com/2012/06/08/red-green-trees/), from the authors of the C# programming language\\n- The whole point of rowan is to define a lossless concrete syntax tree (CST) that describes all the details of the source code and provide a set of traversal APIs (parent, children, siblings, etc)\\n- Read the advantage of having a CST over an AST: [Pure AST based linting sucks](https://rdambrosio016.github.io/rust/2020/09/18/pure-ast-based-linting-sucks.html)\\n- CST provides the ability to build a fully recoverable parser\\n\\n## Grammar\\n\\n- Just like an AST, we need to define the grammar. The grammar is auto-generated by using [xtask/codegen](https://github.com/rome/tools/tree/main/xtask/codegen)\\n- The grammar is generated from the [ungrammar](https://github.com/rust-analyzer/ungrammar) DSL\\n- The input `ungrammar` source file is in [xtask/codegen/js.ungram](https://github.com/rome/tools/blob/main/xtask/codegen/js.ungram)\\n- The output of the codegen is in [rome_js_syntax/src/generated](https://github.com/rome/tools/tree/main/crates/rome_js_syntax/src/generated)\\n\\n## Entry Point\\n\\nThe Rome codebase is getting large and slightly difficult to find the parser entry point.\\n\\nFor first-time contributors, the `rome_cli` crate is the binary entry point for running the code:\\n\\n```bash\\ncargo run -p rome_cli\\n\\ntouch test.js\\ncargo run -p rome_cli -- check ./test.js\\n```\\n\\n`rome_cli` will eventually call `rome_js_parser::parse`\\n\\n```rust reference\\nhttps://github.com/rome/tools/blob/9815467c66688773bc1bb6ef9a5b2d86ca7b3682/crates/rome_js_parser/src/parse.rs#L178-L187\\n```\\n\\nand finally the actual parsing code\\n\\n```rust reference\\nhttps://github.com/rome/tools/blob/9815467c66688773bc1bb6ef9a5b2d86ca7b3682/crates/rome_js_parser/src/syntax/program.rs#L14-L17\\n```\\n\\n## Contributing\\n\\n- [CONTRIBUTING.md](https://github.com/rome/tools/blob/main/CONTRIBUTING.md) has instructions on how to contribute\\n- [rome_js_parser crate doc](https://rome.github.io/tools/rome_js_parser/index.html) has some more details on the parser\\n- See [`cargo codegen test`](https://github.com/rome/tools/tree/main/xtask/codegen#cargo-codegen-test) for working with parser tests\\n- See [`cargo coverage`](https://github.com/rome/tools/tree/main/xtask/coverage) for working with conformance tests\\n- Join the [Discord Server](https://discord.com/invite/rome) for inquiries\\n\\n:::info\\nThe JavaScript / TypeScript parser is 99% complete, the best way to help is to test Rome in your own codebase\\nor take a look at the [issues on Github](https://github.com/rome/tools/issues).\\n:::"},{"id":"/grammar","metadata":{"permalink":"/javascript-parser-in-rust/blog/grammar","editUrl":"https://github.com/Boshen/javascript-parser-in-rust/tree/main/blog/blog/grammar.md","source":"@site/blog/grammar.md","title":"Grammar","description":"JavaScript has one of the most challenging grammar to parse,","date":"2022-08-22T12:51:34.000Z","formattedDate":"August 22, 2022","tags":[],"readingTime":16.155,"hasTruncateMarker":true,"authors":[],"frontMatter":{"title":"Grammar"},"prevItem":{"title":"Rome Tools","permalink":"/javascript-parser-in-rust/blog/rome"},"nextItem":{"title":"The ECMAScript Specification","permalink":"/javascript-parser-in-rust/blog/ecma-spec"}},"content":"JavaScript has one of the most challenging grammar to parse,\\nthis tutorial details all the sweat and tears I had while learning it.\\n\\n\x3c!--truncate--\x3e\\n\\n## LL(1) Grammar\\n\\nAccording to [Wikipedia](https://en.wikipedia.org/wiki/LL_grammar),\\n\\n> an LL grammar is a context-free grammar that can be parsed by an LL parser, which parses the input from Left to right\\n\\nThe first **L** means the scanning the source from **L**eft to right,\\nand the second **L** means the construction of a **L**eftmost derivation tree.\\n\\nContext-free and the (1) in LL(1) means a tree can be constructed by just peeking at the next token and nothing else.\\n\\nLL Grammars are of particular interest in academia because we are lazy human beings and we want to write programs that generate parsers automatically so we don\'t need to write parsers by hand.\\n\\nUnfortunately, most industrial programming languages do not have a nice LL(1) grammar,\\nand this applies to JavaScript too.\\n\\n:::info\\nMozilla started the [jsparagus](https://github.com/mozilla-spidermonkey/jsparagus) project a few years ago\\nand wrote a [LALR parser generator in Python](https://github.com/mozilla-spidermonkey/jsparagus/tree/master/jsparagus).\\nThey haven\'t updated it much in the past two years and they sent a strong message at the end of [js-quirks.md](https://github.com/mozilla-spidermonkey/jsparagus/blob/master/js-quirks.md)\\n\\n> What have we learned today?\\n>\\n> - Do not write a JS parser.\\n> - JavaScript has some syntactic horrors in it. But hey, you don\'t make the world\'s most widely used programming language by avoiding all mistakes. You do it by shipping a serviceable tool, in the right circumstances, for the right users.\\n\\n:::\\n\\n---\\n\\nThe only practical way to parse JavaScript is to write a recursive descent parser by hand because of the nature of its grammar,\\nso let\'s learn all the quirks in the grammar before we shoot ourselves in the foot.\\n\\nThe list below starts simple and will become difficult to grasp,\\nso please take grab a coffee and take your time.\\n\\n## Identifiers\\n\\nThere are three types of identifiers defined in `#sec-identifiers`,\\n\\n```markup\\nIdentifierReference[Yield, Await] :\\nBindingIdentifier[Yield, Await] :\\nLabelIdentifier[Yield, Await] :\\n```\\n\\n`estree` and some ASTs do not distinguish the above identifiers,\\nand the specification does not explain them in plain text.\\n\\n`BindingIdentifier`s are declarations and `IdentifierReference`s are references to binding identifiers.\\nFor example in `var foo = bar`, `foo` is a `BindingIdentifier` and `bar` is a `IdentifierReference` in the grammar:\\n\\n```markup\\nVariableDeclaration[In, Yield, Await] :\\n    BindingIdentifier[?Yield, ?Await] Initializer[?In, ?Yield, ?Await] opt\\n\\nInitializer[In, Yield, Await] :\\n    = AssignmentExpression[?In, ?Yield, ?Await]\\n```\\n\\nfollow `AssignmentExpression` into `PrimaryExpression` we get\\n\\n```markup\\nPrimaryExpression[Yield, Await] :\\n    IdentifierReference[?Yield, ?Await]\\n```\\n\\nDeclaring these identifiers differently in the AST will greatly simply downstream tools, especially for semantic analysis.\\n\\n```rust\\npub struct BindingIdentifier {\\n    pub node: Node,\\n    pub name: Atom,\\n}\\n\\npub struct IdentifierReference {\\n    pub node: Node,\\n    pub name: Atom,\\n}\\n```\\n\\n---\\n\\n## Class and Strict Mode\\n\\nECMAScript Class is born after strict mode, so they decided that everything inside a class must be strict mode for simplicity.\\nIt is stated as such in `#sec-class-definitions` with just a `Node: A class definition is always strict mode code.`\\n\\nIt is easy to declare strict mode by associating it with function scopes, but a `class` declaration does not have a scope,\\nwe need to keep an extra state just for parsing classes.\\n\\n```rust reference\\nhttps://github.com/swc-project/swc/blob/f9c4eff94a133fa497778328fa0734aa22d5697c/crates/swc_ecma_parser/src/parser/class_and_fn.rs#L85\\n```\\n\\n---\\n\\n## Legacy Octal and Use Strict\\n\\n`#sec-string-literals-early-errors` disallows escaped legacy octal inside strings `\\"\\\\01\\"`:\\n\\n```markup\\nEscapeSequence ::\\n    LegacyOctalEscapeSequence\\n    NonOctalDecimalEscapeSequence\\n\\nIt is a Syntax Error if the source text matched by this production is strict mode code.\\n```\\n\\nThe best place to detect this is inside the lexer, it can ask the parser for strict mode state and throw errors accordingly.\\n\\nBut, this becomes impossible when mixed with directives:\\n\\n```javascript reference\\nhttps://github.com/tc39/test262/blob/747bed2e8aaafe8fdf2c65e8a10dd7ae64f66c47/test/language/literals/string/legacy-octal-escape-sequence-prologue-strict.js#L16-L19\\n```\\n\\n`use strict` is declared after the escaped legacy octal, yet the syntax error needs to be thrown.\\nFortunately, no real code uses directives with legacy octals ... unless you want to pass the test262 case from above.\\n\\n---\\n\\n## Non-simple Parameter and Strict Mode\\n\\nIdentical function parameters is allowed in non-strict mode `function foo(a, a) { }`,\\nand we can forbid this by adding `use strict`: `function foo(a, a) { \\"use strict\\" }`.\\nLater on in es6, other grammars were added to function parameters, for example `function foo({ a }, b = c) {}`.\\n\\nNow, what happens if we write the following where \\"01\\" is a strict mode error?\\n\\n```javaScript\\nfunction foo(value=(function() { return \\"\\\\01\\" }())) {\\n    \\"use strict\\";\\n    return value;\\n}\\n```\\n\\nMore specifically, what should we do if there is a strict mode syntax error inside the parameters thinking from the parser perspective?\\nSo in `#sec-function-definitions-static-semantics-early-errors`, it just bans this by stating\\n\\n```markup\\nFunctionDeclaration :\\nFunctionExpression :\\n\\nIt is a Syntax Error if FunctionBodyContainsUseStrict of FunctionBody is true and IsSimpleParameterList of FormalParameters is false.\\n```\\n\\nChrome throws this error with a mysterious message \\"Uncaught SyntaxError: Illegal \'use strict\' directive in function with non-simple parameter list\\".\\n\\nA more in-depth explanation is described in [this blog post](https://humanwhocodes.com/blog/2016/10/the-ecmascript-2016-change-you-probably-dont-know/) by the author of ESLint.\\n\\n:::info\\n\\nFun fact, the above rule does not apply if we are targeting `es5` in TypeScript, it transpiles to\\n\\n```javaScript\\nfunction foo(a, b) {\\n    \\"use strict\\";\\n    if (b === void 0) { b = \\"\\\\01\\"; }\\n}\\n```\\n\\n:::\\n\\n---\\n\\n## Parenthesized Expression\\n\\nParenthesized expressions are supposed to not have any semantic meanings?\\nFor instance the AST for `((x))` can just be a single `IdentifierReference`, not `ParenthesizedExpression` -> `ParenthesizedExpression` -> `IdentifierReference`.\\nAnd this is the case for JavaScript grammar.\\n\\nBut ... who would have thought it can have run-time meanings.\\nFound in [this estree issue](https://github.com/estree/estree/issues/194), it shows that\\n\\n```javascript\\n> fn = function () {};\\n> fn.name\\n< \\"fn\\"\\n\\n> (fn) = function () {};\\n> fn.name\\n< \'\'\\n```\\n\\nSo eventually acorn and babel added the `preserveParens` option for compatibility.\\n\\n---\\n\\n## Function Declaration in If Statement\\n\\nIf we follow the grammar precisely in `#sec-ecmascript-language-statements-and-declarations`:\\n\\n```markup\\nStatement[Yield, Await, Return] :\\n    ... lots of statements\\n\\nDeclaration[Yield, Await] :\\n    ... declarations\\n```\\n\\nThe `Statement` node we define for our AST would obviously not contain `Declaration`,\\n\\nbut in Annex B `#sec-functiondeclarations-in-ifstatement-statement-clauses`,\\nit allows declaration inside the statement position of `if` statements in non-strict mode:\\n\\n```javascript\\nif (x) function foo() {}\\nelse function bar() {}\\n```\\n\\n---\\n\\n## Label statement is legit\\n\\nWe probably have never written a single line of labelled statement, but it is legit in modern JavaScript and not banned by strict mode.\\n\\nThe following syntax is correct, it returns a labelled statement (not object literal).\\n\\n```javascript\\nconst foo = (bar) => ({ baz: quaz });\\n```\\n\\n---\\n\\n## `let` is not a keyword\\n\\n`let` is not a keyword so it is allowed to appear anywhere unless the grammar explicitly states `let` is not allowed in such positions.\\nParsers need to peek at the token after the `let` token and decide what it needs to be parsed into, e.g.:\\n\\n```javascript\\nlet a;\\nlet = foo;\\nlet instanceof x;\\nlet + 1;\\nwhile (true) let;\\na = let[0];\\n```\\n\\n---\\n\\n## For-in / For-of and the [In] context\\n\\nIf we look at the grammar for `for-in` and `for-of` in `#prod-ForInOfStatement`,\\nit is immediately confusing to understand how to parse these.\\n\\nThere are two major obstacles for us to understand: the `[lookahead \u2260 let]` part and the `[+In]` part.\\n\\nIf we have parsed to `for (let`, we need to check the peeking token is:\\n\\n- not `in` to disallow `for (let in)`\\n- is `{`, `[` or an identifier to allow `for (let {} = foo)`, `for (let [] = foo)` and `for (let bar = foo)`\\n\\nOnce reached the `of` or `in` keyword, the right-hand side expression needs to be passed with the correct [+In] context to disallow\\nthe two `in` expressions in `#prod-RelationalExpression`:\\n\\n```\\nRelationalExpression[In, Yield, Await] :\\n    [+In] RelationalExpression[+In, ?Yield, ?Await] in ShiftExpression[?Yield, ?Await]\\n    [+In] PrivateIdentifier in ShiftExpression[?Yield, ?Await]\\n\\nNote 2: The [In] grammar parameter is needed to avoid confusing the in operator in a relational expression with the in operator in a for statement.\\n```\\n\\nAnd this is the only application for the `[In]` context in the entire specification.\\n\\nAlso to note, the grammar `[lookahead \u2209 { let, async of }]` forbids `for (async of ...)`,\\nand it needs to be explicitly guarded against.\\n\\n---\\n\\n## Block-Level Function Declarations\\n\\nIn Annex B.3.2 `#sec-block-level-function-declarations-web-legacy-compatibility-semantics`,\\nan entire page is dedicated to explain how `FunctionDeclaration` is supposed to behave in `Block` statements.\\nIt boils down to\\n\\n```javascript reference\\nhttps://github.com/acornjs/acorn/blob/11735729c4ebe590e406f952059813f250a4cbd1/acorn/src/scope.js#L30-L35\\n```\\n\\nThe name of a `FunctionDeclaration` needs to be treated the same as a `var` declaration if its inside a function declaration.\\nThis code snippet errors with a re-declaration error since `bar` is inside a block scope:\\n\\n```javascript\\nfunction foo() {\\n  if (true) {\\n    var bar;\\n    function bar() {} // redeclaration error\\n  }\\n}\\n```\\n\\nmeanwhile, the following does not error because it is inside a function scope, function `bar` is treated as a var declaration:\\n\\n```javascript\\nfunction foo() {\\n  var bar;\\n  function bar() {}\\n}\\n```\\n\\n---\\n\\n## Grammar Context\\n\\nThe syntactic grammar has 5 context parameters for allowing and disallowing certain constructs,\\nnamely `[In]`, `[Return]`, `[Yield]`, `[Await]` and `[Default]`.\\n\\nIt is best to keep a context during parsing, for example in Rome:\\n\\n```rust reference\\nhttps://github.com/rome/tools/blob/5a059c0413baf1d54436ac0c149a829f0dfd1f4d/crates/rome_js_parser/src/state.rs#L404-L425\\n```\\n\\nAnd toggle and check these flags accordingly by following the grammar.\\n\\n## AssignmentPattern vs BindingPattern\\n\\nIn `estree`, the left-hand side of an `AssignmentExpression` is a `Pattern`:\\n\\n```markup\\nextend interface AssignmentExpression {\\n    left: Pattern;\\n}\\n```\\n\\nand the left-hand side of a `VariableDeclarator` is a `Pattern`:\\n\\n```markup\\ninterface VariableDeclarator <: Node {\\n    type: \\"VariableDeclarator\\";\\n    id: Pattern;\\n    init: Expression | null;\\n}\\n```\\n\\nA `Pattern` can be a `Identifier`, `ObjectPattern`, `ArrayPattern`:\\n\\n```markup\\ninterface Identifier <: Expression, Pattern {\\n    type: \\"Identifier\\";\\n    name: string;\\n}\\n\\ninterface ObjectPattern <: Pattern {\\n    type: \\"ObjectPattern\\";\\n    properties: [ AssignmentProperty ];\\n}\\n\\ninterface ArrayPattern <: Pattern {\\n    type: \\"ArrayPattern\\";\\n    elements: [ Pattern | null ];\\n}\\n```\\n\\nBut from the specification perspective, we have the following JavaScript:\\n\\n```javascript\\n// AssignmentExpression:\\n{ foo } = bar;\\n  ^^^ IdentifierReference\\n[ foo ] = bar;\\n  ^^^ IdentifierReference\\n\\n// VariableDeclarator\\nvar { foo } = bar;\\n      ^^^ BindingIdentifier\\nvar [ foo ] = bar;\\n      ^^^ BindingIdentifier\\n```\\n\\nThis starts to become confusing because we now have a situation where we cannot directly distinguish whether the `Identifier` is a `BindingIdentifier` or a `IdentifierReference`\\ninside a `Pattern`:\\n\\n```rust\\nenum Pattern {\\n    Identifier, // Is this a `BindingIdentifier` or a `IdentifierReference`?\\n    ArrayPattern,\\n    ObjectPattern,\\n}\\n```\\n\\nThis will lead to all sorts of unnecessary code further down the parser pipeline.\\nFor example, when setting up the scope for semantic analysis, we need to inspect the parents of this `Identifier`\\nto determine whether we should bind it to the scope or not.\\n\\nA better solution is to fully understand the specification and decide what to do.\\n\\nThe grammar for `AssignmentExpression` and `VariableDeclaration` are defined as:\\n\\n```marup\\n13.15 Assignment Operators\\n\\nAssignmentExpression[In, Yield, Await] :\\n    LeftHandSideExpression[?Yield, ?Await] = AssignmentExpression[?In, ?Yield, ?Await]\\n\\n13.15.5 Destructuring Assignment\\n\\nIn certain circumstances when processing an instance of the production\\nAssignmentExpression : LeftHandSideExpression = AssignmentExpression\\nthe interpretation of LeftHandSideExpression is refined using the following grammar:\\n\\nAssignmentPattern[Yield, Await] :\\n    ObjectAssignmentPattern[?Yield, ?Await]\\n    ArrayAssignmentPattern[?Yield, ?Await]\\n```\\n\\n```markup\\n14.3.2 Variable Statement\\n\\nVariableDeclaration[In, Yield, Await] :\\n    BindingIdentifier[?Yield, ?Await] Initializer[?In, ?Yield, ?Await]opt\\n    BindingPattern[?Yield, ?Await] Initializer[?In, ?Yield, ?Await]\\n```\\n\\nThe specification distinguishes this two grammar by defining them separately with an `AssignmentPattern` and a `BindingPattern`.\\n\\nSo in situations like this, do not be afraid to deviate from `estree` and define extra AST nodes for our parser:\\n\\n```rust\\nenum BindingPattern {\\n    BindingIdentifier,\\n    ObjectBindingPattern,\\n    ArrayBindingPattern,\\n}\\n\\nenum AssignmentPattern {\\n    IdentifierReference,\\n    ObjectAssignmentPattern,\\n    ArrayAssignmentPattern,\\n}\\n```\\n\\nI was in a super confusing state for a whole week until I finally reached enlightenment:\\nwe need to define an `AssignmentPattern` node and a `BindingPattern` node instead of a single `Pattern` node.\\n\\n- `estree` must be correct because people have been using it for years so it cannot be wrong?\\n- how are we going to cleanly distinguish the `Identifier`s inside the patterns without defining two separate nodes?\\n  I just cannot find where the grammar is?\\n- After a whole day of navigating the specification ...\\n  the grammar for `AssignmentPattern` is in the 5th subsection of the main section \\"13.15 Assignment Operators\\" with the subtitle \\"Supplemental Syntax\\" \ud83e\udd2f -\\n  this is really out of place because all grammar is defined in the main section, not like this one defined after the \\"Runtime Semantics\\" section\\n\\n---\\n\\n:::caution\\nThe following cases are really difficult to grasp. Here be dragons.\\n:::\\n\\n## Ambiguous Grammar\\n\\nLet\'s first think like a parser and solve the problem - given the `/` token, is it a division operator or the start of a regex expression?\\n\\n```javascript\\na / b;\\na / / regex /;\\na /= / regex /;\\n/ regex / / b;\\n/=/ / /=/;\\n```\\n\\nIt is almost impossible, isn\'t it? Let\'s break these down and follow the grammar.\\n\\nThe first thing we need to understand is that the syntactic grammar drives the lexical grammar as stated in `#sec-ecmascript-language-lexical-grammar`\\n\\n> There are several situations where the identification of lexical input elements is sensitive to the syntactic grammar context that is consuming the input elements.\\n\\nThis means that the parser is responsible for telling the lexer which token to return next.\\nThe above example indicates that the lexer needs to return either a `/` token or a `RegExp` token.\\nFor getting the correct `/` or `RegExp` token, the specification says:\\n\\n> The InputElementRegExp goal symbol is used in all syntactic grammar contexts where a RegularExpressionLiteral is permitted ...\\n> In all other contexts, InputElementDiv is used as the lexical goal symbol.\\n\\nAnd the syntax for `InputElementDiv` and `InputElementRegExp` are\\n\\n```markup\\nInputElementDiv ::\\n    WhiteSpace\\n    LineTerminator\\n    Comment\\n    CommonToken\\n    DivPunctuator <---------- the `/` and `/=` token\\n    RightBracePunctuator\\n\\nInputElementRegExp ::\\n    WhiteSpace\\n    LineTerminator\\n    Comment\\n    CommonToken\\n    RightBracePunctuator\\n    RegularExpressionLiteral <-------- the `RegExp` token\\n```\\n\\nThis means whenever the grammar reaches `RegularExpressionLiteral`, `/` need to be tokenized as a `RegExp` token (and throw an error if it does not have a matching `/`).\\nAll other cases we\'ll tokenize `/` as a slash token.\\n\\nLet\'s walk through an example:\\n\\n```\\na / / regex /\\n^ ------------ PrimaryExpression:: IdentifierReference\\n  ^ ---------- MultiplicativeExpression: MultiplicativeExpression MultiplicativeOperator ExponentiationExpression\\n    ^^^^^^^^ - PrimaryExpression: RegularExpressionLiteral\\n```\\n\\nThis statement does not match any other start of `Statement`,\\nso it\'ll go down the `ExpressionStatement` route:\\n\\n`ExpressionStatement` --\x3e `Expression` --\x3e `AssignmentExpression` --\x3e ... --\x3e\\n`MultiplicativeExpression` --\x3e ... --\x3e\\n`MemberExpression` --\x3e `PrimaryExpression` --\x3e `IdentifierReference`.\\n\\nWe stopped at `IdentifierReference` and not `RegularExpressionLiteral`,\\nthe statement \\"In all other contexts, InputElementDiv is used as the lexical goal symbol\\" applies.\\nThe first slash is a `DivPunctuator` token.\\n\\nSince this is a `DivPunctuator` token,\\nthe grammar `MultiplicativeExpression: MultiplicativeExpression MultiplicativeOperator ExponentiationExpression` is matched,\\nthe right-hand side is expected to be an `ExponentiationExpression`.\\n\\nNow we are at the second slash in `a / /`.\\nBy following `ExponentiationExpression`,\\nwe reach `PrimaryExpression: RegularExpressionLiteral` because `RegularExpressionLiteral` is the only matching grammar with a `/`:\\n\\n```markup\\nRegularExpressionLiteral ::\\n    / RegularExpressionBody / RegularExpressionFlags\\n```\\n\\nThis second `/` will be tokenized as `RegExp` because\\nthe specification states \\"The InputElementRegExp goal symbol is used in all syntactic grammar contexts where a RegularExpressionLiteral is permitted\\".\\n\\n:::info\\nAs an exercise, try and follow the grammar for `/=/ / /=/`.\\n:::\\n\\n---\\n\\n## Cover Grammar\\n\\nRead the [V8 blog post](https://v8.dev/blog/understanding-ecmascript-part-4) on this topic first.\\n\\nTo summarize, the specification states the following three cover grammars:\\n\\n#### CoverParenthesizedExpressionAndArrowParameterList\\n\\n```markup\\nPrimaryExpression[Yield, Await] :\\n    CoverParenthesizedExpressionAndArrowParameterList[?Yield, ?Await]\\n\\nWhen processing an instance of the production\\nPrimaryExpression[Yield, Await] : CoverParenthesizedExpressionAndArrowParameterList[?Yield, ?Await]\\n    the interpretation of CoverParenthesizedExpressionAndArrowParameterList is refined using the following grammar:\\n\\nParenthesizedExpression[Yield, Await] :\\n    ( Expression[+In, ?Yield, ?Await] )\\n```\\n\\n```markup\\nArrowFunction[In, Yield, Await] :\\n    ArrowParameters[?Yield, ?Await] [no LineTerminator here] => ConciseBody[?In]\\n\\nArrowParameters[Yield, Await] :\\n    BindingIdentifier[?Yield, ?Await]\\n    CoverParenthesizedExpressionAndArrowParameterList[?Yield, ?Await]\\n```\\n\\nThese definitions defines:\\n\\n```javascript\\nlet foo = (a, b, c); // SequenceExpression\\nlet bar = (a, b, c) => {}; // ArrowExpression\\n          ^^^^^^^^^ CoverParenthesizedExpressionAndArrowParameterList\\n```\\n\\nA simple but cumbersome approach to solving this problem is to parse it as a `Vec<Expression>` first,\\nthen write a converter function to convert it to `ArrowParameters` node, i.e. each individual `Expression` need to be converted to a `BindingPattern`.\\n\\nIt should be noted that, if we are building the scope tree within the parser,\\ni.e. create the scope for arrow expression during parsing,\\nbut do not create one for a sequence expression,\\nit is not obvious how to do this. [esbuild](https://github.com/evanw/esbuild) solved this problem by creating a temporary scope first,\\nand then dropping it if it is not an `ArrowExpression`.\\n\\nThis is stated in its [architecture document](https://github.com/evanw/esbuild/blob/master/docs/architecture.md#symbols-and-scopes):\\n\\n> This is mostly pretty straightforward except for a few places where the parser has pushed a scope and is in the middle of parsing a declaration only to discover that it\'s not a declaration after all. This happens in TypeScript when a function is forward-declared without a body, and in JavaScript when it\'s ambiguous whether a parenthesized expression is an arrow function or not until we reach the => token afterwards. This would be solved by doing three passes instead of two so we finish parsing before starting to set up scopes and declare symbols, but we\'re trying to do this in just two passes. So instead we call popAndDiscardScope() or popAndFlattenScope() instead of popScope() to modify the scope tree later if our assumptions turn out to be incorrect.\\n\\n---\\n\\n#### CoverCallExpressionAndAsyncArrowHead\\n\\n```markup\\nCallExpression :\\n    CoverCallExpressionAndAsyncArrowHead\\n\\nWhen processing an instance of the production\\nCallExpression : CoverCallExpressionAndAsyncArrowHead\\nthe interpretation of CoverCallExpressionAndAsyncArrowHead is refined using the following grammar:\\n\\nCallMemberExpression[Yield, Await] :\\n    MemberExpression[?Yield, ?Await] Arguments[?Yield, ?Await]\\n```\\n\\n```markup\\nAsyncArrowFunction[In, Yield, Await] :\\n    CoverCallExpressionAndAsyncArrowHead[?Yield, ?Await] [no LineTerminator here] => AsyncConciseBody[?In]\\n\\nCoverCallExpressionAndAsyncArrowHead[Yield, Await] :\\n    MemberExpression[?Yield, ?Await] Arguments[?Yield, ?Await]\\n\\nWhen processing an instance of the production\\nAsyncArrowFunction : CoverCallExpressionAndAsyncArrowHead => AsyncConciseBody\\nthe interpretation of CoverCallExpressionAndAsyncArrowHead is refined using the following grammar:\\n\\nAsyncArrowHead :\\n    async [no LineTerminator here] ArrowFormalParameters[~Yield, +Await]\\n```\\n\\nThese definitions define:\\n\\n```javascript\\nasync (a, b, c); // CallExpression\\nasync (a, b, c) => {} // AsyncArrowFunction\\n^^^^^^^^^^^^^^^ CoverCallExpressionAndAsyncArrowHead\\n```\\n\\nThis looks strange because `async` is not a keyword. The first `async` is a function name.\\n\\n---\\n\\n#### CoverInitializedName\\n\\n```markup\\n13.2.5 Object Initializer\\n\\nObjectLiteral[Yield, Await] :\\n    ...\\n\\nPropertyDefinition[Yield, Await] :\\n    CoverInitializedName[?Yield, ?Await]\\n\\nNote 3: In certain contexts, ObjectLiteral is used as a cover grammar for a more restricted secondary grammar.\\nThe CoverInitializedName production is necessary to fully cover these secondary grammars. However, use of this production results in an early Syntax Error in normal contexts where an actual ObjectLiteral is expected.\\n\\n13.2.5.1 Static Semantics: Early Errors\\n\\nIn addition to describing an actual object initializer the ObjectLiteral productions are also used as a cover grammar for ObjectAssignmentPattern and may be recognized as part of a CoverParenthesizedExpressionAndArrowParameterList. When ObjectLiteral appears in a context where ObjectAssignmentPattern is required the following Early Error rules are not applied. In addition, they are not applied when initially parsing a CoverParenthesizedExpressionAndArrowParameterList or CoverCallExpressionAndAsyncArrowHead.\\n\\nPropertyDefinition : CoverInitializedName\\n    I* t is a Syntax Error if any source text is matched by this production.\\n```\\n\\n```makrup\\n13.15.1 Static Semantics: Early Errors\\n\\nAssignmentExpression : LeftHandSideExpression = AssignmentExpression\\nIf LeftHandSideExpression is an ObjectLiteral or an ArrayLiteral, the following Early Error rules are applied:\\n    * LeftHandSideExpression must cover an AssignmentPattern.\\n```\\n\\nThese definitions define:\\n\\n```javascript\\n({ prop = value } = {}); // ObjectAssignmentPattern\\n({ prop = value }); // ObjectLiteral with SyntaxError\\n```\\n\\nParsers need to parse `ObjectLiteral` with `CoverInitializedName`,\\nand throw the syntax error if it does not reach `=` for `ObjectAssignmentPattern`.\\n\\nAs an exercise, which one of the following `=` should throw a syntax error?\\n\\n```javascript\\nlet { x = 1 } = { x = 1 } = { x = 1 }\\n```"},{"id":"/ecma-spec","metadata":{"permalink":"/javascript-parser-in-rust/blog/ecma-spec","editUrl":"https://github.com/Boshen/javascript-parser-in-rust/tree/main/blog/blog/ecma-spec.md","source":"@site/blog/ecma-spec.md","title":"The ECMAScript Specification","description":"The ECMAScript\xae 2023 Language Specification details everything about the JavaScript language, so anyone can implement their own JavaScript engine.","date":"2022-08-22T12:51:34.000Z","formattedDate":"August 22, 2022","tags":[],"readingTime":3,"hasTruncateMarker":true,"authors":[],"frontMatter":{"title":"The ECMAScript Specification"},"prevItem":{"title":"Grammar","permalink":"/javascript-parser-in-rust/blog/grammar"},"nextItem":{"title":"Conformance Tests","permalink":"/javascript-parser-in-rust/blog/conformance"}},"content":"[The ECMAScript\xae 2023 Language Specification](https://tc39.es/ecma262/) details everything about the JavaScript language, so anyone can implement their own JavaScript engine.\\n\\n\x3c!--truncate--\x3e\\n\\nThe following chapters need to be studied for our parser:\\n\\n- Chapter 5: Notational Conventions\\n- Chapter 11: ECMAScript Language: Source Text\\n- Chapter 12: ECMAScript Language: Lexical Grammar\\n- Chapter 13 - 16: Expressions, Statements, Functions, Classes, Scripts and Modules\\n- Annex B: Additional ECMAScript Features for Web Browsers\\n- Annex C: The Strict Mode of ECMAScript\\n\\nFor navigation inside the specification:\\n\\n- Anything clickable has a permanent link, they are shown on the URL as anchors, for example `#sec-identifiers`\\n- Hovering over things may show a tooltip, clicking on `References` shows all its references\\n\\n## Notational Conventions\\n\\n[Chapter 5.1.5 Grammar Notation](https://tc39.es/ecma262/#sec-grammar-notation) is the section we need to read.\\n\\nThe things to note here are:\\n\\n### Recursion\\n\\nThis is how lists are presented in the grammar.\\n\\n```markup\\nArgumentList :\\n  AssignmentExpression\\n  ArgumentList , AssignmentExpression\\n```\\n\\nmeans\\n\\n```javascript\\na, b = 1, c = 2\\n^_____________^ ArgumentList\\n   ^__________^ ArgumentList, AssignmentExpression,\\n          ^___^ AssignmentExpression\\n```\\n\\n### Optional\\n\\nThe `_opt_` suffix for optional syntax. For example,\\n\\n```markup\\nVariableDeclaration :\\n  BindingIdentifier Initializer_opt\\n```\\n\\nmeans\\n\\n```javascript\\nvar binding_identifier;\\nvar binding_identifier = Initializer;\\n                       ______________ Initializer_opt\\n```\\n\\n### Parameters\\n\\nThe `[Return]` and `[In]` are parameters of the grammar.\\n\\nFor example\\n\\n```markdup\\nScriptBody :\\n    StatementList[~Yield, ~Await, ~Return]\\n```\\n\\nmeans top-level yield, await and return are not allowed in scripts, but\\n\\n```markdup\\nModuleItem :\\n  ImportDeclaration\\n  ExportDeclaration\\n  StatementListItem[~Yield, +Await, ~Return]\\n```\\n\\nallows for top-level return.\\n\\n## Source Text\\n\\n[Chapter 11.2 Types of Source Code](https://tc39.es/ecma262/#sec-types-of-source-code) tells us that\\nthere is a huge distinction between script code and module code.\\nAnd there is a `use strict` mode that makes the grammar saner by disallowing old JavaScript behaviors.\\n\\n**Script Code** is not strict, `use strict` need to be inserted at the top of the file to make script code strict.\\nIn html we write `<script src=\\"javascript.js\\"><\/script>`.\\n\\n**Module Code** is automatically strict.\\nIn html we write `<script type=\\"module\\" src=\\"main.mjs\\"><\/script>`.\\n\\n## ECMAScript Language: Lexical Grammar\\n\\nFor more in-depth explanation, read the V8 blog on [Understanding the ECMAScript spec](https://v8.dev/blog/understanding-ecmascript-part-3).\\n\\n### [Automatic Semicolon Insertion](https://tc39.es/ecma262/#sec-automatic-semicolon-insertion)\\n\\nThis section describes all the rules where we can omit a semicolon while writing JavaScript.\\nAll the explanation boils down to\\n\\n```rust\\n    pub fn asi(&mut self) -> Result<()> {\\n        if self.eat(Kind::Semicolon) || self.can_insert_semicolon() {\\n            return Ok(());\\n        }\\n        let range = self.prev_node_end..self.cur_token().start;\\n        Err(SyntaxError::AutoSemicolonInsertion(range.into()))\\n    }\\n\\n    pub const fn can_insert_semicolon(&self) -> bool {\\n        self.cur_token().is_on_new_line || matches!(self.cur_kind(), Kind::RCurly | Kind::Eof)\\n    }\\n```\\n\\nThe `asi` function need to be manually called where applicable, for example in the end of statement:\\n\\n```rust\\n    fn parse_debugger_statement(&mut self) -> Result<Statement<\'a>> {\\n        let node = self.start_node();\\n        self.expect(Kind::Debugger)?;\\n        // highlight-next-line\\n        self.asi()?;\\n        self.ast.debugger_statement(self.finish_node(node))\\n    }\\n```\\n\\n:::info\\n\\nThis section on asi is written with a parser in mind,\\nit explicitly states that the source text is parsed from left to right,\\nwhich makes it almost impossible to write the parser in any other way.\\nThe author of jsparagus made a rant about this [here](https://github.com/mozilla-spidermonkey/jsparagus/blob/master/js-quirks.md#automatic-semicolon-insertion-).\\n\\n> The specification for this feature is both very-high-level and weirdly procedural (\u201cWhen, as the source text is parsed from left to right, a token is encountered...\u201d, as if the specification is telling a story about a browser. As far as I know, this is the only place in the spec where anything is assumed or implied about the internal implementation details of parsing.) But it would be hard to specify ASI any other way.\\n\\n:::\\n\\n## Expressions, Statements, Functions, Classes, Scripts and Modules\\n\\nIt takes a while to understand the syntactic grammar, then apply them to writing a parser.\\nMore in-depth content can be found in [the grammar tutorial](./blog/grammar).\\n\\n## Annex B"},{"id":"/conformance","metadata":{"permalink":"/javascript-parser-in-rust/blog/conformance","editUrl":"https://github.com/Boshen/javascript-parser-in-rust/tree/main/blog/blog/conformance.md","source":"@site/blog/conformance.md","title":"Conformance Tests","description":"This article details three github repositories for testing our parser against JavaScript and TypeScript grammar.","date":"2022-08-22T12:51:34.000Z","formattedDate":"August 22, 2022","tags":[],"readingTime":0.55,"hasTruncateMarker":true,"authors":[],"frontMatter":{"title":"Conformance Tests"},"prevItem":{"title":"The ECMAScript Specification","permalink":"/javascript-parser-in-rust/blog/ecma-spec"}},"content":"This article details three github repositories for testing our parser against JavaScript and TypeScript grammar.\\n\\n\x3c!--truncate--\x3e\\n\\n## Test262\\n\\nJavaScript has the [ECMAScript Test Suite](https://github.com/tc39/test262) called Test262.\\nThe goal of Test262 is to provide test material that covers every observable behavior specified in the specification.\\n\\nFor testing conformance, please checkout its [parse phase tests](https://github.com/tc39/test262/blob/main/INTERPRETING.md#negative).\\n\\n## Babel\\n\\nWhen new language features are added to JavaScript, it is required to have them get parsed by Babel.\\nSo Babel has another set of [parser tests](https://github.com/babel/babel/tree/main/packages/babel-parser/test).\\n\\n## TypeScript\\n\\nThe TypeScript conformance tests can be found [here](https://github.com/microsoft/TypeScript/tree/main/tests/cases/conformance).\\n\\n## Test Runner\\n\\nRome has implemented a test runner for the above test suites, they can be found [here](https://github.com/rome/tools/tree/main/xtask/coverage)."}]}')}}]);