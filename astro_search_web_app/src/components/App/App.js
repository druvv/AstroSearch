// @flow
import React, { useState, useEffect, useReducer } from 'react';

import { useNASASearch } from "../../networking/NASAHook";

// nodejs library that concatenates classes
import classNames from "classnames";
import './App.css';
// Main Components
import Header from '../Header/Header';
import HeaderLinks from '../Header/HeaderLinks'
import Parallax from '../Parallax/Parallax'

import HeaderBackground from '../Header/header-bg.jpg';

function App() {

    // Use Data Hook
    const initialSearch = 'pluto';
    const {isLoading, isError, nasaImages, doSearch } = useNASASearch(initialSearch);
    const [searchText, setSearchText] = useState(initialSearch);

   return (
       <div>
           <Header
               color="transparent"
               brand="AstroSearch"
               rightLinks={<HeaderLinks />}
               fixed
               changeColorOnScroll={{
                   height: 200,
                   color: "white"
               }}
           />
           <Parallax small filter image={HeaderBackground} />
           <div>
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
           </div>
           <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
                 integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
                 crossOrigin="anonymous"/>
       </div>
   )
}

export default App;
