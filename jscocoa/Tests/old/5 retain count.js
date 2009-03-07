

	/*
	Test object deallocation
	*/


/*
	var deallocatedMyTestObject = false
	function	myDealloc()
	{
//		JSCocoaController.log('>>>>autoReleasedObject=' + this + ' count=' + this.retainCount())
		JSCocoaController.log('>>>>MyTestObject=' + this + ' DEALLOC')
		deallocatedMyTestObject = true
		return	this.Super(arguments)
	}

	// Deriving from CALayer crashes weirdly when using DerivedClassFromCALayer.alloc.init
	var newClass = JSCocoaController.sharedController().createClass_parentClass("MyTestObject", "CALayer")
	// Ok
//	var newClass = JSCocoaController.sharedController().createClass_parentClass("MyTestObject", "NSObject")
	// Check ... OK !
//	var newClass = JSCocoaController.sharedController().createClass_parentClass("MyTestObject", "NSResponder")


//	var added = JSCocoaController.sharedController().overloadInstanceMethod_class_jsFunction('retain', objc_getClass("MyTestObject"), myRetain)
//	var added = JSCocoaController.sharedController().overloadInstanceMethod_class_jsFunction('release', objc_getClass("MyTestObject"), myRelease)

//	var autoReleasedObject = MyTestObject.layer()
//	var autoReleasedObject = MyTestObject.alloc.init
//	var autoReleasedObject = CALayer.alloc.init
//	var autoReleasedObject = SomeKindOfObject.alloc.init
//	autoReleasedObject.release
//	SomeKindOfObject
//	autoReleasedObject.release

//	var added = JSCocoaController.sharedController().overloadInstanceMethod_class_jsFunction('dealloc', objc_getClass("CALayer"), myDealloc)
	var added = JSCocoaController.sharedController().overloadInstanceMethod_class_jsFunction('dealloc', objc_getClass("MyTestObject"), myDealloc)

//var autoReleasedObject = CALayer.alloc.init
var autoReleasedObject = MyTestObject.layer
	
	JSCocoaController.log('>>>>>>>>>>someKindOfObjectAllocCount=' + ApplicationController.someKindOfObjectAllocCount + ' last=' + autoReleasedObject)
//	autoReleasedObject.release
	

	
	
*/	
	
	
	

//	JSCocoaController.log('autoReleasedObject=' + autoReleasedObject + ' count=' + autoReleasedObject.retainCount())
//	autoReleasedObject.release
/*

	function	performSelectorTarget(notif)
	{
		JSCocoaController.log('about to release autoReleasedObject=' + autoReleasedObject + ' count=' + autoReleasedObject.retainCount())
		autoReleasedObject = null
		// This will dealloc object in a next run loop run ...
		JSCocoaController.garbageCollect()

		JSCocoaController.log('passed GC')
		
//		if (!deallocatedMyTestObject)	JSCocoaController.logAndSay('retainCount - object was not deallocated')
		// ... so set a timer to be there and check it then.
		o.performSelector_withObject_afterDelay('callMe2:', null, 0.1)
		
		JSCocoaController.log('someKindOfObjectAllocCount***********=' + ApplicationController.someKindOfObjectAllocCount)
	}

	function	performSelectorTarget2(notif)
	{
		if (!deallocatedMyTestObject)	JSCocoaController.logAndSay('retainCount - object was not deallocated')
	}

	function	objc_encoding()
	{
		var encodings = { 	 'void' : 'v'
							,'id' : '@'
							}
		var encoding = encodings[arguments[0]]
		encoding += '@:'
		
		for (var i=1; i<arguments.length; i++)	encoding += encodings[arguments[i]]
		return	encoding
	}
	
	// Define a new class
	var newClass = JSCocoaController.sharedController().createClass_parentClass("PerformSelectorTester", "NSObject")
//	JSCocoaController.log('encoding=' + objc_encoding('void', 'id'))
	var added = JSCocoaController.sharedController().addInstanceMethod_class_jsFunction_encoding('callMe:', objc_getClass("PerformSelectorTester"), performSelectorTarget, objc_encoding('void', 'id'))
	var added = JSCocoaController.sharedController().addInstanceMethod_class_jsFunction_encoding('callMe2:', objc_getClass("PerformSelectorTester"), performSelectorTarget2, objc_encoding('void', 'id'))
	
	var o = PerformSelectorTester.alloc().init()
	o.performSelector_withObject_afterDelay('callMe:', null, 0)

*/