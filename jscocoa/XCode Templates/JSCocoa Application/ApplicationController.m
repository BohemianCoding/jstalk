//
//  ApplicationController.m
//  �PROJECTNAME�
//
//  Created by �FULLUSERNAME� on �DATE�.
//  Copyright �ORGANIZATIONNAME� �YEAR�. All rights reserved.
//

#import "ApplicationController.h"


@implementation ApplicationController

- (void)awakeFromNib
{
	jsCocoaController = [JSCocoaController sharedController];
	// Load class construction kit
	id classJSFile = [NSString stringWithFormat:@"%@/Contents/Resources/class.js", [[NSBundle mainBundle] bundlePath]];
	[jsCocoaController evalJSFile:classJSFile];
	// Load our main class
	id mainJSFile = [NSString stringWithFormat:@"%@/Contents/Resources/�PROJECTNAME�.js", [[NSBundle mainBundle] bundlePath]];
	[jsCocoaController evalJSFile:mainJSFile];
}

- (void)applicationWillTerminate:(NSNotification *)notification
{
	[jsCocoaController release];
}


@end
