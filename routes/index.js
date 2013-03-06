/*
 * GET home page.
 */

exports.index = function (req, res)
{
	res.render("index", { title: "Drama 205: Final Project (Draft)", description: "Interactive comic-style story-telling HTML5 application" });
};