"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrelloPatchNoteHandlerUtils = void 0;
const trello_card_short_info_1 = require("../../entities/trello-card-short-info");
const trello_list_short_info_1 = require("../../entities/trello-list-short-info");
class TrelloPatchNoteHandlerUtils {
    static castList(response) {
        const result = new trello_list_short_info_1.TrelloListShortInfo();
        Object.keys(response).forEach((key) => {
            result.set(key, response[key].toString());
        });
        return result;
    }
    static getLastCards(response, listNames, daysLimit) {
        const results = new Array();
        const dateNow = Date.now(), diffDate = 1000 * 3600 * 24 * daysLimit;
        const rawCardsArray = response["cards"];
        for (let rawCardInfo of rawCardsArray) {
            // validate cardInfo by date
            const cardDate = Date.parse(rawCardInfo["due"]);
            if (dateNow - cardDate > diffDate) {
                //TODO: расчет на то, что карточки отсортированы, и дальше проверять нет смысла
                break;
            }
            // replace content from raw object to typed
            const cardInfo = new trello_card_short_info_1.TrelloCardShortInfo();
            Object.keys(rawCardInfo).forEach((key) => {
                cardInfo.set(key, rawCardInfo[key].toString());
            });
            // extend with 'nameList'
            const listId = cardInfo.get('idList');
            cardInfo.set('nameList', listNames.get(listId).get('name'));
            results.push(cardInfo);
        }
        return results;
    }
}
exports.TrelloPatchNoteHandlerUtils = TrelloPatchNoteHandlerUtils;
