// @flow
/**
 * Request object that represents a GET request to be made with the useDataApi hook.
 */
export class Request {
    url: string;
    params: any;
    postFunction: ?((any) => any);
    /**
     * Create a request.
     * @param {string} url - URL string for the request.
     * @param {*} params - Any query parameters for the request.
     * @param {(function({}): {})?} postFunction - An optional generic function that takes a json object.
     * If set this function will intercept the result data and will save its result as the payload.
     */
    constructor(url: string, params: any, postFunction: ?((any) => any)) {
        this.url = url;
        this.params = params;
        this.postFunction = postFunction;
    }
}

export class NASAImage {
    nasaID: string;
    imageURL: string;
    title: string;
    description: string;
    dateCreated: string;
    keywords: [string];
    secondaryCreator: string;

    constructor(nasaID: string, imageURL: string, title: string, description: string,
                dateCreated: string, keywords: [string], secondaryCreator: string) {
        this.nasaID = nasaID;
        this.imageURL = imageURL;
        this.title = title;
        this.description = description;
        this.dateCreated = dateCreated;
        this.keywords = keywords;
        this.secondaryCreator = secondaryCreator;
    }
}


