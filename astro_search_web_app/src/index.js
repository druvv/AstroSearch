import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import 'typeface-roboto'
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import 'material-ui-pickers';

// Theme the app with a material theme
const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#5f5fc4',
            main: '#283593',
            dark: '#001064',
            contrastText: '#fff',
        },
        secondary: {
            main: '#009688',
            contrastText: '#fff',
        },
    },
    overrides: {
        MuiInputBase: {
            root: {
                color: '#fff'
            }
        },
        MuiFormLabel: {
            root: {
                color: '#fff'
            }
        },
        MuiIconButton: {
            root: {
                color: '#fff'
            }
        },
    },
    props: {
        MuiInputLabel: {
            shrink: true,
        },
    },
});

// Wrap App with the material theme provider.
function AppWithStyling() {
    return (
        <MuiThemeProvider theme={theme}>
            <App/>
        </MuiThemeProvider>
    );
}

// Load the app!!!
ReactDOM.render(<AppWithStyling />, document.getElementById('root'));
