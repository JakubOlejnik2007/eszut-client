export type TReportFormNames =  "CategoryID" | "PlaceID" | "who" | "what";
export type TLoginFormNames = "password" | "email";
export type TChangePasswordNames = "oldPassword" | "newPassword" | "confirmNewPassword";
export type TChangeEmailNames = "newEmail";
export type TInsertCategoryNames = "newCategoryName" | "priority";
export type TInsertPlaceNames = "newPlaceName";
export type TChangeCategory = "category";
export type TChangePlace = "place";
export type TAddAdministrator = "name" | "email" | "password";
export type TInsertComment = "content"
export type TDeleteProblems = "toDelete"
type TFormNames = TReportFormNames | TLoginFormNames | TChangePasswordNames | TChangeEmailNames | TInsertCategoryNames | TInsertPlaceNames | TChangeCategory | TChangePlace | TAddAdministrator | TInsertComment | TDeleteProblems;
<<<<<<< HEAD
=======

>>>>>>> 2c7f85787722f241ec553b01a9e9c3545ef8ae52
export default TFormNames;