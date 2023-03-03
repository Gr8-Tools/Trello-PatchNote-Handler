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
    static getLastCards(response, listName) {
        const results = new Array();
        const dateNow = Date.now(), diffDate = 1000 * 3600 * 24 * 7;
        const rawCardsArray = response;
        for (let rawCardInfo of rawCardsArray) {
            // validate cardInfo by date
            const cardDate = Date.parse(rawCardInfo["dateLastActivity"]);
            if (dateNow - cardDate > diffDate) {
                continue;
            }
            const cardInfo = new trello_card_short_info_1.TrelloCardShortInfo();
            Object.keys(rawCardInfo).forEach((key) => {
                cardInfo.set(key, rawCardInfo[key].toString());
            });
            cardInfo.set('nameList', listName);
            results.push(cardInfo);
        }
        return results;
    }
}
exports.TrelloPatchNoteHandlerUtils = TrelloPatchNoteHandlerUtils;
