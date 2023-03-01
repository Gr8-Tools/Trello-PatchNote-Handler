import {EnvVar} from "./utils/environment-variables";
import {TrelloPatchNoteHandler} from "./trello-patch-note-handler";

function main() {
    const trello = new TrelloPatchNoteHandler(EnvVar.getString('TRELLO_API_KEY'), EnvVar.getString('TRELLO_TOKEN'));

}

main();