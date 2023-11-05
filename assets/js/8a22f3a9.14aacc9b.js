"use strict";(self.webpackChunkjavascript_parser_in_rust=self.webpackChunkjavascript_parser_in_rust||[]).push([[367],{9613:(e,r,t)=>{t.d(r,{Zo:()=>c,kt:()=>d});var n=t(9496);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function l(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=n.createContext({}),p=function(e){var r=n.useContext(s),t=r;return e&&(t="function"==typeof e?e(r):i(i({},r),e)),t},c=function(e){var r=p(e.components);return n.createElement(s.Provider,{value:r},e.children)},u={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},m=n.forwardRef((function(e,r){var t=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=p(t),d=a,f=m["".concat(s,".").concat(d)]||m[d]||u[d]||o;return t?n.createElement(f,i(i({ref:r},c),{},{components:t})):n.createElement(f,i({ref:r},c))}));function d(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var o=t.length,i=new Array(o);i[0]=m;var l={};for(var s in r)hasOwnProperty.call(r,s)&&(l[s]=r[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var p=2;p<o;p++)i[p]=t[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,t)}m.displayName="MDXCreateElement"},3:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>s,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var n=t(2962),a=(t(9496),t(9613));const o={id:"errors",title:"Dealing with Errors"},i=void 0,l={unversionedId:"errors",id:"errors",title:"Dealing with Errors",description:"Quoting from the Dragon Book",source:"@site/docs/errors.md",sourceDirName:".",slug:"/errors",permalink:"/javascript-parser-in-rust/docs/errors",draft:!1,editUrl:"https://github.com/oxc-project/javascript-parser-in-rust/tree/main/docs/docs/errors.md",tags:[],version:"current",frontMatter:{id:"errors",title:"Dealing with Errors"},sidebar:"tutorialSidebar",previous:{title:"Parser",permalink:"/javascript-parser-in-rust/docs/parser"},next:{title:"Semantic Analysis",permalink:"/javascript-parser-in-rust/docs/semantics_analysis"}},s={},p=[{value:"The <code>Error</code> Trait",id:"the-error-trait",level:3},{value:"Fancy Error Report",id:"fancy-error-report",level:3}],c={toc:p};function u(e){let{components:r,...t}=e;return(0,a.kt)("wrapper",(0,n.Z)({},c,t,{components:r,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Quoting from the ",(0,a.kt)("a",{parentName:"p",href:"https://www.amazon.com/Compilers-Principles-Techniques-Tools-2nd/dp/0321486811"},"Dragon Book")),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"Most programming language specifications do not describe how a compiler should respond to errors; error handling is left to the compiler designer.\nPlanning the error handling right from the start can both simplify the structure of a compiler and improve its handling of errors.")),(0,a.kt)("p",null,"A fully recoverable parser can construct an AST no matter what we throw at it.\nFor tools such as linter or formatter, one would wish for a fully recoverable parser so we can act on part of the program."),(0,a.kt)("p",null,"A panicking parser will abort if there is any grammar mismatch, and a partially recoverable parser will recover from deterministic grammars."),(0,a.kt)("p",null,"For example, given a grammatically incorrect while statement ",(0,a.kt)("inlineCode",{parentName:"p"},"while true {}"),", we know it is missing round brackets,\nand the only punctuation it can have are round brackets, so we can still return a valid AST and indicate its missing brackets."),(0,a.kt)("p",null,"Most JavaScript parsers out there are partially recoverable, so we'll do the same and build a partially recoverable parser."),(0,a.kt)("admonition",{type:"info"},(0,a.kt)("p",{parentName:"admonition"},"The ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/rome/tools"},"Rome")," parser is a fully recoverable parser.")),(0,a.kt)("p",null,"Rust has the ",(0,a.kt)("inlineCode",{parentName:"p"},"Result")," type for returning and propagating errors.\nIn conjunction with the ",(0,a.kt)("inlineCode",{parentName:"p"},"?")," syntax, the parse functions will remain simple and clean."),(0,a.kt)("p",null,"It is common to wrap the Result type so we can replace the error later:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-rust"},"pub type Result<T> = std::result::Result<T, ()>;\n")),(0,a.kt)("p",null,"Our parse functions will return a Result, for example:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-rust"},"pub fn parse_binding_pattern(&mut self, ctx: Context) -> Result<BindingPattern<'a>> {\n    match self.cur_kind() {\n        Kind::LCurly => self.parse_object_binding_pattern(ctx),\n        Kind::LBrack => self.parse_array_binding_pattern(ctx),\n        kind if kind.is_binding_identifier() => {\n          // ... code omitted\n        }\n        // highlight-next-line\n        _ => Err(()),\n    }\n}\n")),(0,a.kt)("p",null,"We can add an ",(0,a.kt)("inlineCode",{parentName:"p"},"expect")," function for returning an error if the current token does not match the grammar:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-rust"},"/// Expect a `Kind` or return error\npub fn expect(&mut self, kind: Kind) -> Result<()> {\n    if !self.at(kind) {\n        return Err(())\n    }\n    self.advance();\n    Ok(())\n}\n")),(0,a.kt)("p",null,"And use it as such:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-rust"},"pub fn parse_paren_expression(&mut self, ctx: Context) -> Result<Expression> {\n    self.expect(Kind::LParen)?;\n    let expression = self.parse_expression(ctx)?;\n    self.expect(Kind::RParen)?;\n    Ok(expression)\n}\n")),(0,a.kt)("admonition",{type:"note"},(0,a.kt)("p",{parentName:"admonition"},"For completeness, the lexer function ",(0,a.kt)("inlineCode",{parentName:"p"},"read_next_token")," should also return ",(0,a.kt)("inlineCode",{parentName:"p"},"Result"),"\nwhen an unexpected ",(0,a.kt)("inlineCode",{parentName:"p"},"char")," is found when lexing.")),(0,a.kt)("h3",{id:"the-error-trait"},"The ",(0,a.kt)("inlineCode",{parentName:"h3"},"Error")," Trait"),(0,a.kt)("p",null,"To return specific errors, we need to fill in the ",(0,a.kt)("inlineCode",{parentName:"p"},"Err")," part of ",(0,a.kt)("inlineCode",{parentName:"p"},"Result"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-rust"},"pub type Result<T> = std::result::Result<T, SyntaxError>;\n                                            ^^^^^^^^^^^\n#[derive(Debug)]\npub enum SyntaxError {\n    UnexpectedToken(String),\n    AutoSemicolonInsertion(String),\n    UnterminatedMultiLineComment(String),\n}\n")),(0,a.kt)("p",null,"We call it ",(0,a.kt)("inlineCode",{parentName:"p"},"SyntaxError"),' because all "early error"s defined in the grammar section of the ECMAScript specification are syntax errors.'),(0,a.kt)("p",null,"To make this a proper ",(0,a.kt)("inlineCode",{parentName:"p"},"Error"),", it needs to implement the ",(0,a.kt)("a",{parentName:"p",href:"https://doc.rust-lang.org/std/error/trait.Error.html"},(0,a.kt)("inlineCode",{parentName:"a"},"Error")," Trait"),". For cleaner code, we can use macros from the ",(0,a.kt)("a",{parentName:"p",href:"https://docs.rs/thiserror/latest/thiserror"},(0,a.kt)("inlineCode",{parentName:"a"},"thiserror"))," crate:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-rust"},'#[derive(Debug, Error)]\npub enum SyntaxError {\n    #[error("Unexpected Token")]\n    UnexpectedToken,\n\n    #[error("Expected a semicolon or an implicit semicolon after a statement, but found none")]\n    AutoSemicolonInsertion,\n\n    #[error("Unterminated multi-line comment")]\n    UnterminatedMultiLineComment,\n}\n')),(0,a.kt)("p",null,"We can then add an ",(0,a.kt)("inlineCode",{parentName:"p"},"expect")," helper function for throwing an error if the token does not match:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-rust"},"/// Expect a `Kind` or return error\npub fn expect(&mut self, kind: Kind) -> Result<()> {\n    if self.at(kind) {\n        return Err(SyntaxError::UnExpectedToken);\n    }\n    self.advance(kind);\n    Ok(())\n}\n")),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"parse_debugger_statement")," can now use the ",(0,a.kt)("inlineCode",{parentName:"p"},"expect")," function for proper error management:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-rust"},"fn parse_debugger_statement(&mut self) -> Result<Statement> {\n    let node = self.start_node();\n    self.expect(Kind::Debugger)?;\n    Ok(Statement::DebuggerStatement {\n        node: self.finish_node(node),\n    })\n}\n")),(0,a.kt)("p",null,"Notice the ",(0,a.kt)("inlineCode",{parentName:"p"},"?")," after the ",(0,a.kt)("inlineCode",{parentName:"p"},"expect"),",\nit is a syntactic sugar called the ",(0,a.kt)("a",{parentName:"p",href:"https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html#a-shortcut-for-propagating-errors-the--operator"},'"question mark operator"')," for making the\nfunction return early if the ",(0,a.kt)("inlineCode",{parentName:"p"},"expect")," function returns a ",(0,a.kt)("inlineCode",{parentName:"p"},"Err"),"."),(0,a.kt)("h3",{id:"fancy-error-report"},"Fancy Error Report"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://docs.rs/miette/latest/miette"},(0,a.kt)("inlineCode",{parentName:"a"},"miette"))," is one of the nicest error reporting crate out there,\nit provides a fancy colored output"),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://raw.githubusercontent.com/zkat/miette/main/images/serde_json.png",alt:"miette"})),(0,a.kt)("p",null,"Add ",(0,a.kt)("inlineCode",{parentName:"p"},"miette")," to your ",(0,a.kt)("inlineCode",{parentName:"p"},"Cargo.toml")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-toml"},'[dependencies]\nmiette = { version = "5", features = ["fancy"] }\n')),(0,a.kt)("p",null,"We can wrap our ",(0,a.kt)("inlineCode",{parentName:"p"},"Error")," with ",(0,a.kt)("inlineCode",{parentName:"p"},"miette")," and not modify the ",(0,a.kt)("inlineCode",{parentName:"p"},"Result")," type defined in our parser:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-rust"},'pub fn main() -> Result<()> {\n    let source_code = "".to_string();\n    let file_path = "test.js".to_string();\n    let mut parser = Parser::new(&source_code);\n    parser.parse().map_err(|error| {\n        miette::Error::new(error).with_source_code(miette::NamedSource::new(file_path, source_code))\n    })\n}\n')))}u.isMDXComponent=!0}}]);