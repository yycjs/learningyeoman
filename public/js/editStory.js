jQuery(document).ready(function ($)
{
	var $editableRegion = $("#firepad");
	checkFirePad();
	autoFocus();

	function checkFirePad() {
		if (($editableRegion.length > 0) && (Firepad != "undefined")) {
			makeAreaEditable();
		}
	}
	function makeAreaEditable() {
		var firepadRef = new Firebase("https://mindness.firebaseio.com/"),
		codeMirror = CodeMirror($editableRegion[0], {lineWrapping: true, autoFocus: true}),
			firepad = Firepad.fromCodeMirror(firepadRef, codeMirror,
				{richTextShortcuts: true, richTextToolbar: true});
		toastr.info("Feel free to edit this story.", "Join the Story Telling");
	}
	function autoFocus() {
		$(".show-pad").on("click", function (e)
		{
			$editableRegion.focus();
		});
	}
});
