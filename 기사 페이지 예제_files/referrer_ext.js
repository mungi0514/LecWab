var mobStorage = {
    load : function(key) {
        return window.localStorage.getItem(key);
    },
    save : function(key, value) {
        window.localStorage.setItem(key, value);
    },
    clear : function() {
        window.localStorage.clear();
    }
}

var ref_url = document.referrer;
if(window.localStorage){
    if(document.referrer.indexOf("mediacategory.com") == -1) mobStorage.save("ref_url", document.referrer);
    ref_url = mobStorage.load('ref_url');
}

function isNotEmpty(value) {
    if (value == null || value == "" || value == "null"
        || typeof value == "undefined" || value == "undefined"
        || value == undefined)
        return false;
    else
        return true;
}

function getFromParam(url) {
    if (url.indexOf("www.mediacategory.com") > -1) {
        const regString = "[\\?&]from=([^&#]*)";
        const regExp = new RegExp(regString);
        const fromURL = regExp.exec(url);
        url = fromURL == null ? '' : unescape(fromURL[1]);
    }
    url = url.replace(/amp;/gi,"");
    return url;
}

function checkReferrer(siteUrl, locUrl) {
    if (!isNotEmpty(ref_url) || ref_url.indexOf(siteUrl) === -1) {
        return getFromParam(locUrl);
    }
    return getFromParam(ref_url);
}