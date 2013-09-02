jQuery(document).ready(function ($)
{
	var animationSpeed = "slow";
	var $slideArea = $("#jmpress");
	var $contentArea = $("#content");
	var $controls = $(".controls");
	var $showNext = $contentArea.find(".show-next, .start-show");
	var $showPrev = $contentArea.find(".show-prev");
	var $typedSelector = $(".type");
	var $htmlFirepad = $("#live-code-1"),
		$scssFirepad = $("#live-code-2"),
		$generatorFirepad = $("#live-code-3"),
		htmlFirebaseLink = "https://yeoman-tutorial.firebaseio.com/",
		scssFirebaseLink = "https://yeoman-tutorial-sass.firebaseio.com/",
		generatorFirebaseLink = "https://yeoman-tutorial-generator.firebaseio.com/";
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
	}
	function toggleControls() {
		$controls.toggle(animationSpeed);
	}
	function checkSupport () {
		if (Modernizr.csstransforms == false) {
			alert("Your browser does not appear to support CSS3 transforms.  Please note that the browser experience will likely suck or really lack stuff.  Maybe time to upgrade your browser (Chrome, Firefox, Opera)?", "Warning");
		}
		if (Modernizr.cssanimations == false) {
			alert("Your browser does not appear to support CSS3 animations.  This really is bad, and it means your experience is limited.  Maybe upgrade to Chrome, Firefox, or Opera?");
		}
		if (Modernizr.csstransforms3d == false) {
			alert("Your browser does not appear to support CSS3 3d Transforms.  This is not so bad, but you should probably consider upgrading to a browser that has this (Chrome, Firefox, Opera.", "Warning");
		}
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
	function initFirepad(elem, url) {

		firepadRef = new Firebase(url);
		// Create CodeMirror (with line numbers and the JavaScript mode).
		var codeMirror = CodeMirror(elem[0], {
			lineNumbers: true,
			mode: "javascript"
		});

		// Create Firepad.
		var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror);

	}
	function setupFirepads() {
		var hasInit = false,
			hasInit2 = false
			hasInit3 = false;
		var $htmlCoding = $("#coding-the-html5-app").on("enterStep", function ()
		{
			if (hasInit === true) {
				return;
			}
			initFirepad($htmlFirepad, htmlFirebaseLink);
			hasInit = true;
		}),
		$scssCoding = $("#css-stuff").on("enterStep", function (e)
		{
			if (hasInit2 === true) {
				return;
			}
			initFirepad($scssFirepad, scssFirebaseLink);
			hasInit2 = true;
		}),
		$generatorCoding = $("#coding-the-generator").on("enterStep", function (e)
		{
			if (hasInit3 === true) {
				return;
			}
			initFirepad($generatorFirepad, generatorFirebaseLink);
			hasInit3 = true;
		});
	}
	function main() {
		checkSupport();
		setTemplates();
		startButton();
		makeTyped();
		setColours();
		setupFirepads();
	}
});