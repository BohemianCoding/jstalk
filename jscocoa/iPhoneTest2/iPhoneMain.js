
	//
	// Application Delegate
	//
	Class('iPhoneTest2AppDelegate < NSObject').definition = function ()
	{
		Method('applicationDidFinishLaunching:').encoding('void id').fn = function (application)
		{
			// Table view background
			this.viewController.view.backgroundColor = UIColor.groupTableView0BackgroundColor
			this.window.addSubview(this.viewController.view)
			this.window.makeKeyAndVisible
			this.perform({selector:'repaintPolygon:', withObject:null, afterDelay:0})
		}
		// Shouldn't be needed !
		IBAction('repaintPolygon').fn = function()
		{
			this.viewController.polygonView.setNeedsDisplay
		}
		IBOutlet('window')
		IBOutlet('viewController')
	}


	//
	// View controller
	//
	Class('iPhoneTest2ViewController < UIViewController').definition = function()
	{
		Method('loadView').fn = function ()
		{
			myTableView = UITableView.instance({withFrame:UIScreen.mainScreen.applicationFrame, style:0 })	
			myTableView.delegate	= this
			myTableView.dataSource	= this
			myTableView.autoresizesSubviews = true
			this.view = myTableView
//			this.polygonView.pointCount = 5
			return	this.Super(arguments)
		}
		
		//
		// Table view
		//
		Method('numberOfSectionsInTableView:').encoding('int id').fn = function (tableView)
		{
			return	1
		}
		Method('tableView:numberOfRowsInSection:').encoding('int id int').fn = function (tableView, section)
		{
			return	2
		}
		Method('tableView:cellForRowAtIndexPath:').encoding('id id id').fn = function (tableView, indexPath)
		{
			if (!this.cells)
			{
				var cell0 = UITableViewCell.instance()
				var cell1 = UITableViewCell.instance()
				
				var bounds = this.view.bounds
				var margin = 50

				// Slider
				var slider = UISlider.instance({withFrame: new CGRect(margin, 12, bounds.size.width-margin*2, 10)})
				cell0.addSubview(slider)

				// Image buttons
				var imageButton = UIButton.instance({withFrame: new CGRect(25, 19, 12, 10)})
				var image = UIImage.imageNamed('lowPointCount.png')
				imageButton.set({image:image, forState:0})
				cell0.addSubview(imageButton)

				var imageButton = UIButton.instance({withFrame: new CGRect(bounds.size.width-38, 19, 12, 10)})
				var image = UIImage.imageNamed('hiPointCount.png')
				imageButton.set({image:image, forState:0})
				cell0.addSubview(imageButton)

				// Text label
				var label = UILabel.instance({withFrame: new CGRect(20, 8, 200, 30)})
				label.text = /*String(new Date)*/ 'Fill Polygon'
				label.font = UIFont.boldSystemFontOfSize(18)
				cell1.addSubview(label)

				// Switch
				var onoff = UISwitch.instance({withFrame: new CGRect(200, 9, bounds.size.width-margin*2, 80)})
				cell1.addSubview(onoff)

				this.cells = [cell0, cell1]


				slider.add({target:this, action:'pointCountChanged:', forControlEvents:0xffffffff})
				onoff.add({target:this, action:'fillModeChanged:', forControlEvents:0xffffffff})
			}
			return	this.cells[indexPath.row]
		}

		//
		// Actions
		//
		IBAction('fillModeChanged').fn = function (sender)
		{
			this.polygonView.isFilled = sender.isOn==1 ? true : false
			this.polygonView.setNeedsDisplay
		}
		IBAction('pointCountChanged').fn = function (sender)
		{
			this.polygonView.pointCount = Math.round(sender.value*10+5)
			this.polygonView.setNeedsDisplay
		}
		
		//
		// Outlets
		//
		IBOutlet('labelView')
		IBOutlet('polygonView')
	}
	
	
	//
	// Polygon view
	//
	Class('PolygonView < UIView').definition = function ()
	{
		Method('drawRect:').fn = function(rect)
		{
			var bounds = this.bounds
			var w = this.bounds.size.width/2
			var h = this.bounds.size.height/2
//			log('DRAW ' + this.pointCount + '*' + bounds.size.width + ' ' + this.isFilled)
			
			var scale = h*0.9
			if (!this.pointCount)
			{
				this.pointCount = 5
				this.backgroundColor = UIColor.groupTableViewBackgroundColor
				this.angleOffset = 0
				this.currentAngleOffset = 0
				this.dynamicScale = scale/2
			}
			this.backgroundColor = UIColor.groupTableViewBackgroundColor
			
			var ctx = UIGraphicsGetCurrentContext()
			CGContextSetShadow(ctx, new CGSize(0, -10), 4)
			// Using string 'kCGColorWhite' instead of constant — BAD — ##tocheck
			CGContextSetFillColorWithColor(ctx, CGColorGetConstantColor('kCGColorWhite'))
			CGContextSetStrokeColorWithColor(ctx, CGColorGetConstantColor('kCGColorWhite'))
			
			for (var i=0; i<=this.pointCount*2; i++)
			{
				var a = Math.PI*2*(i/(this.pointCount*2)) + this.angleOffset + this.currentAngleOffset
				var s = i&1 ? scale : this.dynamicScale
				var x = w + Math.sin(a)*s
				var y = h + Math.cos(a)*s
				if (i == 0)	CGContextMoveToPoint(ctx, x, y)
				else		CGContextAddLineToPoint(ctx, x, y)
			}
			if (this.isFilled)	CGContextFillPath(ctx)
			else				CGContextStrokePath(ctx)
		}
		
		Method('touchesBegan:withEvent:').fn = function (touches, event)
		{
			var touch = touches.anyObject
			this.locationStart = touch.locationInView(this)
			var x = this.locationStart.x-this.bounds.size.width/2
			var y = this.locationStart.y-this.bounds.size.height/2
			var distanceFromCenter = Math.sqrt(x*x+y*y)/(this.bounds.size.width/2)
			// Rotate when dragging from outside, Scale when dragging from inside
			this.action = distanceFromCenter > 0.7 ? 'rotating' : 'scaling'
		}
		Method('touchesMoved:withEvent:').fn = function (touches, event)
		{
			var touch = touches.anyObject
			var location = touch.locationInView(this)
			var w = this.bounds.size.width/2
			var h = this.bounds.size.height/2

			if (this.action == 'scaling')
			{
				var x = location.x-this.bounds.size.width/2
				var y = location.y-this.bounds.size.height/2
				var distanceFromCenter = Math.sqrt(x*x+y*y)///(this.bounds.size.width)
				this.dynamicScale = distanceFromCenter
			}
			else
			{
				var x0 = this.locationStart.x - w
				var y0 = this.locationStart.y - h
				var l0 = Math.sqrt(x0*x0+y0*y0); x0 /= l0, y0 /= l0
				
				var x1 = location.x - w
				var y1 = location.y - h
				var l1 = Math.sqrt(x1*x1+y1*y1); x1 /= l1, y1 /= l1
				
				this.currentAngleOffset = Math.acos(x0*x1 + y0*y1)
				this.currentAngleOffset = Math.atan2(x1, y1) - Math.atan2(x0, y0)
			}
			this.setNeedsDisplay
		}
		Method('touchesEnded:withEvent:').fn = function (touches, event)
		{
			this.angleOffset += this.currentAngleOffset
			this.currentAngleOffset = 0
		}
	}

