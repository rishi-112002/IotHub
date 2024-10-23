import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import GenericAddForm from "./GenericAddForm";
function GenericAddScreen() {
    return(
        <GestureHandlerRootView>
            <GenericAddForm/>
        </GestureHandlerRootView>
    )
   
}
export default GenericAddScreen;


