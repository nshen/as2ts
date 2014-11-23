var as2ts;
(function (_as2ts) {
    function main() {
        checkAPI();
        new as2ts();
    }
    _as2ts.main = main;
    function checkAPI() {
        // Check for the various File API support.
        if (window.File && window.FileReader && window.FileList && window.Blob) {
        }
        else {
            alert('The File APIs are not fully supported in this browser.');
        }
    }
    var as2ts = (function () {
        function as2ts() {
            var _this = this;
            this.onDragOver = function (e) {
                e.stopPropagation();
                e.preventDefault();
                e.dataTransfer.dropEffect = 'copy';
            };
            this.onDrop = function (e) {
                e.stopPropagation();
                e.preventDefault();
                // this.className = "";//TODO:style
                var files = e.dataTransfer.files; // FileList object.
                if (files.length <= 0)
                    return;
                _this._zip = new JSZip();
                var output = [];
                var asFiles = [];
                var f;
                for (var i = 0; i < files.length; i++) {
                    f = files[i];
                    // Only process .as files.
                    if (!/\w+.as$/.test(f.name)) {
                        console.log(f.name + "  isn't a .as file.");
                        continue;
                    }
                    asFiles.push(f);
                    output.push('<li><strong>', f.name, '</strong></li>');
                }
                if (asFiles.length <= 0) {
                    document.getElementById("files_count").innerHTML = "No .as files found.";
                    document.getElementById('list').innerHTML = '';
                    return;
                }
                document.getElementById("files_count").innerHTML = asFiles.length + " .as files found.";
                document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
                _this._readCount = asFiles.length;
                for (var i = 0; i < asFiles.length; i++) {
                    _this.readText(asFiles[i]);
                }
            };
            this._readCount = 0;
            this._zip = new JSZip();
            // Setup the dnd listeners.
            var dropZone = document.getElementById('drop_zone');
            dropZone.addEventListener('dragover', this.onDragOver, false);
            dropZone.addEventListener('drop', this.onDrop, false);
            // Event Listener for when the dragged file enters the drop zone.
            dropZone.addEventListener('dragenter', function (e) {
                // this.className = "over";//TODO:style
            });
            // Event Listener for when the dragged file leaves the drop zone.
            dropZone.addEventListener('dragleave', function (e) {
                // this.className = "";//TODO:style
            });
        }
        as2ts.prototype.readText = function (f) {
            var _this = this;
            var reader = new FileReader();
            reader.onloadend = function (e) {
                if (reader.readyState == FileReader.DONE) {
                    var tsName = f.name.substring(0, f.name.length - 2) + "ts";
                    _this._zip.file(tsName, _this.convert(reader.result));
                    console.log(_this._zip.file(tsName).asText());
                    if (--_this._readCount <= 0) {
                        _this.finishConvert();
                    }
                }
            };
            reader.readAsText(f);
        };
        as2ts.prototype.convert = function (str) {
            //get all static variables
            //console.log(str.match(/(public|private|protected|internal)\s+static\s+var\s+(\w+)/g));
            //  Boolean to boolean
            str = str.replace(/\bBoolean\b/g, "boolean");
            //  uint/int/Number to number
            str = str.replace(/\b(int|uint|Number)\b/g, "number");
            //  String to string
            str = str.replace(/\bString\b/g, "string");
            //  * to any
            str = str.replace(/:\s*\*/g, ":any");
            //  'package' to 'module'
            str = str.replace(/package/, "module");
            //  comment out import statements
            str = str.replace(/import/g, "//import"); //?   /// <reference path="Validation.ts" />
            //  'public class' to 'export class'
            //  'public final class' to 'export class'
            str = str.replace(/public\s+(final\s+)?class/, "export class");
            //  'public interface' to 'export interface'
            str = str.replace(/public\s+interface/g, "export interface");
            // constructor
            var classNameResult = /export.class\s+(\w+)/.exec(str);
            if (classNameResult != null) {
                var className = classNameResult[1];
                var reg = new RegExp("public\\s+function\\s+" + className);
                str = str.replace(reg, "constructor");
                str = str.replace(/(constructor.+):.*void/, "$1"); //delete :void
            }
            //  'internal' to 'public'
            str = str.replace(/\binternal\b/g, "public");
            //  swap static order
            str = str.replace(/static\s+(public|private|protected)/g, "$1 static");
            //   'public var'                   to 'public'
            //   'public const'                 to 'public'
            //   '(override) public function'   to 'public'
            str = str.replace(/(override\s+)?(private|public|protected)\s+(var|const|function)/g, "$2");
            // 'public static var'       to  'public static'
            // 'public static const'     to  'public static'
            // 'public static function'  to  'public static'
            str = str.replace(/(public|private|protected)\s+static\s+(var|const|function)/g, "$1 static");
            // local const to var
            str = str.replace(/\bconst\b/g, "var");
            //  'trace' to 'console.log'
            str = str.replace(/trace\s*\(/g, "console.log(");
            //  'A as B' to '<B> A'
            str = str.replace(/(\w+)\s+(\bas\b)\s+(\w+)/g, "<$3> $1");
            //  ':Array' to 'any[]'
            str = str.replace(/:\s*Array/g, ":any[]");
            //  ':Vector.<number> =' to 'number[] ='
            str = str.replace(/:\s*Vector\.<(.+)>\s*=/g, ":$1[] =");
            //  ':Vector.<number>;' to 'number[];'
            str = str.replace(/:\s*Vector\.<(.+)>\s*;/g, ":$1[] ;");
            // ': Vector.<string> {' to 'string[] {'
            str = str.replace(/:\s*Vector\.<(.+)>\s*{/g, ":$1[] {");
            //  'new Vector.<uint>(7,true)' to '[]'
            str = str.replace(/new\s+Vector\.<.+>(\(.+\))?/g, "[]");
            //  'new <uint>[1,2,3]'   to  '[1,2,3]'
            str = str.replace(/new\s+<.+>(\[.*\])/g, "$1");
            //  'Vector.<uint>([1, 2, 3])' to '[1, 2, 3]'
            str = str.replace(/(=|\s)Vector\.<.+>\((\[.*\])\)/g, "$2");
            //TODO: add 'this.' to all instance methods
            //TODO: add 'className.' to all static methods
            return str;
        };
        as2ts.prototype.finishConvert = function () {
            var blob = this._zip.generate({ type: "blob" });
            saveAs(blob, "hello_TS.zip");
        };
        return as2ts;
    })();
    _as2ts.as2ts = as2ts;
})(as2ts || (as2ts = {}));
window.onload = as2ts.main;
//# sourceMappingURL=as2ts.js.map