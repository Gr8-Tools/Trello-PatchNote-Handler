import {EnvVar} from "./utils/environment-variables";
import {FetchWrapper} from "./utils/fetch-wrapper/fetch-wrapper";

export class TrelloPatchNoteHandler {

    private readonly __boardId : string
    private readonly __client : FetchWrapper

    private readonly __lists : Array<string>;

    constructor(readonly apiKey: string,
                readonly token: string) {
        this.__client = new FetchWrapper("https://api.trello.com/1").setAuth(apiKey, token);
        this.__lists = new Array<string>();
    }

    setLists(...args: string[]) : void {
        args.forEach(v => {
            if(!this.__lists.includes(v)){
                this.__lists.push(v);
            }
        })
    }

    async getCards() : Promise<Array<any>> {
        const result = new Array<any>;

        this.__lists.forEach(listId => {

        })

        return result;
    }

    private __setUpUrl(listId: string) : void {
        //ToDO: нельзя просто так всязть и установить.
        // Нужно предварительно сбросить данные с прошлого запроса
        // А для этого нужны методы:
        // 1. clearHeaders
        // 2. clearQueryParams(includeAuth = false)
        // 3. clearUrlExtend
    }
}