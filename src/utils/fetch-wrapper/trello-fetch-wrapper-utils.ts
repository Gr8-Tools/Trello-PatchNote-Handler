import {TrelloCardShortInfo} from "../../entities/trello-card-short-info";
import {TrelloListShortInfo} from "../../entities/trello-list-short-info";

export class TrelloPatchNoteHandlerUtils {

    static castList(response: any) : TrelloListShortInfo {
        const result = new TrelloListShortInfo();

        Object.keys(response).forEach((key) => {
            result.set(key, response[key].toString());
        });

        return result;
    }

    static getLastCards(response: any, listName: string) : Array<TrelloCardShortInfo> {
        const results = new Array<TrelloCardShortInfo>();
        const dateNow : number = Date.now(), diffDate : number = 1000 * 3600 * 24 * 7;
        const rawCardsArray : (Array<any>) = response as Array<any>;

        for (let rawCardInfo of rawCardsArray) {
            // validate cardInfo by date
            const cardDate : number = Date.parse(rawCardInfo["dateLastActivity"]);
            if (dateNow - cardDate > diffDate){
                continue;
            }

            const cardInfo: TrelloCardShortInfo = new TrelloCardShortInfo();

            Object.keys(rawCardInfo).forEach((key) => {
                cardInfo.set(key, rawCardInfo[key].toString());
            });
            cardInfo.set('nameList', listName);

            results.push(cardInfo)
        }

        return results;
    }
}
