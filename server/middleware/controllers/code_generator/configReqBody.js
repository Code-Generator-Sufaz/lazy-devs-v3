const updateMainUniqueAndDleteSpaceInName = require('./tools/updateMainUniqueAndDleteSpaceInName')
const sortInputsAndRename = require('./tools/sortInputsAndRename')
/** 
 *config req.body and set default values
 */
 const configReqBody = (obj) =>{
    obj.backend_packages ? null : obj.backend_packages = {}
    obj.frontend_packages ? null : obj.frontend_packages = {}
    
    // fix the registrationInputs and loginInputs
    if (obj.registrationInputs.length == 1) {
        obj.registrationInputs[0].main = true;
        obj.loginInputs = obj.registrationInputs
    } else {
        // find the main
        let mainInput = obj.registrationInputs.filter(x=>x.main)[0]
        if(!mainInput){
             // there is no main. let the first to be main, update maininput 1- unique,
             obj.registrationInputs[0].main = true 
             mainInput = obj.registrationInputs[0]     
        } 
            
         // push maininput to loginInputs
         obj.loginInputs.push(mainInput);

         // only the registrationInputs has "password"  and loginInputs has no "password", will push the first "password" in registrationInputs to loginInputs
         // push type = password to loginInputs
         if(obj.registrationInputs.some(x=>x.type == 'password') && !obj.loginInputs.some(x=>x.type == 'password')) obj.loginInputs.push(obj.registrationInputs.filter(x=>x.type == 'password')[0])

         // delete the inputs with same name if there is one
         obj.loginInputs = obj.loginInputs.filter(x => {
             if(x.name != mainInput.name) return x
             else if (x.main) return x
         })   
    }
      // update maininput 1- unique, 2 name can not have empty space
      obj.registrationInputs = updateMainUniqueAndDleteSpaceInName(obj.registrationInputs)
      obj.loginInputs = updateMainUniqueAndDleteSpaceInName(obj.loginInputs)

      // sort the array put main input at first. password will be second if there is one update name let it macht Schema format name_type
      obj.registrationInputs = sortInputsAndRename(obj.registrationInputs)
      obj.loginInputs = sortInputsAndRename(obj.loginInputs)



    obj.template = obj.template ? obj.template : "tm1_session"
    // add dependencesis to backend_packages and frontend__packages basied on tm
    switch(obj.template){
        case "tm1_session":
            obj.backend_packages['express-session'] = true
            obj.frontend_packages.axios = false
            break;

        case "tm2_jwt_cookie":
            obj.backend_packages.jsonwebtoken = true
            obj.backend_packages['cookie-parser'] = true
            obj.frontend_packages.axios = false
            break;

        case "tm3_jwt_axios":
            obj.backend_packages.jsonwebtoken = true
            obj.frontend_packages.axios = true
            break;
    } 

    // set default values
    obj.project_name ? null : obj.project_name = 'lazy_dev';
    obj.project_name = obj.projectName 
    obj.project_description ? null : obj.project_description = 'user authentication template';
    obj.project_author ? null : obj.project_name = 'a web developer';
    obj.project_license ? null : obj.project_license = 'MIT';

    obj.secretKey ? null : obj.secretKey = 'sufaz';
    obj.expireTime ? null : obj.expireTime = 2592000000;

    obj.frontendOrigin ? null : obj.frontendOrigin = 'http://localhost:3000';
    obj.backendOrigin ? null : obj.backendOrigin = 'http://localhost:';
    obj.port ? null : obj.port = 5000;
    obj.mongodbURI ? null : obj.mongodbURI = "mongodb://localhost:27017";

    

    return obj  
}
    
    
module.exports=configReqBody
    