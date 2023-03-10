import { TrelloCardShortInfo } from "../../entities/trello-card-short-info";
import { TrelloListShortInfo } from "../../entities/trello-list-short-info";
export declare class TrelloPatchNoteHandlerUtils {
    static castList(response: any): TrelloListShortInfo;
    static getLastCards(response: any, listNames: Map<string, TrelloListShortInfo>, daysLimit: number): Array<TrelloCardShortInfo>;
}
