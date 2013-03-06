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
			e.preventDefault();
			$slideArea.jmpress("next");
			//$slideArea.jmpress("select", "#slide-1", "not sure"); --fails too :(
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
				var $slides = $slideArea.find(".step");
				$characterSlides = $slides.find($characters);
				var $slidesToRemove = $slides.not("'#" + $(this).attr("href") + "'").toggle(animationSpeed);
				toastr.info("The slides to remove were:" + $slidesToRemove);
				console.log($slidesToRemove);
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
	function main() {
		checkSupport();
		startButton();
		characterSelect();
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
