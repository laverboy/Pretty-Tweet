/*
 * JavaScript Pretty Date
 * Copyright (c) 2011 John Resig (ejohn.org)
 * Licensed under the MIT and GPL licenses.
 */

// Takes an ISO time and returns a string representing how
// long ago the date represents.
function prettyDate(time){
    var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
        diff = (((new Date()).getTime() - date.getTime()) / 1000),
        day_diff = Math.floor(diff / 86400);
            
    if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 ) {return;}
            
    return day_diff === 0 && (
            diff < 60 && "just now" ||
            diff < 120 && "1 minute ago" ||
            diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
            diff < 7200 && "1 hour ago" ||
            diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
        day_diff === 1 && "Yesterday" ||
        day_diff < 7 && day_diff + " days ago" ||
        day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks ago";
}

// If jQuery is included in the page, adds a jQuery plugin to handle it as well
if ( typeof jQuery !== "undefined" ){
    jQuery.fn.prettyDate = function(){
        return this.each(function(){
            var date = prettyDate(this.title);
            if ( date ) { jQuery(this).text( date ); }
        });
    };
}
    
//=====================================================================================//
(function ($) {
    jQuery.fn.prettytweet = function(user){
        var el = $(this);
        el.html('Loading latest tweet&hellip;');
        var request = $.ajax({
            url: 'https://api.twitter.com/1/statuses/user_timeline.json?screen_name='+ user +'&count=1',
            dataType: 'jsonp',
            timeout: 5000
        });
        request.done(function(data){
            // result returned
            var tweet = data[0].text;
    
            tweet = tweet
            // process links
            .replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, '<a href="$1">$1</a>')
            // process usernames
            .replace(/(^|\s)@(\w+)/g, '$1<a href="http://www.twitter.com/$2">@$2</a>')
            // process hashes
            .replace(/(^|\s)#(\w+)/g, '$1#<a href="http://search.twitter.com/search?q=%23$2">$2</a>');
    
            var fulldate = data[0].created_at,
            date = prettyDate(fulldate) || fulldate.substring(4,10),
            dateText = '<br /> <abbr title="' + fulldate + '">' + date + '</abbr>';

            tweet = tweet + dateText;
    
            // output the result
            el.html(tweet);
        });

        request.fail(function(data){
            el.html("I'm sorry but there seems to have been an error retrieving the latest tweet. Please try again later.");
        });
    };
    $('[data-prettytweet]').each(function(key,item)  { $(item).prettytweet($(item).data('prettytweet')); });
    
})(jQuery);

console.log('hi');