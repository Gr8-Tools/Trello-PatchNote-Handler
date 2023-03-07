import { FetchWrapper } from "./fetch-wrapper";
export declare class TrelloFetchWrapper extends FetchWrapper<TrelloFetchWrapper> {
    static API_KEY_KEY: string;
    static TOKEN_KEY: string;
    setAuth(apiKey: string, token: string): FetchWrapper<TrelloFetchWrapper>;
}
