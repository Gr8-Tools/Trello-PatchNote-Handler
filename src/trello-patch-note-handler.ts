import {FetchWrapper} from "./utils/fetch-wrapper/fetch-wrapper";
import {TrelloFetchWrapper} from "./utils/fetch-wrapper/trello-fetch-wrapper";
import {TrelloPatchNoteHandlerUtils} from "./utils/fetch-wrapper/trello-fetch-wrapper-utils";
import {TrelloListShortInfo} from "./entities/trello-list-short-info";
import {TrelloCardShortInfo} from "./entities/trello-card-short-info";

export class TrelloPatchNoteHandler {
    private readonly __client : FetchWrapper<TrelloFetchWrapper>
    private readonly __lists : Map<string, TrelloListShortInfo> = new Map<string, TrelloListShortInfo>();

    constructor(readonly apiKey: string,
                readonly token: string) {
        this.__client = new TrelloFetchWrapper("https://api.trello.com/1")
            .setAuth(apiKey, token)
            .setContentType('application/json');
    }

    /* Устанавливает список листов, с которых мы будем считывать карточки
    * @params listIds - список ИДников листов
     */
    async setLists(...listIds: string[]) : Promise<void> {
        this.__lists.clear();

        for (let listId of listIds) {
            // Подготовили запрос
            await this.__prepareGetListsFetchWrapper(listId);

            // Получили сырой ответ
            const responseObject = await this.__client.sendRequest('GET');

            // Парсим ответ
            const parsedResponse = TrelloPatchNoteHandlerUtils.castList(responseObject);
            this.__lists.set(listId, parsedResponse);
        }
    }

    /* Получает карточки (за прошлую неделю)
    * @param boardId - Id доски
    * @param cardsLimit - лимит карточек, которые мы запрашиваем (по умолчанию 100)
    * @param daysLimit - лимит дней, по которому мы фильтруем карточки (по умолчанию 7 дней назад)
    * */
    async getCards(boardId: string, cardsLimit: number = 100, daysLimit: number = 7) : Promise<Array<TrelloCardShortInfo>> {
        const result = new Array<TrelloCardShortInfo>;
        if(this.__lists.size == 0){
            return result;
        }

        // Подготовили запрос
        this.__prepareGetCardsFetchWrapper(boardId, cardsLimit);

        // Получили сырой ответ
        const responseObject = await this.__client.sendRequest('GET');

        // Выдернули из сырого ответа нужные данные
        TrelloPatchNoteHandlerUtils
            .getLastCards(responseObject, this.__lists, daysLimit)
            .forEach(c => result.push(c));

        return result;
    }

    /* Подготавливает fetchWrapper к получению данных о листе **listId**
    * @param listId - ИД листа, по которому мы получаем параметры
    * */
    private __prepareGetListsFetchWrapper(listId: string) : void {
        // очистка
        this.__clearWrapper();

        this.__client
            .extendUrl("lists", listId)
            .setQueryParam("fields", "name");
    }

    /* Подготавливает fetchWrapper к получению **limit** ЗАВЕРШЕННЫХ карточек на доске **boardId**
    * @param boardId - ИД доски, на которой мы ищем карточки
    * @param limit - максимальное кол-во карточек, которое мы получаем
    * */
    private __prepareGetCardsFetchWrapper(boardId: string, limit: number) : void {
        // очистка
        this.__clearWrapper();

        this.__client
            .appendToUrl("search")
            .setQueryParam("query", encodeURIComponent('due:complete sort:-due'))
            .setQueryParam("idBoards", boardId)
            .setQueryParam("card_fields", "name,shortUrl,due,dueComplete,idList")
            .setQueryParam("cards_limit", limit.toString());

        // this.__client
        //     .extendUrl("lists", listId)
        //     .appendToUrl("cards")
        //     .setQueryParam("fields", "name,shortUrl,dateLastActivity,idList");
    }

    /* Сбрасывает состояние fetchWrapper'a */
    private __clearWrapper(){
        this.__client
            .clearHeaders(FetchWrapper.CONTENT_TYPE_HEADER)
            .clearUrlExtend()
            .clearQueryParam(TrelloFetchWrapper.API_KEY_KEY, TrelloFetchWrapper.TOKEN_KEY);
    }
}