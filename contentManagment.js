var ContentManagement = {
    isBlank: function(str)
    {
        return (!str || /^s*$/.test(str));
    },
    isEmpty: function(str)
    {
        return (!str || 0 === str.length);
    },
    hasValue: function(str)
    {
        return (!this.isBlank(str) && !this.isEmpty(str));
    },
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
    changeHtmlContentByClass: function(content, className, tag)
    {
        var results = [];
        results = this.getElementsByClass(className, tag);
        for (var i = 0; i < results.length; i++)
        {
            results[i].innerHTML = content;
        }
    },
    changeHtmlContentByID: function(content, elementId)
    {
        var element = document.getElementById(elementId);
        if (typeof(element) != 'undefined' && element !== null)
        {
            element.innerHTML = content;
        }
    },
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
    addHtmlContentByCriteriaByClass: function(content, className, tag, position, criteria, value)
    {
        if (this.ParameterByName(criteria) == value)
        {
            this.addHtmlContentByClass(content, className, tag, position);
        }
    },
    addHtmlContentByCriteriaByID: function(content, elementId, position, criteria, value)
    {
        if (this.ParameterByName(criteria) == value)
        {
            this.addHtmlContentByID(content, elementId, position);
        }
    },
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
    getContentByID: function(elementId)
    {
        var element = document.getElementById(elementId);
        if (typeof(element) != 'undefined' && element !== null)
        {
            return element.innerHTML;
        }
        return '';
    },
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

    removeElementByID: function(elementId)
    {
        var element;
        return (element = document.getElementById(elementId)) ? element.parentNode.removeChild(element) : false;
    },
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
    clearContentById: function(elementId)
    {
        var element = document.getElementById(elementId);
        while (element.hasChildNodes())
        {
            element.removeChild(element.lastChild);
        }
    },
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
    changeImageByClass: function(path, className)
    {
        var results = this.getElementsByClass(className, 'img');
        for (var i = 0; i < results.length; i++)
        {
            results[i].src = path;
        }
    },
    changeImageByID: function(path, elementId)
    {
        var element = document.getElementById(elementId);
        if (typeof(element) != 'undefined' && element !== null)
        {
            element.src = path;
        }
    },
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
    changeHrefByClass: function(path, className)
    {
        var results = this.getElementsByClass(className, 'a');
        for (var i = 0; i < results.length; i++)
        {
            results[i].href = path;
        }
    },
    changeHrefByID: function(path, elementId)
    {
        var element = document.getElementById(elementId);
        if (typeof(element) != 'undefined' && element !== null)
        {
            element.href = path;
        }
    },
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
    changeCssByID: function(property, value, elementId)
    {
        var element = document.getElementById(elementId);
        var st = property + ":" + value + ";";
        if (typeof(element) != 'undefined' && element !== null)
        {
            element.setAttribute("style", st);
        }
    },
    icon: function(o) {
        o.id = (typeof o.id == 'undefined') ? '': o.id;
        o.title = (typeof o.title == 'undefined') ? '': o.title;
        o.image = (typeof o.image == 'undefined') ? '': o.image;
        o.href = (typeof o.href == 'undefined') ? '': o.href;
        o.target = (typeof o.target == 'undefined') ? '_blank': o.target;
        return o;
    },
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
    // --------- Get QueryString parameters
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

    // ---------Cookie Functions
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

