jQuery(document).ready(function ($)
{
	var animationSpeed = "slow";
	var $slideArea = $("#jmpress");
	var $contentArea = $("#content");
	var $loader = $("#ajaxloader1");
	var $goButton = $("#start");
	$slideArea.jmpress({
		stepSelector: "section",
		afterInit: main()
	});
	function startButton()
	{
		$goButton.on('click', function (e)
		{
			$slideArea.jmpress("next");
			return false;
		});
		toastr.info("Navigate to the next slide, using the arrow keys on your keyboard", "Hint")
	}
	function toggleLoading(selector) {
		if (selector.length == 0) {
			return;
		}
		selector.toggleClass("loading visuallyhidden");
		$loader.toggle(animationSpeed);
	}

	function characterSelect() {
		var $characterSelect = $("#choose-a-character");
		$characterSelect.on('enterStep', function (e)
		{
			toastr.info("Choosing a character will affect the way the story unfolds", "Note");
		}).find("a").on('click', function (e)
			{
				var $characters = "#coronni, #sibero, #optunna, #huddiu, #mina, #clide";
				$characterSlides = $characterSelect.find($characters);
				var self = $(this);
				$characterSlides.on('enterStep', function (e)
				{
					/*var $slidesToRemove = $characterSlides.not(self.attr("href")).toggle(animationSpeed);
					toastr.info("The slides to remove were:" + $slidesToRemove);
					console.log($slidesToRemove);*/
				});
			});
	}
	function checkSupport () {
		if (Modernizr.csstransforms == false) {
			toastr.warning("Your browser does not appear to support CSS3 transforms.  Please note that the browser experience will likely suck or really lack stuff.  Maybe time to upgrade your browser (Chrome, Firefox, Opera)?", "Warning");
		}
		if (Modernizr.cssanimations == false) {
			toastr.error("Your browser does not appear to support CSS3 animations.  This really is bad, and it means your experience is limited.  Maybe upgrade to Chrome, Firefox, or Opera?");
		}
		if (Modernizr.csstransforms3d == false) {
			toastr.warning("Your browser does not appear to support CSS3 3d Transforms.  This is not so bad, but you should probably consider upgrading to a browser that has this (Chrome, Firefox, Opera.", "Warning");
		}
	}
	function makeChoices() {
		var $formButton = $slideArea.find(".choices button[type='submit']"),
			$radios = $slideArea.find("input[type='radio']").on('click', function (e)
			{
				if ($(this).attr("data-destination") != "undefined") {
					$formButton.attr("data-destination", $(this).attr("data-destination"));
				}
			});
		$formButton.on('click', function (e)
		{
			$slideArea.jmpress("goTo", $(this).attr("data-destination"));
			return false;
		});

	}
	function main() {
		checkSupport();
		startButton();
		characterSelect();
		makeChoices();
	}
});

/* =============================================================================
 Plugin for jmpress goes here
 ========================================================================== */
/*
(function( $, document, window, undefined ) {
	$.jmpress("defaults").story = "test";
	function test(step, what) {
		$(step).html(what);
	}
	$.jmpress("initStep", function(step, eventData) {
		test(step, eventData.settings.story);
	})
}(jQuery, document, window));*/
