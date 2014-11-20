

/**
 *	This is a Test File
 */


var test:Vector.<Test> = new Vector.<Test>(7, true);   //length , fixed
trace(test); //0,0,0,0,0,0,0

var test2:Vector.<uint> = new <uint>[1,2,3];
trace(test2)

var test3:Vector.<uint> = Vector.<uint>([1, 2, 3]);
trace(test3);

var test4: Vector.<String>;


package net.nshen
{
	import flash.utils.Dictionary;
	import flash.display.*;
	public class Test
	{
	   

		static public var b1:Boolean = false;
		static private var b2: Boolean = true;
		static protected var b3:Boolean = true;
		
		public var n1:Number = 1;
		private var n2:int = 2;
		protected var n3:uint = 3;
		
		
		private var a:Number = 123;
		private function a():Number
		{
			return 123;
		}
		private static function a():void
		{
			trace(1111);
		}
		private static var a:String = '111';
		
		
		internal var abc:String  = "12345";
		internal   var    ccc:String = "sdfsdfsf";
		
		private static const ccc:*=123;
		public const ddd: *;
		protected static const c2:Boolean = true;
		private const c3:Number = 123;
		
		public var myf:Array = new Array();
		public function myf2(): Array
		{
		
		}
		
	
		
		public static function psf()
		{
		  trace(111);
		}
		
		private static function ccc(ccc:Boolean = true):void
		{
		  trace(222);
		}
	
		
		public function Test(a:Number=123 ,b:String):  dvoid
		{
		
			var test:Vector.<uint> = new Vector.<uint>(7, true);   //length , fixed
			trace(test); //0,0,0,0,0,0,0
			
			var test2:Vector.<uint> = new <uint>[1,2,3];
			test2.fixed = true;
			trace(test2)
			
			var test3:Vector.<uint> = Vector.<uint>([1, 2, 3]);
			test3.fixed = true;
			trace(test3);
		
			trace("abc"+123);
		    const b:Boolean = true;
		    var i:Number = abc as Number;
		    var i:Number = abc  as      Number;

		}
		
		
		
		override protected function abcdedffff():int
		{
			return super.abc();
		}
		private function incAssetCount() : void
		{
			_assetCount++; _assetNumber++;			
		}
		
		
		
	}
}