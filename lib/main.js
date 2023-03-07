"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const environment_variables_1 = require("./utils/environment-variables");
const trello_patch_note_handler_1 = require("./trello-patch-note-handler");
const node_cache_1 = __importDefault(require("node-cache"));
const typedi_1 = require("typedi");
async function main() {
    typedi_1.Container.set("cache", new node_cache_1.default());
    const trelloApiKey = environment_variables_1.EnvVar.getString("TRELLO_API_KEY");
    const trelloToken = environment_variables_1.EnvVar.getString("TRELLO_TOKEN");
    const trelloClient = new trello_patch_note_handler_1.TrelloPatchNoteHandler(trelloApiKey, trelloToken);
    await trelloClient.setLists('60b7d221986bcc6cf5d14e39', '60b7d236afa5894f48c69602');
    const trelloCardsInfos = await trelloClient.getCards('6099328616f8f28617cfacaf');
    console.log(trelloCardsInfos);
}
main();
//["60b7d221986bcc6cf5d14e39","60b7d236afa5894f48c69602"]
