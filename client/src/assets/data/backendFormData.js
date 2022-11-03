export const backEndFormData = [
  "expressValidator",
  "session",
  "dotenv",
  "jwt",
  "nodemailer",
];

export const backendTemplates = [
  { template: "tm1_session", name: "SESSION" },
  { template: "tm2_jwt_cookie", name: "JWT & COOKIE" },
  { template: "tm3_jwt_axios", name: "JWT & AXIOS" },
];

export const initializingServerData = [
  { name: "PROJECT DESCRIPTION", nameForTemplate: "project_description" },
  { name: "PROJECT AUTHOR", nameForTemplate: "project_author" },
  { name: "PROJECT LICENSE", nameForTemplate: "project_license" },
  { name: "SECRET KEY", nameForTemplate: "secretKey" },
  { name: "EXPIRE TIME", nameForTemplate: "expireTime" },
  { name: "PORT", nameForTemplate: "port" },
  { name: "FRONTEND ORIGIN", nameForTemplate: "frontendOrigin" },
  { name: "BACKEND ORIGIN", nameForTemplate: "backendOrigin" },
  { name: "MONGODB URI", nameForTemplate: "mongodbURI" },
];

export const nodemailerSetting = [
  { name: "HOST", nameForTemplate: "host" },
  { name: "PORT", nameForTemplate: "port" },
  { name: "USER", nameForTemplate: "user" },
  { name: "PASS", nameForTemplate: "pass" },
  { name: "SENDER EMAIL", nameForTemplate: "senderEmail" },
];
