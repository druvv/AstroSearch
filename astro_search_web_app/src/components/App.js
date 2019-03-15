// @flow
import React, { useState, useEffect, useReducer } from 'react';
import './App.css';
import { useNASASearch } from "../networking/NASAHook";

function App() {
    // Use Data Hook
    const initialSearch = 'pluto';
    const {isLoading, isError, nasaImages, doSearch } = useNASASearch(initialSearch);
    const [searchText, setSearchText] = useState(initialSearch);

    return (
        <div className="App">
            <header className="App-header">
                <form
                    onSubmit={event => {
                        doSearch(searchText);
                        event.preventDefault();
                    }}
                >
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button type="submit">Search</button>
                </form>
                {isError && <div>Something went wrong ...</div>}
                {isLoading && <div>Loading ...</div>}
                {!isError && !isLoading && nasaImages &&
                <>
                    <div>Results: {nasaImages.length}</div>
                    <ol>
                        {nasaImages.map(i => <li key={i.nasaID}>{i.title}</li>)}
                    </ol>
                </>
                }
            </header>
        </div>
    );
}

export default App;
