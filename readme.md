Pretty Tweet
============

Pretty Tweet is a really simple jQuery plugin that gets the latest tweet from
the provided username along with a pretty timestamp and highlighted links, users and hashes.

Usage
-----

Make sure both jQuery and Pretty Tweet are both included on the page then simply 
call the function on an empty element where you would like the tweet.

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
    <script src="/js/jquery.prettytweet.js" type="text/javascript"></script>
    
    <script type="text/javascript">
        jQuery(document).ready(function($){
        	$("#tweet").prettyTweet('mlaver');
        });
    </script>
    
That is all.