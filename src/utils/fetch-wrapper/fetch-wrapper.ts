import fetch, {BodyInit, RequestInit} from 'node-fetch'

export class FetchWrapper {
    private readonly __url : string;
    private readonly __headers: Record<string, string>;
    private readonly __queryParams: Map<string, string>;

    private __urlExtend : string;

    constructor(baseUrl : string) {
        this.__url = baseUrl;
        this.__headers = {};
        this.__queryParams = new Map<string, string>();
    }

    /* Устанавливает заголовок типа данных
    * @param value - значение типа данных
    */
    setContentType(value: string) : FetchWrapper {
        return this.setHeader("Content-Type", value);
    }

    /* Устанавливает данные авторизации в QueryParams
    * @param apiKey - ключ авторизации
    * @param token - токен авторизации
    */
    setAuth(apiKey: string, token: string) : FetchWrapper {
        return this
            .setQueryParam("key", apiKey)
            .setQueryParam("token",token);
    }

    /* Устанавливает заголовок
    * @param key - ключ заколовка
    * @param value - значение заголовка
    */
    setHeader(key: string, value: string) : FetchWrapper {
        this.__headers[key] = value;
        return this;
    }

    /*
    Дополняет урл запроса парами `/${KEY}/${VALUE}`
    */
    extendUrl(map: Map<string, string>) : FetchWrapper {
        map.forEach((value, key) => {
            this.__urlExtend += `/${key}/${value}`;
        })
        return this;
    }

    /* Add to the end of url string one more part
    * @param urlTail - appended part to url
    */
    appendToUrl(urlTail: string) : FetchWrapper {
        this.__urlExtend += `/${urlTail}`;
        return this;
    }


    /*
        Добавляет в QueryParams пары `{KEY}={VALUE}`
    */
    setQueryParams(map: Map<string, string>) : FetchWrapper {
        map.forEach((value, key) => {
            this.setQueryParam(key, value);
        })
        return this;
    }

    /*
        Добавляет в QueryParams пару `{KEY}={VALUE}`
    */
    setQueryParam(key: string, value: string) : FetchWrapper {
        this.__queryParams.delete(key);
        this.__queryParams.set(key, value);
        return this;
    }

    /* Отправляет запрос по сформированным данным
    * @param method - тип запроса
    */
    async sendRequest(method: string, body: BodyInit | null = null) : Promise<any> {
        let url = this.__url + this.__urlExtend;

        const requestInit : RequestInit = {
            method : method
        };

        if(Object.keys(this.__headers).length > 0){
            requestInit.headers = this.__headers;
        }

        if(this.__queryParams.size > 0){
            function toString(entire: [string, string]): string {
                return `${entire[0]}=${entire[1]}`;
            }

            const iterable = this.__queryParams.entries();

            let bufferString : string = `?${toString(iterable.next().value)}`;
            for (let v = iterable.next(); !v.done; v = iterable.next()) {
                bufferString += `&${toString(v.value)}`;
            }

            url += bufferString;
        }

        if(body != null) {
            requestInit.body = body;
        }

        const response = await fetch(url, requestInit);
        return await response.json();
    }
}
