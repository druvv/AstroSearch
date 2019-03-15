// @flow
import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { Request, NASAImage } from "./Models";

const API_URL_SEARCH = 'https://images-api.nasa.gov/search';

function dataFetchReducer(state, action) {
    switch (action.type) {
        case 'FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            };
        case 'FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        default:
            throw new Error();
    }
}

/**
 * A React Hook that uses axios to make a request and return the data asynchronously using the components state.
 * @param {Request} initialRequest - The initial request with which to make a call.
 * @param {*} initialData - The initial state of the data object.
 * @returns {*[]}  An array of format [isLoading, isError, data, doFetch(Request)].
 */
function useDataAPI(initialRequest: Request, initialData) {
    const [request, setRequest] = useState(initialRequest);

    const [state, dispatch] = useReducer(dataFetchReducer, {
        isLoading: false,
        isError: false,
        data: initialData,
    });

    useEffect(() => {
        let didCancel = false;

        const fetchData = async () => {
            dispatch({ type: 'FETCH_INIT' });

            try {
                const result = await axios.get(request.url, {params: request.params});
                if (!didCancel) {
                    console.log(result);
                    // If a postFunction was passed with the request, use it to parse the data,
                    // and update the payload with the result.
                    if (request.postFunction) {
                        dispatch({ type: 'FETCH_SUCCESS', payload: request.postFunction(result.data)});
                    } else {
                        dispatch({ type: 'FETCH_SUCCESS', payload: result.data});
                    }
                }
            } catch (error) {
                if (!didCancel) {
                    dispatch({ type: 'FETCH_FAILURE' });
                }
                console.log("Data Fetch Error: " + error.toString())
            }
        };

        fetchData();

        // If the component unmounts before the request finish avoid updating the state.
        return () => {
            didCancel = true;
        };
    }, [request]);

    const doFetch = (request: Request) => {
        setRequest(request);
    };

    return [ state.isLoading, state.isError, state.data, doFetch ];
}

/**
 * Builds a search request for the given search text.
 * @param {string} searchText - A string representing the search text.
 * @returns {Request} A request object representing a search with NASA's image api.
 */
function buildSearchRequest(searchText: string): Request {

    // Build our postFunction that parses response data into an array of NASAImage objects.
    const postFunction = (data: any): [NASAImage] => {
        // Retrieve the main array of results from the response.
        const items = data.collection.items;

        // For each item retrieve image preview thumbnail url and NASA image metadata.
        const nasaJSONObjs = items.map(x => {
            // The image thumbnail link and metadata are not under same underlying json object, so merge the two.
            const link = x.links[0].href;
            const nasaImageMetadata = x.data[0];
            return Object.assign(nasaImageMetadata, {link: link})
        });

        // Construct NASAImages from json objects.
        return nasaJSONObjs.map(j => {
            return new NASAImage(
                j.nasa_id,
                j.link,
                j.title,
                j.description,
                j.date_created,
                j.keywords,
                j.secondary_creator
            );
        });
    };

    return new Request(
        API_URL_SEARCH,
        {q: searchText, media_type: "image"},
        postFunction
    );
}

/**
 * A React Hook that simplifies the usage of the NASA image search api.
 * @param {string} initialSearchText - The initial search text for the function.
 * @returns {*[]} An array of [isLoading, isError, data, doSearch(string)] where doSearch
 * searches with the given searchText.
 */
export function useNASASearch(initialSearchText: string): {isLoading: boolean, isError: boolean, nasaImages: ?[NASAImage], doSearch: ((string) => void)} {

    const [ isLoading, isError, data, doFetch] = useDataAPI(buildSearchRequest(initialSearchText),null);

    const doSearch = (searchText: string) => {
        const request = buildSearchRequest(searchText);
        doFetch(request);
    };

    return {isLoading: isLoading, isError: isError, nasaImages: data, doSearch: doSearch};
}