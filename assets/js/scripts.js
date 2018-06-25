var Messenger = function(el){
    'use strict';
    var m = this;
    
    m.init = function(){
      m.codeletters = "&#*+%?£@§$";
      m.message = 0;
      m.current_length = 0;
      m.fadeBuffer = false;
      m.messages = [
        'HELLO WORLD',
        'JOSHUA BOHDE',
        'DEVELOPER',
        'JOSHUA BOHDE',
        'FULL STACK',
        'JOSHUA BOHDE',
        'PROGRAMMER',
      ];
      
      setTimeout(m.animateIn, 150);
    };
    
    m.generateRandomString = function(length){
      var random_text = '';
      while(random_text.length < length){
        random_text += m.codeletters.charAt(Math.floor(Math.random()*m.codeletters.length));
      } 
      
      return random_text;
    };
    
    m.animateIn = function(){
      if(m.current_length < m.messages[m.message].length){
        m.current_length = m.current_length + 2;
        if(m.current_length > m.messages[m.message].length) {
          m.current_length = m.messages[m.message].length;
        }
        
        var message = m.generateRandomString(m.current_length);
        $(el).html(message);
        
        setTimeout(m.animateIn, 20);
      } else { 
        setTimeout(m.animateFadeBuffer, 20);
      }
    };
    
    m.animateFadeBuffer = function(){
      if(m.fadeBuffer === false){
        m.fadeBuffer = [];
        for(var i = 0; i < m.messages[m.message].length; i++){
          m.fadeBuffer.push({c: (Math.floor(Math.random()*12))+1, l: m.messages[m.message].charAt(i)});
        }
      }
      
      var do_cycles = false;
      var message = ''; 
      
      for(var i = 0; i < m.fadeBuffer.length; i++){
        var fader = m.fadeBuffer[i];
        if(fader.c > 0){
          do_cycles = true;
          fader.c--;
          message += m.codeletters.charAt(Math.floor(Math.random()*m.codeletters.length));
        } else {
          message += fader.l;
        }
      }
      
      $(el).html(message);
      
      if(do_cycles === true){
        setTimeout(m.animateFadeBuffer, 50);
      } else {
        setTimeout(m.cycleText, 2000);
      }
    };
    
    m.cycleText = function(){
      m.message = m.message + 1;
      if(m.message >= m.messages.length){
        m.message = 0;
      }
      
      m.current_length = 0;
      m.fadeBuffer = false;
      $(el).html('');
      
      setTimeout(m.animateIn, 200);
    };
    
    m.init();
  }
  
  console.clear();
  var messenger = new Messenger($('#messenger'));

  /*
* Author:      Marco Kuiper (http://www.marcofolio.net/)
*/

// Speed of the quotation marks to show
var quoteSpeed = 500;

// Speed of the quote container to expand
var quoteContainerSpeed = 1000;

// Time the quote will be visible
var showQuoteSpeed = 10000;

// Time the screen will be empty
var cleanScreenSpeed = 500;

// Width of the quote box
// Would be cool to automatically grow to the containing text size in the future.
var quoteBoxWidth = "60%";

// The quotes we'll show
var quotes = [ {
		"quote" : "I was lucky to work with Josh during two very challenging project. He's as creative as he is diligent when it comes to facing challenges head-first, as he demonstrated by playing an essential role in structuring the wireframe and routing for our web apps as well as supporting the frontend with a keen eye for design and styling. I would love to keep working with him in future projects and would highly recommend him as a team player without hesitation.",
		"author" : "- Alberto Vargas"
	}, {
		"quote" : "Computers are good at following instructions, but not at<br />reading your mind.",
		"author" : "- Donald Knuth"
	}, {
		"quote" : "Copy and paste<br />is a design error.",
		"author" : "- David Parnas"
	}, {
		"quote" : "If you make everything bold,<br />nothing is bold.",
    "author" : "- Art Webb"
  }
	// }, {
	// 	"quote" : "Technical skill is mastery of complexity, while creativity is mastery of simplicity.",
	// 	"author" : "- Christopher Zeeman"
	// }, {
	// 	"quote" : "First, solve the problem. Then, write the code.",
	// 	"author" : "- John Johnson"
	// }
];

// The quote index to start with
var currentQuoteIndex = 1;

// Document ready
$(document).ready(function()
{	
	// // Webkit seems to have different ways of cerning the quotation marks
	// // This little hack makes sure it's in the correct position
	// if($.browser.webkit) {
	// 	$(".quotemark").css({ "margin-top" : "-22px" });
	// 	$(".rightquote").css({ "margin-top" : "-24px" });
	// }	
	
	startAnimation();
});

/* Starts the animation */
var startAnimation = function() {
	setTimeout(function() {
		showLeftQuote();
	}, quoteSpeed);	
}

/* Shows left quote */
var showLeftQuote = function() {
  $(".leftquote").css({ "margin-left" : "15%" }).show()
 
	setTimeout(function() {
		showRightQuote();
	}, quoteSpeed);
};

/* Shows right quote */
var showRightQuote = function() {
  $(".rightquote").css({ "margin-left" : "50px" }).show();
	
	setTimeout(function() {
		showQuoteContainer();
	}, quoteSpeed);
};

/* Shows the quote container */
var showQuoteContainer = function() {
	// Small fix for the right quotation mark
	$(".rightquote").css({ "margin-left" : "50px" });
	
	$("<p />")
		.html(quotes[currentQuoteIndex].quote)
		.css({ "display" : "none"})
		.appendTo($(".quote"));
		
	$("<p />")
		.addClass("author")
		.html(quotes[currentQuoteIndex].author)
		.css({ "display" : "none"})
		.appendTo($(".quote"));

	$(".quote")
		.show()
		.animate({ width : quoteBoxWidth }, quoteContainerSpeed, function() {
			showQuote();
    })

}

/* Shows the current quote */
var showQuote = function() {
	$(".quote").children().fadeIn();
		
	setTimeout(function() {
		clearQuote();
	}, showQuoteSpeed);
}

/* Clear the current quote */
var clearQuote = function() {
	// Determine the curren quote index
	if(currentQuoteIndex == quotes.length - 1) {
		currentQuoteIndex = 0;
	}
	else {
		currentQuoteIndex++;
	}
	
	// Fade out the quotation marks
	$(".quotemark").fadeOut();

	// Fade out the current quote and reset the data	
	$(".quote").fadeOut(function() {
		$(".rightquote").css({ "margin-left" : "30px"});
		
		$(".quote")
			.empty()
			.css({ width : "0px" });
		
		setTimeout(function() {
			startAnimation();
		}, cleanScreenSpeed);
	});
}