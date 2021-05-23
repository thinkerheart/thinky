import { AppRegistry } from "react-native";
import { ThinkyApp } from "./src/ThinkyApp";
import {name as appName} from './app.json'
 
AppRegistry.registerComponent(appName, () => ThinkyApp);