const updateMainUniqueAndDeleteSpaceInName = require("./tools/updateMainUniqueAndDleteSpaceInName");
const sortInputsAndRename = require("./tools/sortInputsAndRename");
/**
 *config req.body and set default values
 */
const configReqBody = (obj) => {
  obj.backend_packages ? null : (obj.backend_packages = {});
  obj.frontend_packages ? null : (obj.frontend_packages = {});

  // add bcrypet
  if (
    obj.backend_packages.nodemailer ||
    obj.registrationInputs.some((x) => x.type == "password")
  ) {
    obj.backend_packages.bcrypt = true;
  }
  // fix the registrationInputs and loginInputs
  if (obj.registrationInputs.length == 1) {
    obj.registrationInputs[0].main = true;
    obj.loginInputs = obj.registrationInputs;
  } else {
    // find the main
    let mainInput = obj.registrationInputs.filter((x) => x.main)[0];
    if (!mainInput) {
      // there is no main. let the first to be main, update mainInput 1- unique,
      obj.registrationInputs[0].main = true;
      mainInput = obj.registrationInputs[0];
    }
    // push maininput to loginInputs
    obj.loginInputs.push(mainInput);
    // only the registrationInputs has "password"  and loginInputs has no "password", will push the first "password" in registrationInputs to loginInputs
    // push type = password to loginInputs
    if (
      obj.registrationInputs.some((x) => x.type == "password") &&
      !obj.loginInputs.some((x) => x.type == "password")
    )
      obj.loginInputs.push(
        obj.registrationInputs.filter((x) => x.type == "password")[0]
      );
    // delete the inputs with same name if there is one
    obj.loginInputs = obj.loginInputs.filter((x) => {
      if (x.name != mainInput.name) return x;
      else if (x.main) return x;
    });
  }
  // update maininput 1- unique, 2 name can not have empty space
  obj.registrationInputs = updateMainUniqueAndDeleteSpaceInName(
    obj.registrationInputs
  );
  obj.loginInputs = updateMainUniqueAndDeleteSpaceInName(obj.loginInputs);

  // sort the array put main input at first. password will be second if there is one update name let it macht Schema format name_type
  obj.registrationInputs = sortInputsAndRename(obj.registrationInputs);
  obj.loginInputs = sortInputsAndRename(obj.loginInputs);

  obj.template = obj.template ? obj.template : "tm1_session";
  // add dependencesis to backend_packages and frontend__packages basied on tm
  switch (obj.template) {
    case "tm1_session":
      obj.backend_packages["express-session"] = true;
      obj.frontend_packages.axios = false;
      break;

    case "tm2_jwt_cookie":
      obj.backend_packages.jsonwebtoken = true;
      obj.backend_packages["cookie-parser"] = true;
      obj.frontend_packages.axios = false;
      break;

    case "tm3_jwt_axios":
      obj.backend_packages.jsonwebtoken = true;
      obj.frontend_packages.axios = true;
      break;
  }

  // set default values
  obj.project_name?.trim() ? null : (obj.project_name = "lazy_devs");

  obj.project_description?.trim()
    ? null
    : (obj.project_description = "user authentication boilerplate");
  obj.project_author?.trim() ? null : (obj.project_author = "sufaz");
  obj.project_license?.trim()
    ? null
    : (obj.project_license = "dci - digital career institute");

  obj.secretKey?.trim() ? null : (obj.secretKey = "secret_key");
  obj.expireTime?.trim() ? null : (obj.expireTime = 2592000000);

  obj.frontendOrigin?.trim()
    ? null
    : (obj.frontendOrigin = "http://localhost:3000");
  obj.backendOrigin?.trim() ? null : (obj.backendOrigin = "http://localhost:");
  obj.port?.trim() ? null : (obj.port = 5000);
  obj.mongodbURI?.trim()
    ? null
    : (obj.mongodbURI = "mongodb://localhost:27017");
  return obj;
};

module.exports = configReqBody;
