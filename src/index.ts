import {EnvVar} from "./utils/environment-variables";
import {TrelloPatchNoteHandler} from "./trello-patch-note-handler";
import {Container} from "typedi";
import NodeCache from "node-cache";

async function main() {
    Container.set("cache", new NodeCache());

    const trello = new TrelloPatchNoteHandler(EnvVar.getString('TRELLO_API_KEY'), EnvVar.getString('TRELLO_TOKEN'));
    await trello.setLists('60b7d221986bcc6cf5d14e39', '60b7d236afa5894f48c69602');
    const result = await trello.getCards();

    console.log(result);
}

main().then(() => {
    console.log("Finished!");
});
