"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrelloFetchWrapper = void 0;
const fetch_wrapper_1 = require("./fetch-wrapper");
class TrelloFetchWrapper extends fetch_wrapper_1.FetchWrapper {
    /* Устанавливает данные авторизации в QueryParams
    * @param apiKey - ключ авторизации
    * @param token - токен авторизации
    */
    setAuth(apiKey, token) {
        return this
            .setQueryParam(TrelloFetchWrapper.API_KEY_KEY, apiKey)
            .setQueryParam(TrelloFetchWrapper.TOKEN_KEY, token);
    }
}
exports.TrelloFetchWrapper = TrelloFetchWrapper;
TrelloFetchWrapper.API_KEY_KEY = "key";
TrelloFetchWrapper.TOKEN_KEY = "token";
