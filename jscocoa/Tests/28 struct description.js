

	/*
		
		log(new NSMakePoint(3, 4))
		-> prints a readable description of the struct

	*/


	var point = NSMakePoint(12, 27)
//log('point=' + point)
	if (point != '<NSPoint {x:12, y:27}>')										throw 'struct description failed (1)'
	
	var rect = NSMakeRect(1, 5, 8, 59483)
	if (rect.valueOf() != '<NSRect {origin:{x:1, y:5}, size:{width:8, height:59483}}>')		throw 'struct description failed (2)'

//	log('point=' + point)
//	log('rect=' + rect)

	point = null
	rect = null
	
/*	
	log('====dump====')
	for (var i in this)
	{
		var o = this[i]
		if (typeof o == 'function') log(i + '=[function]')
		else						log(i + '=' + o + ' [' + (typeof o) + ']')
		o = null
	}
	log('====dump====')
*/