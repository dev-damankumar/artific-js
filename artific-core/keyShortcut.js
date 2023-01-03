let trimAll=function(el){
    var patt1 = /\s/g;
    var result = el.replace(patt1,"");
    return result 
}
var keyShortcut = new function () {

this.eventType = 'keydown'
this.eventTracker = new Array()
this.shortcutExists = new Array()

this.add = function (shortcut, callback, el) {
    shortcut = trimAll(shortcut)
    if (this.shortcutExists[shortcut] === true) {
        return
    }

    var element = el || document
    var keyTracker = function (e) {
        
        var event = e || window.event
       
        var keypress = (event.keyCode) ? event.keyCode : event.which
        var keyvalue =event.key.toLowerCase()
      
        var keycodes = {
            'backspace': 8,
            'tab': 9,
            'enter': 13,
            'return': 13,
            'esc': 27,
            'space': 32,
            'scroll': 145,
            'capslock': 20,
            'numlock': 144,
            'pause': 19,
            'break': 19,
            'insert': 45,
            'home': 36,
            'delete': 127,
            'end': 35,
            'pageup': 33,
            'pagedown': 34,
            'left': 37,
            'up': 38,
            'right': 39,
            'down': 40,
            'f1': 112,
            'f2': 113,
            'f3': 114,
            'f4': 115,
            'f5': 116,
            'f6': 117,
            'f7': 118,
            'f8': 119,
            'f9': 120,
            'f10': 121,
            'f11': 122,
            'f12': 123
        }
        var metaWanted = {
            'cmd': false,
            'ctrl': false,
            'shift': false,
            'alt': false
        }
        var metaPressed = {
            'cmd': event.metaKey,
            'ctrl': event.ctrlKey,
            'shift': event.shiftKey,
            'alt': event.altKey
        }

        var shortcuts = shortcut.split('+')
        var matches = 0
        for (var i = 0; i < shortcuts.length; i++) {

            if (shortcuts[i] == 'cmd') {
                metaWanted['cmd'] = true
                matches++
            } else if (shortcuts[i] == 'ctrl') {
                metaWanted['ctrl'] = true
                matches++
            } else if (shortcuts[i] == 'shift') {
                metaWanted['shift'] = true
                matches++
            } else if (shortcuts[i] == 'alt') {
                metaWanted['alt'] = true
                matches++
            } else if (shortcuts[i].length > 1) {
                if (keycodes[shortcuts[i]] == keypress) {
                    matches++
                }
            } else {
                if (shortcuts[i] === keyvalue) {
                    matches++
                }
            }
        }


        if (matches === shortcuts.length &&
            metaWanted['cmd'] === metaPressed['cmd'] &&
            metaWanted['ctrl'] === metaPressed['ctrl'] &&
            metaWanted['shift'] === metaPressed['shift'] &&
            metaWanted['alt'] === metaPressed['alt']) {

            callback(event)
        }
    }

    
    element.addEventListener(this.eventType, keyTracker)

    this.eventTracker[shortcut] = {
        'element': element,
        'callback': keyTracker
    }

    this.shortcutExists[shortcut] = true
}

this.remove = function (shortcut) {
    shortcut = shortcut.toLowerCase()
    if (this.eventTracker[shortcut]) {
        var element = this.eventTracker[shortcut]['element']
        var callback = this.eventTracker[shortcut]['callback']
        element.removeEventListener(this.eventType, callback, false)
        delete(this.eventTracker[shortcut])
        this.shortcutExists[shortcut] = false
    }
}
}()
