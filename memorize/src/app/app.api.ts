import { environment } from "../environments/environment";
export const API = environment.api;
let WithoutApi = "";
if (environment.production) {
	WithoutApi = API.split("br/api")[0] + "br";
} else {
	WithoutApi = API.split("/api")[0];
}
export const APIDominio = environment.apiDominio;
export const APIWithoutApi = environment.apiPublic;
export const API_PATH_IMG = environment.apiPublic;
export const API_SITE_PATH_IMG = environment.apiSite;
export const SERVER_ND = "http://localhost:3099";
