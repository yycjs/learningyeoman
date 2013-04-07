jQuery(document).ready(function ($)
{
	var animationSpeed = "slow";
	var $slideArea = $("#jmpress");
	var $contentArea = $("#content");
	var $loader = $("#ajaxloader1");
	var $controls = $(".controls");
	var $showNext = $contentArea.find(".show-next");
	var $showPrev = $contentArea.find(".show-prev");
	var $typedSelector = $(".type");
	var $body = $("body");
	$slideArea.jmpress({
		stepSelector: "section",
		afterInit: main()
	});
	function startButton()
	{
		$showNext.on("click", function (e)
		{
			$slideArea.jmpress("next");
			return false;
		});
		$showPrev.on("click", function (e)
		{
			$slideArea.jmpress("prev");
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
		}).find(".locked").on('click', function (e)
			{
				toastr.error("This story is not yet written.  Please try again later", "Warning");
			});
	}
	function toggleControls() {
		$controls.toggle(animationSpeed);
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
	function makeTyped() {
		$slideArea.find(".slide").on('enterStep', function (e)
		{
			$(this).find($typedSelector).typewrite();
			if ($(this).hasClass("toggle-controls")) {
				toggleControls();
			}
		});
	}
	function setColours() {
		var $colouredSlides = $slideArea.find(".slide[data-colour]").on("enterStep", function (e)
		{
			$body.removeClass().addClass($(this).attr("data-colour"));
		});
		
	}
	function setTemplates() {
		$.jmpress("template", "mytemplate", {
			children: function( idx, current_child, children ) {
				return {
					y: 400
					,x: -700 + idx * 700
					,template: "mytemplate"
					,scale: 0.3
				}
			}
		});
	}
	function main() {
		checkSupport();
		setTemplates();
		startButton();
		characterSelect();
		makeChoices();
		makeTyped();
		setColours();
	}
});