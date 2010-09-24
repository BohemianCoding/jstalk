//
//  JSTBridge.h
//  jstalk
//
//  Created by August Mueller on 9/23/10.
//  Copyright 2010 Flying Meat Inc. All rights reserved.
//

#import <Cocoa/Cocoa.h>
#import <JavaScriptCore/JavaScriptCore.h>
#import "JSTBridgeSupportLoader.h"
#import "JSTBridgedObject.h"

@interface JSTBridge : NSObject {
    JSGlobalContextRef  _jsContext;
    JSClassRef _globalObjectClass;
    JSClassRef _bridgedObjectClass;
    JSClassRef _bridgedFunctionClass;
    
}


@property (assign) JSGlobalContextRef jsContext;

- (JSValueRef)evalJSString:(NSString*)script withPath:(NSString*)path;
- (JSTBridgedObject*)bridgedObjectForJSObject:(JSObjectRef)jsObj;
- (void)pushObject:(id)obj withName:(NSString*)name;

@end