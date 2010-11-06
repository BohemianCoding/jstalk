

	/*
		auto setter
		object.setValue(v)
		object.value = v
	*/

//	JSCocoaController.sharedController.evalJSFile(NSBundle.mainBundle.bundlePath + '/Contents/Resources/class.js')

	// Define a new class
	var newClass = JSCocoaController.createClass_parentClass("AutoSetterTester", "NSObject")
	
	
	var	globalValue = null
	function	getterCall()
	{
//		JSCocoaController.log('Calling getter')
		return	globalValue
	}
	function	setterCall(newValue)
	{
//		JSCocoaController.log('Calling setter with newValue=' + newValue)
		globalValue = newValue
	}
	
	//
	// Test bool
	//
	var encoding = '*'
	var encodingName = reverseEncodings[encoding]

	// Add getter
	var fn			= getterCall
	var fnName		= 'myValue'
	var fnEncoding	= objc_encoding('charpointer')
	JSCocoaController.addInstanceMethod_class_jsFunction_encoding(fnName, AutoSetterTester, fn, fnEncoding)

	// Add setter
	var fn			= setterCall
	var fnName		= 'setMyValue:'
	var fnEncoding	= objc_encoding('void', 'charpointer')
//	JSCocoaController.log('e=' + fnEncoding);
	JSCocoaController.addInstanceMethod_class_jsFunction_encoding(fnName, AutoSetterTester, fn, fnEncoding)
	
	var o = AutoSetterTester.alloc.init
	o.release

	// Try standard setter as test
	var someNewValue = 'hello world !'
	o.setMyValue(someNewValue)
	var r1 = o.myValue
	var r2 = o.myValue
//	JSCocoaController.log('r1=' + r1 + '*')
//	JSCocoaController.log('r2=' + r2 + '*')
	if (r1 != someNewValue)	throw	'setter 1 failed - got ' + r1 + ', expecting ' + someNewValue + '.'
	if (r2 != someNewValue)	throw	'setter 2 failed - got ' + r2 + ', expecting ' + someNewValue + '.'
	
	// Try auto setter
	var someNewValue = 'bonjour monde !'
	o.myValue = someNewValue
	var r1 = o.myValue
	var r2 = o.myValue
//	JSCocoaController.log('auto r1=' + r1)
//	JSCocoaController.log('auto r2=' + r2)
	if ((r1) != someNewValue)	throw	'auto setter 1 failed'
	if ((r2) != someNewValue)	throw	'auto setter 2 failed'

	o = null
