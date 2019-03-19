import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import 'typeface-roboto'
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import { MuiPickersOverrides } from 'material-ui-pickers/typings/overrides'
import 'material-ui-pickers';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#5f5fc4',
            main: '#283593',
            dark: '#001064',
            contrastText: '#fff',
        },
        secondary: {
            light: '#6ab7ff',
            main: '#1e88e5',
            dark: '#005cb2',
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

function AppWithStyling() {
    return (
        <MuiThemeProvider theme={theme}>
            <App/>
        </MuiThemeProvider>
    );
}

ReactDOM.render(<AppWithStyling />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
