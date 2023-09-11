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
type TFormNames = TReportFormNames | TLoginFormNames | TChangePasswordNames | TChangeEmailNames | TInsertCategoryNames | TInsertPlaceNames | TChangeCategory | TChangePlace | TAddAdministrator | TInsertComment;
export default TFormNames;