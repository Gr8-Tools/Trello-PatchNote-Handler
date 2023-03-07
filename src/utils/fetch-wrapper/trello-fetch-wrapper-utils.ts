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

    static getLastCards(response: any, listNames: Map<string, TrelloListShortInfo>, daysLimit: number) : Array<TrelloCardShortInfo> {
        const results = new Array<TrelloCardShortInfo>();
        const dateNow : number = Date.now(), diffDate : number = 1000 * 3600 * 24 * daysLimit;


        const rawCardsArray : (Array<any>) = response["cards"] as Array<any>;

        for (let rawCardInfo of rawCardsArray) {
            // validate cardInfo by date
            const cardDate : number = Date.parse(rawCardInfo["due"]);
            if (dateNow - cardDate > diffDate){
                //TODO: расчет на то, что карточки отсортированы, и дальше проверять нет смысла
                break;
            }

            // replace content from raw object to typed
            const cardInfo: TrelloCardShortInfo = new TrelloCardShortInfo();

            Object.keys(rawCardInfo).forEach((key) => {
                cardInfo.set(key, rawCardInfo[key].toString());
            });

            // extend with 'nameList'
            const listId = cardInfo.get('idList')!;
            cardInfo.set('nameList', listNames.get(listId)!.get('name')!);

            results.push(cardInfo)
        }

        return results;
    }
}
