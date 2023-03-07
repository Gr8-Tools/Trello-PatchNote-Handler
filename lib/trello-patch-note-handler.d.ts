import { TrelloCardShortInfo } from "./entities/trello-card-short-info";
export declare class TrelloPatchNoteHandler {
    readonly apiKey: string;
    readonly token: string;
    private readonly __client;
    private readonly __lists;
    constructor(apiKey: string, token: string);
    setLists(...listIds: string[]): Promise<void>;
    getCards(boardId: string, cardsLimit?: number, daysLimit?: number): Promise<Array<TrelloCardShortInfo>>;
    private __prepareGetListsFetchWrapper;
    private __prepareGetCardsFetchWrapper;
    private __clearWrapper;
}
