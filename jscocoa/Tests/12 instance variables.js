

	/*

		A class created with JSCocoaController.createClass holds a javascript hash as an instance variable.
		check get / set, hash count
		
	*/

	var count0 = JSCocoaController.JSCocoaHashCount

	// Count of instances hosting a js hash
	var initialHashCount = JSCocoaController.JSCocoaHashCount

	//
	// Allocate a class, set instance variables on it
	//
	var newClass = JSCocoaController.createClass_parentClass("InstanceVariableTester", "NSObject")

	var container = InstanceVariableTester.alloc.init
//	JSCocoaController.logInstanceStats
	
	container.myValue1 = 3.14
	container.myValue2 = 'Hello world !'
	
	container.jsTest = function (a, b) { return a+b }

//	JSCocoaController.log('container.myValue1=' + container.myValue1)
//	JSCocoaController.log('container.myValue2=' + container.myValue2)
//	JSCocoaController.log('container.jsTest(1, 2)=' + container.jsTest(1, 2))
	
	if (container.myValue1 != 3.14)				throw "(1) Invalid instance variable"
	if (container.myValue2 != 'Hello world !')	throw "(2) Invalid instance variable"
	if (container.jsTest(1, 2) != 3)			throw "(3) Invalid instance variable"	
	
	//
	// One more test with a derived class
	//
	var newClass2 = JSCocoaController.createClass_parentClass("InstanceVariableTester2", "InstanceVariableTester")
	var container2 = InstanceVariableTester2.alloc.init
//	JSCocoaController.logInstanceStats
	container2.myValue1 = 7.89

//	JSCocoaController.log('container2.myValue1=' + container2.myValue1)
	if (container2.myValue1 != 7.89)			throw "(4) Invalid instance variable"	
	


	// Test deletion
	delete container.myValue1
	if (('myValue1' in container) != false)		throw "(5) Couldn't delete instance variable"

//	JSCocoaController.log('JSCocoaHashCount=' + JSCocoaController.JSCocoaHashCount)

	// Test if we have two hash counts more
	var count1 = JSCocoaController.JSCocoaHashCount
	if (!hasObjCGC)
		if (count1 != (count0+2))	throw 'invalid hash count — got ' + count1 + ', expected ' + (count0+2) + ' (1)'

	// Release instances
	container.release
	container2.release
	container = null
	container2 = null

	// The following line is useless but throws off garbage collection. 
	// Without it, one instance of InstanceVariableTester sticks around until the next test run.
	var instanceCount1 = JSCocoaController.liveInstanceCount(InstanceVariableTester)
	
	// Collect
	__jsc__.garbageCollect
	var instanceCount2 = JSCocoaController.liveInstanceCount(InstanceVariableTester)

	// Test that objects and their hashes were deleted by expecting initial hash count
	var count2 = JSCocoaController.JSCocoaHashCount
//	JSCocoaController.log('********' + count0 + '****' + count1 + '*******' + count2)
//	JSCocoaController.logInstanceStats
	if (!hasObjCGC)
		if (Number(count2) != Number(count0))	throw 'invalid hash count after GC — got ' + count2 + ', expected ' + count0 + ' (2)'
