Content Management Library

This JavaScript library contains a set of functions which can be used for adding all sorts of contents to your 
website.
The code has been written in pure JavaScript without the use of any JavaScript Library like jQuery, therefore it can
be used in all the pages in our system.
The function in the Content Management Library can be categorized into the following categories:
• Content Manipulation
• Adding New Content
• Changing Existing Content
• Removing Content
• Image Manipulation
• Link Manipulation
-----------------------------
Main Guidelines for Functions parameters
content:
Refers to html or text contents which can be passed into the functions.

className:
The ”class” name of the element we’re targeting.

tag:
HTML tag type of the element we’re targeting with a class.
This parameter has to be set in case different HTML tags are using the same class. If passed blank all elements with
the same class will be targeted.

elementId:
The “ID” of the element we’re targeting.

Position:
0: Adds content to the end of the Block
1: Adds content to the Top of the Block

contentTag:
Declares the ID for the new HTML tag we want to add

contentID:
Identifies the ID for the target element

newID:
For all functions were we can pass criteria’s, this parameter defines which Query String parameter in the URL we’re 
targeting.

Criteria:
If you want to display a banner on a page only if a specific parameter has been passed in the querystring
Criteria is th eparamenter name.

Value:
Parameter Value

---------------------------










