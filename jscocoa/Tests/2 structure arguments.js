


	// Test NSPoint
	var p = NSMakePoint(10, 20)
	
	if (p.x != 10 || p.y != 20)	throw "invalid NSPoint"
	
	// Test NSRect
	var r = NSMakeRect(10, 20, 30, 40)
	
	if (r.origin.x != 10 || r.origin.y != 20 || r.size.width != 30 || r.size.height != 40)	throw "invalid NSRect"
	

	// Test structure passing
	var r2 = NSInsetRect(r, 1, 5)
	if (r2.origin.x != 11 || r2.origin.y != 25 || r2.size.width != 28 || r2.size.height != 30)	throw "invalid inset NSRect"


	// Test native JS structure
	var nativeJSRect = { origin : { x : 10, y : 20 }, size : { width : 30, height : 40 } }
	var r3 = NSInsetRect(nativeJSRect, 1, 5)
	if (	r2.origin.x != r3.origin.x
		||	r2.origin.y != r3.origin.y
		||	r2.size.width != r3.size.width 
		||	r2.size.height != r3.size.height)	throw "invalid native inset NSRect"
