jQuery(document).ready(function ($)
{
	var animationSpeed = "slow"
	var $slideArea = $("#jmpress");
	var $contentArea = $("#content");
	var $loader = $("#ajaxloader1");
	var $goButton = $("#start");

	$slideArea.hide(animationSpeed);
	$goButton.on('click', function (e)
	{
		toggleLoading($contentArea);
		$(this).parent().parent().toggle();
		toggleLoading($contentArea);
		$slideArea.toggleClass("visuallyhidden").show(animationSpeed).jmpress({
			stepSelector: "section"
		});
	});


	function toggleLoading(selector) {
		if (selector.length == 0) {
			return;
		}
		selector.toggleClass("loading visuallyhidden");
		$loader.toggle(animationSpeed);
	}
});
