"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrelloPatchNoteHandler = void 0;
const fetch_wrapper_1 = require("./utils/fetch-wrapper/fetch-wrapper");
const trello_fetch_wrapper_1 = require("./utils/fetch-wrapper/trello-fetch-wrapper");
const trello_fetch_wrapper_utils_1 = require("./utils/fetch-wrapper/trello-fetch-wrapper-utils");
class TrelloPatchNoteHandler {
    constructor(apiKey, token) {
        this.apiKey = apiKey;
        this.token = token;
        this.__lists = new Map();
        this.__client = new trello_fetch_wrapper_1.TrelloFetchWrapper("https://api.trello.com/1")
            .setAuth(apiKey, token)
            .setContentType('application/json');
    }
    /* Устанавливает список листов, с которых мы будем считывать карточки
    * @params listIds - список ИДников листов
     */
    async setLists(...listIds) {
        this.__lists.clear();
        for (let listId of listIds) {
            // Подготовили запрос
            await this.__prepareGetListsFetchWrapper(listId);
            // Получили сырой ответ
            const responseObject = await this.__client.sendRequest('GET');
            // Парсим ответ
            const parsedResponse = trello_fetch_wrapper_utils_1.TrelloPatchNoteHandlerUtils.castList(responseObject);
            this.__lists.set(listId, parsedResponse);
        }
    }
    /* Получает карточки (за прошлую неделю)
    * @param boardId - Id доски
    * @param cardsLimit - лимит карточек, которые мы запрашиваем (по умолчанию 100)
    * @param daysLimit - лимит дней, по которому мы фильтруем карточки (по умолчанию 7 дней назад)
    * */
    async getCards(boardId, cardsLimit = 100, daysLimit = 7) {
        const result = new Array;
        if (this.__lists.size == 0) {
            return result;
        }
        // Подготовили запрос
        this.__prepareGetCardsFetchWrapper(boardId, cardsLimit);
        // Получили сырой ответ
        const responseObject = await this.__client.sendRequest('GET');
        // Выдернули из сырого ответа нужные данные
        trello_fetch_wrapper_utils_1.TrelloPatchNoteHandlerUtils
            .getLastCards(responseObject, this.__lists, daysLimit)
            .forEach(c => result.push(c));
        return result;
    }
    /* Подготавливает fetchWrapper к получению данных о листе **listId**
    * @param listId - ИД листа, по которому мы получаем параметры
    * */
    __prepareGetListsFetchWrapper(listId) {
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
    __prepareGetCardsFetchWrapper(boardId, limit) {
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
    __clearWrapper() {
        this.__client
            .clearHeaders(fetch_wrapper_1.FetchWrapper.CONTENT_TYPE_HEADER)
            .clearUrlExtend()
            .clearQueryParam(trello_fetch_wrapper_1.TrelloFetchWrapper.API_KEY_KEY, trello_fetch_wrapper_1.TrelloFetchWrapper.TOKEN_KEY);
    }
}
exports.TrelloPatchNoteHandler = TrelloPatchNoteHandler;
