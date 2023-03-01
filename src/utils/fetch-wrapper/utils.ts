const ENV_PORT : string = "PORT";
const ENV_API_KEY : string = "API_KEY";
const ENV_TBOT_KEY : string = "TBOT_KEY";
const ENV_TBOT_GROUP_ID : string = "TBOT_GROUP_ID";

export class FetchWrapperUtils {

    // static createUnityRequest(urlInfo: IMap) : FetchWrapper {
    //     // Ключ авторизации
    //     const apiKey = EnvVar.getString(ENV_API_KEY);
    //
    //     // собираем параметры запроса
    //     const requestParams = urlInfo.toMap();
    //
    //     // собираем объект запроса
    //     return new FetchWrapper('https://build-api.cloud.unity3d.com/api/v1')
    //         .setContentType('application/json')
    //         .setAuth(apiKey)
    //         .extendUrl(requestParams);
    // }
    //
    // static async sendTelegramPublishRequest(msg: string) : Promise<any>{
    //     // Ключ бота и порт сервера
    //     const tbotKey = EnvVar.getString(ENV_TBOT_KEY);
    //
    //     const requestBody : PublishMessageInfo = {
    //         chatId: EnvVar.getString(ENV_TBOT_GROUP_ID),
    //         text: msg
    //     };
    //
    //     return await MessagePublishUtils.sendMsg(tbotKey, requestBody);
    // }
}
