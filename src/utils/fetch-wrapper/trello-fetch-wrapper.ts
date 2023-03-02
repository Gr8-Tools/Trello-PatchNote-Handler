import {FetchWrapper} from "./fetch-wrapper";

export class TrelloFetchWrapper extends FetchWrapper<TrelloFetchWrapper> {
    static API_KEY_KEY : string = "key";
    static TOKEN_KEY : string = "token";

    /* Устанавливает данные авторизации в QueryParams
    * @param apiKey - ключ авторизации
    * @param token - токен авторизации
    */
    setAuth(apiKey: string, token: string) : FetchWrapper<TrelloFetchWrapper> {
        return this
            .setQueryParam(TrelloFetchWrapper.API_KEY_KEY, apiKey)
            .setQueryParam(TrelloFetchWrapper.TOKEN_KEY,token);
    }
}