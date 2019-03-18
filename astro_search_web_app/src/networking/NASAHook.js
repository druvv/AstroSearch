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

        // Intentionally ignore resulting promise... Response from fetch request will update the component's state.
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
 * @param {?string} startYear - An optional start year with which to filter the results.
 * @param {?string} endYear - An optional end year with which to filter the results.
 * @returns {Request} A request object representing a search with NASA's image api.
 */
function buildSearchRequest(searchText: string, startYear: ?string, endYear: ?string): Request {

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

            // Fix crash on missing keywords JSON var by giving keywords default empty array value
            let keywords = [];
            if (j.keywords && Array.isArray(j.keywords)) {
                keywords = j.keywords;
            }

            return new NASAImage(
                j.nasa_id,
                j.link,
                j.title,
                j.description,
                j.date_created,
                keywords,
                j.secondary_creator
            );
        });
    };

    // Build parameters
    let params = {};
    params.q = searchText;
    params.media_type = 'image';
    if (startYear != null) {
        params.year_start = startYear
    }
    if (endYear != null) {
        params.year_end = endYear
    }

    return new Request(
        API_URL_SEARCH,
        params,
        postFunction
    );
}

/**
 * A hook to debounce a function call.
 *
 * @param value The value that will be changing in a stateful manner;
 * @param func The function to call with the debounced value;
 * @param delay The delay that this function should debounce with.
 */
export function useDebounce(value: any, func: (any) => void, delay: number) {
    useEffect(
        () => {
            // Set debouncedValue to value (passed in) after the specified delay
            const handler = setTimeout(() => {
                func(value);
            }, delay);

            // Return a cleanup function that will be called every time
            // ... useEffect is re-called. useEffect will only be re-called
            // ... if value changes (see the inputs array below).
            // This is how we prevent debouncedValue from changing if value is
            // ... changed within the delay period. Timeout gets cleared and restarted.
            // To put it in context, if the user is typing within our app's
            // ... search box, we don't want the debouncedValue to update until
            // ... they've stopped typing for more than 500ms.
            return () => {
                clearTimeout(handler);
            };
        },
        // Only re-call effect if value changes
        // You could also add the "delay" var to inputs array if you
        // ... need to be able to change that dynamically.
        [value]
    );
}

/**
 * A React Hook that simplifies the usage of the NASA image search api.
 * @param initialSearchText - The initial search text for the function.
 * @returns An object of {isLoading, isError, data, doSearch(string, ?string, ?string)} where doSearch
 * searches with the given searchText, and optional start and end years.
 */
export function useNASASearch(initialSearchText: string): {
    isLoading: boolean,
    isError: boolean,
    nasaImages: ?[NASAImage],
    doSearch: ((searchText: string, startYear: ?string, endYear: ?string) => void)
} {

    const [ isLoading, isError, data, doFetch] = useDataAPI(buildSearchRequest(initialSearchText),null);

    const doSearch = (searchText: string, startYear: ?string, endYear: ?string) => {
        const request = buildSearchRequest(searchText, startYear, endYear);
        doFetch(request);
    };

    return {isLoading: isLoading, isError: isError, nasaImages: data, doSearch: doSearch};
}