/*
 * GET home page.
 */

exports.index = function (req, res)
{
	res.render("index", { title: "YYCJs: Learning Yeoman", description: "Slides for Learning Yeoman Presentation by Sean Goresht" });
};