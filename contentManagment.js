/*
Main Guidelines for Functions parameters.

content:
Refers to html or text contents which can be passed into the functions.

className:
The "class" name of the element we’re targeting.

tag:
HTML tag type of the element we’re targeting with a class.
This parameter has to be set in case different HTML tags are using the same class. If passed blank all elements with
the same class will be targeted.

elementId:
The "ID" of the element we’re targeting.

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
*/

var ContentManagement = {
    // returns true is the string is blank
    isBlank: function(str)
    {
        return (!str || /^s*$/.test(str));
    },
    // returns true is the string is empty
    isEmpty: function(str)
    {
        return (!str || 0 === str.length);
    },
    //return true is a string is either empty or blank
    hasValue: function(str)
    {
        return (!this.isBlank(str) && !this.isEmpty(str));
    },
    // returns a list of elements with the matching class for a specific tag
    getElementsByClass: function(className, tag)
    {
        if (!this.hasValue(tag)) tag = '*';
        var hasClassName = new RegExp("(?:^|s)" + className + "(?:$|s)");
        var allElements = document.getElementsByTagName(tag);
        var results = [];
        var element;
        for (var i = 0; (element = allElements[i]) !== null; i++)
        {
            var elementClass = element.className;
            if (elementClass && elementClass.indexOf(className) != -1 && hasClassName.test(elementClass))
            {
                results.push(element);
            }
        }
        return results;
    },
    //Change the content of all tags with have matching class
    changeHtmlContentByClass: function(content, className, tag)
    {
        var results = [];
        results = this.getElementsByClass(className, tag);
        for (var i = 0; i < results.length; i++)
        {
            results[i].innerHTML = content;
        }
    },
    //Change the content of the first element with the specified id
    changeHtmlContentByID: function(content, elementId)
    {
        var element = document.getElementById(elementId);
        if (typeof(element) != 'undefined' && element !== null)
        {
            element.innerHTML = content;
        }
    },
    //Add content to a list of matching elements by Class name
    addHtmlContentByClass: function(content, className, tag, position)
    {
        var results = [];
        results = this.getElementsByClass(className, tag);
        for (var i = 0; i < results.length; i++)
        {
            if (position == 1)
            {
                results[i].innerHTML = content + results[i].innerHTML;
            }
            else
            {
                results[i].innerHTML = results[i].innerHTML + content;
            }
        }
    },
    //Appends content to the first element with the specified class
    appendHtmlContentByClass: function(content, className, tag, contentTag, contentID)
    {
        var results = [];
        results = this.getElementsByClass(className, tag);
        if (results.length > 0) {
            //only use first element in the list
            var element = results[0];
            if (!this.hasValue(contentTag))
            {
                contentTag = 'div';
            }
            if (!this.hasValue(contentID))
            {
                contentID = 'customContent';
            }
            if (typeof(element) != 'undefined' && element !== null)
            {
                var newTag = document.createElement(contentTag);
                newTag.setAttribute('id', contentID);
                element.appendChild(newTag);
                newTag.innerHTML = content;
            }
        }
    },
    //Add content to the first element with the specified id
    addHtmlContentByID: function(content, elementId, position)
    {
        var element = document.getElementById(elementId);
        if (typeof(element) != 'undefined' && element !== null)
        {
            if (position == 1)
            {
                element.innerHTML = content + element.innerHTML;
            }
            else {
                element.innerHTML = element.innerHTML + content;
            }
        }
    },
    //Appends content to the first element with the specified id
    appendHTMLContentByID: function(content, elementId, contentTag, contentID)
    {
        var element = document.getElementById(elementId);
        if (!this.hasValue(contentTag))
        {
            contentTag = 'div';
        }
        if (!this.hasValue(contentID))
        {
            contentID = 'customContent';
        }
        if (typeof(element) != 'undefined' && element !== null)
        {
            var newTag = document.createElement(contentTag);
            newTag.setAttribute('id', contentID);
            element.appendChild(newTag);
            newTag.innerHTML = content;
        }
    },
    //Add content to a list of matching elements by Class name, only if a specific field-value pair is passed in the query string
    //Criteria:Criteria is the paramenter name.
    //Value:Parameter Value
    addHtmlContentByCriteriaByClass: function(content, className, tag, position, criteria, value)
    {
        if (this.ParameterByName(criteria) == value)
        {
            this.addHtmlContentByClass(content, className, tag, position);
        }
    },
    //Add content to a matching elements by id, only if a specific field-value pair is passed in the query string
    //Criteria:Criteria is the paramenter name.
    //Value:Parameter Value
    addHtmlContentByCriteriaByID: function(content, elementId, position, criteria, value)
    {
        if (this.ParameterByName(criteria) == value)
        {
            this.addHtmlContentByID(content, elementId, position);
        }
    },
    //move the content from one element into a different element
    moveHtmlContentByID: function(elementId, newId)
    {
        var element = document.getElementById(elementId);
        var newElement = document.getElementById(newId);
        if ((typeof(element) != 'undefined' && element !== null) && (typeof(newElement) != 'undefined' && newElement !== null))
        {
            newElement.innerHTML = element.innerHTML;
            this.removeElementByID(elementId);
        }
    },
    //Remove a List of elements with a matching class
    removeElementByClass: function(className, tag)
    {
        var results = [];
        var element;
        results = this.getElementsByClass(className, tag);
        for (var i = 0; i < results.length; i++)
        {
            element = results[i];
            element.parentNode.removeChild(element);
        }
    },
    //Remove an elements with a matching id
    removeElementByID: function(elementId)
    {
        var element;
        return (element = document.getElementById(elementId)) ? element.parentNode.removeChild(element) : false;
    },
    //Return the content of an elements with a matching id
    getContentByID: function(elementId)
    {
        var element = document.getElementById(elementId);
        if (typeof(element) != 'undefined' && element !== null)
        {
            return element.innerHTML;
        }
        return '';
    },
    //Return the content of first matching element by Class name
    getContentByClass: function(className, tag)
    {
        var results = [];
        results = this.getElementsByClass(className, tag);
        if (results.length > 0)
        {
            var element = results[0];
            if (typeof(element) != 'undefined' && element !== null)
            {
                return element.innerHTML;
            }
        }
        return '';
    },
    //Clear the content of first matching element by Class name
    clearContentByClass: function(className, tag)
    {
        var results = [];
        var element;
        results = this.getElementsByClass(className, tag);
        for (var i = 0; i < results.length; i++)
        {
            element = results[i];
            while (element.hasChildNodes())
            {
                element.removeChild(element.lastChild);
            }
        }
    },
    //Clear the content of matching element by id
    clearContentById: function(elementId)
    {
        var element = document.getElementById(elementId);
        while (element.hasChildNodes())
        {
            element.removeChild(element.lastChild);
        }
    },
    //Add content to the parent of first matching element by Class name
    addHTMLContentToParentByClass: function(content, className, tag, contentID, contentTag)
    {
        var results = [];
        results = this.getElementsByClass(className, tag);
        if (!this.hasValue(contentTag))
        {
            contentTag = 'div';
        }

        if (results.length > 0)
        {
            //Only use first element in the list
            var element = results[0].parentNode;
            if (typeof(element) != 'undefined' && element !== null)
            {
                var newTag = document.createElement(contentTag);
                newTag.setAttribute('id', contentID);
                element.appendChild(newTag);
                newTag.innerHTML = content;
            }
        }
    },
    //Add content to the parent of the first element with the specified id
    addHTMLContentToParentByID: function(content, contentID, elementId, contentTag)
    {
        var element = document.getElementById(elementId);
        element = element.parentNode;
        if (!this.hasValue(contentTag))
        {
            contentTag = 'div';
        }
        if (typeof(element) != 'undefined' && element !== null)
        {
            var newTag = document.createElement(contentTag);
            newTag.setAttribute('id', contentID);
            element.appendChild(newTag);
            newTag.innerHTML = content;
        }
    },
    //Change image source for all matching element by Class name
    changeImageByClass: function(path, className)
    {
        var results = this.getElementsByClass(className, 'img');
        for (var i = 0; i < results.length; i++)
        {
            results[i].src = path;
        }
    },
    //Change image source of the first element with the specified id
    changeImageByID: function(path, elementId)
    {
        var element = document.getElementById(elementId);
        if (typeof(element) != 'undefined' && element !== null)
        {
            element.src = path;
        }
    },
    //Change image source based on the current image path
    changeImageByPath: function(oldPath, newPath)
    {
        var allImages = document.getElementsByTagName('img');
        var element;
        for (var i = 0, max = allImages.length; i < max; i++)
        {
            if (allImages[i].src === oldPath)
            {
                element = allImages[i];
                if (typeof(element) != 'undefined' && element !== null)
                {
                    element.src = newPath;
                }
            }
        }
    },
    //Change link href for all matching element by Class name
    changeHrefByClass: function(path, className)
    {
        var results = this.getElementsByClass(className, 'a');
        for (var i = 0; i < results.length; i++)
        {
            results[i].href = path;
        }
    },
    //Change link href of the first element with the specified id
    changeHrefByID: function(path, elementId)
    {
        var element = document.getElementById(elementId);
        if (typeof(element) != 'undefined' && element !== null)
        {
            element.href = path;
        }
    },
    //Change link href based on the current link url
    changeHrefByPath: function(oldPath, newPath)
    {
        var allAtags = document.getElementsByTagName('a');
        var element;
        for (var i = 0, max = allAtags.length; i < max; i++)
        {
            if (allAtags[i].href === oldPath)
            {
                element = allAtags[i];
                break;
            }
        }
        if (typeof(element) != 'undefined' && element !== null)
        {
            element.href = newPath;
        }
    },
    //Add external script and css files to document
    loadjscssfile: function(filename, filetype, where)
    {
        var fileref;
        if (filetype == "js")
        {
            fileref = document.createElement("script");
            fileref.setAttribute("type", "text/javascript");
            fileref.setAttribute("src", filename);
        }
        else if (filetype == "css")
        {
            fileref = document.createElement("link");
            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", filename);
        }
        if (typeof fileref != "undefined")
        {
            if (where == "head")
            {
                document.getElementsByTagName("head")[0].appendChild(fileref);
            }
            else
            {
                document.getElementsByTagName("body")[0].appendChild(fileref);
            }
        }
    },
    //Add inline css to all matching element by Class name
    changeCssByClass: function(property, value, className, tag)
    {
        var results = [];
        var st = property + ":" + value + ";";
        results = this.getElementsByClass(className, tag);
        for (var i = 0; i < results.length; i++)
        {
            results[i].setAttribute("style", st);
        }
    },
    //Add inline css to the first element with the specified id
    changeCssByID: function(property, value, elementId)
    {
        var element = document.getElementById(elementId);
        var st = property + ":" + value + ";";
        if (typeof(element) != 'undefined' && element !== null)
        {
            element.setAttribute("style", st);
        }
    },
    //icon object
    icon: function(o) {
        o.id = (typeof o.id == 'undefined') ? '': o.id;
        o.title = (typeof o.title == 'undefined') ? '': o.title;
        o.image = (typeof o.image == 'undefined') ? '': o.image;
        o.href = (typeof o.href == 'undefined') ? '': o.href;
        o.target = (typeof o.target == 'undefined') ? '_blank': o.target;
        return o;
    },
    //Add a list of icons to the first element with the specified id
    //icons: an array of icon abjects
    addCustomIconsByID: function(elementId, icons)
    {
        var content = '';
        var ic;
        for (var i = 0; i < icons.length; i++)
        {
            ic = icons[i];
            content += '<a id="' + ic.id + '" target="' + ic.target + '" href="' + ic.href + '"><img alt="' + ic.title + '" src="' + ic.image + '"></a>';
        }
        if (content > '')
        {
            var newdiv = document.createElement('div');
            newdiv.setAttribute('class', 'customIcons');
            var element = document.getElementById(elementId);
            element.appendChild(newdiv);
            newdiv.innerHTML = content;
        }
    },
    //Add a list of icons to the first matching element by Class name
    //icons: an array of icon abjects
    addCustomIconsByClass: function(className, tag, icons)
    {
        var content = '';
        var ic;
        for (var i = 0; i < icons.length; i++)
        {
            ic = icons[i];
            content += '<a id="' + ic.id + '" target="' + ic.target + '" href="' + ic.href + '"><img alt="' + ic.title + '" src="' + ic.image + '"></a>';
        }
        if (content > '')
        {
            var results = [];
            results = this.getElementsByClass(className, tag);
            if (results.length > 0)
            {
                var element = results[0];
                if (typeof(element) != 'undefined' && element !== null)
                {
                    var newdiv = document.createElement('div');
                    newdiv.setAttribute('class', 'customIcons');
                    element.appendChild(newdiv);
                    newdiv.innerHTML = content;
                }
            }
        }
    },
    //create a banner rotator which will be added to the first matching element by Class name
    //icons: an array of icon abjects
    AddRotatingIconByClass: function(className, tag, icons, width, height, time)
    {
        var content = '';
        var ic;
        for (var i = 0; i < icons.length; i++)
        {
            ic = icons[i];
            content += '<img id="' + ic.id + '" alt="' + ic.title + '" title="' + ic.title + '" src="' + ic.image + '"';
            if (ic.target == '_blank')
            {
                content += ' onclick="window.open('' + ic.href + '')" >';
            }
            else
            {
                content += ' onclick="location.href='' + ic.href + ''" >';
            }
        }
        if (content > '')
        {
            var css = document.createElement('style');
            css.type = 'text/css';
            var styles = '#rotatingIcon{position:relative;height:' + height + 'px;width:' + width + 'px;}';
            styles += '#rotatingIcon img{position:absolute;left:0;top:0;border:0;cursor:pointer;}';
            css.appendChild(document.createTextNode(styles));
            document.getElementsByTagName("head")[0].appendChild(css);
            var newdiv = document.createElement('div');
            newdiv.setAttribute('id', 'rotatingIcon');
            results = this.getElementsByClass(className, tag);
            if (results.length > 0)
            {
                var element = results[0];
                this.clearContentByClass(className, tag);
                element.appendChild(newdiv);
                newdiv.innerHTML = content;
                this.rotateIcons(time);
            }
        }
    },
    //create a banner rotator which will be added to the first matching element by id
    //icons: an array of icon abjects
    AddRotatingIconById: function(elementId, icons, width, height, time)
    {
        var content = '';
        var ic;
        for (var i = 0; i < icons.length; i++)
        {
            ic = icons[i];
            content += '<img id="' + ic.id + '" alt="' + ic.title + '" title="' + ic.title + '" src="' + ic.image + '"';
            if (ic.target == '_blank')
            {
                content += ' onclick="window.open('' + ic.href + '')" >';
            }
            else
            {
                content += ' onclick="location.href='' + ic.href + ''" >';
            }
        }
        if (content > '')
        {
            var css = document.createElement('style');
            css.type = 'text/css';
            var styles = '#rotatingIcon{ position:relative;height:' + height + 'px;width:' + width + 'px;}';
            styles += '#rotatingIcon img { position:absolute;left:0;top:0;border:0; cursor:pointer;}';
            css.appendChild(document.createTextNode(styles));
            document.getElementsByTagName("head")[0].appendChild(css);
            var newdiv = document.createElement('div');
            newdiv.setAttribute('id', 'rotatingIcon');
            var element = document.getElementById(elementId);
            if (typeof(element) != 'undefined' && element !== null)
            {
                this.clearContentById(elementId);
                element.appendChild(newdiv);
                newdiv.innerHTML = content;
                this.rotateIcons(time);
            }
        }
    },
    rotateIcons: function(time)
    {
        var img = document.getElementById('rotatingIcon').getElementsByTagName('img');
        var node = document.getElementById("rotatingIcon").firstChild.cloneNode(true);
        img[0].parentNode.removeChild(img[0]);
        document.getElementById("rotatingIcon").appendChild(node);
        window.setTimeout(function()
        {
            ContentManagement.rotateIcons(time);
        },
        time);
    },
    //If parameter found in QueryString the value will be returned
    ParameterByName: function(name)
    {
        name = name.replace(/[[]/, "[").replace(/[]]/, "]");
        var regexS = "[?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.search);
        if (results === null)
        return "";
        else
        return decodeURIComponent(results[1].replace(/+/g, " "));
    },

    //Cookie Functions
    secondsInMilliseconds: function(numseconds)
    {
        return numseconds * 1000;
    },
    minutesInMilliseconds: function(numminutes)
    {
        return this.secondsInMilliseconds(numminutes * 60);
    },
    hoursInMilliseconds: function(numhours)
    {
        return this.minutesInMilliseconds(numhours * 60);
    },
    daysInMilliseconds: function(numdays)
    {
        return this.hoursInMilliseconds(numdays * 24);
    },
    // Create Cookie
    createCookie: function(name, value, minutes, days)
    {
        var expiremilliseconds = 0;
        if (days > 0)
        {
            expiremilliseconds = this.daysInMilliseconds(days);
        }
        else if (minutes > 0)
        {
            expiremilliseconds = this.minutesInMilliseconds(minutes);
        }
        var currdate = new Date();
        var expirationdate = new Date(currdate.getTime() + expiremilliseconds);
        document.cookie = name + "=" + value + "; expires=" + expirationdate.toGMTString() + "; path=/";
    },
    //Read Cookie
    readCookie: function(name)
    {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++)
        {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
};

