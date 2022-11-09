const Code = require("../models/Codes");
const ExpressError = require("../ExpressError");
exports.checkTemplate = async (req, res, next) => {
  const user = req.session.user;
  const existingCode = await Code.findOne({
    templateName: req.body.templateName,
    createdBy: user._id,
  });
  if (existingCode) {
    return next(
      new ExpressError("Project with the same name already exists", 300)
    );
  } else if (req.body.templateName?.trim()?.length < 5) {
    return next(
      new ExpressError(
        "Project name should not have less than 5 characters",
        300
      )
    );
  } else {
    next();
  }
};
