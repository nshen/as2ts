AS2TS
=====

Convert `ActionScript 3` to `TypeScript` using pure HTML5.

Try it: 
---

http://www.nshen.net/as2ts/

Conversion:
---

- `Boolean` to `boolean`
- `uint` / `int` / `Number` to `number`
- `String` to `string`
- `:*` to `:any`
- `package` to `module`
- comment out `import` statements ?
- `public class` to `export class`
- `public final class` to `export class`
- `public interface` to `export interface`
- `public function class_name(...):void` to `constructor(...)`
- `internal` to `public`
- `static (public|private|protected)` to  `(public|private|protected) static`
- `(private|public|protected) var` to `(private|public|protected)`
- `(private|public|protected) const` to `(private|public|protected)`
- `(override) (private|public|protected) function` to `(private|public|protected)`
- `(private|public|protected) static var` to `(private|public|protected) static`
- `(private|public|protected) static const` to `(private|public|protected) static`
- `(private|public|protected) static function` to `(private|public|protected) static`
-  local `const` to `var`
- `A as B` to `<B> A`
- `:Array` to `:any[]`
- `:Vector.<type> =` to `type[] =`
- `:Vector.<type>;` to `type[];`
- `: Vector.<type> {` to `type[] {`
- `new Vector.<type>(7,true)` to `[]`
- `new <type>[1,2,3]` to `[1,2,3]`
- `Vector.<type>([1, 2, 3])` to `[1, 2, 3]`
- `trace` to `console.log`


Contact me:
---

nshen121[at]gmail.com