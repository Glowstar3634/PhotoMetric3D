import { StyleSheet, Platform} from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../constants";

import React from 'react'

const styles = StyleSheet.create({
    textBox:{
        borderRadius: 5,
        borderColor: COLORS.light,
        borderWidth: 1,
        height: 50,
        backgroundColor: "#55440055"
    },
    tbDesc:{
        color: COLORS.white,
        marginBottom: 3
    },
    tbText:{
        height:'100%',
        alignItems: 'center',
        alignSelf:"center",
        justifyContent: 'center',
        width:'100%',
        padding:10,
        color:'white',
        fontSize: SIZES.medium
    },
    actionButton: {
        borderRadius: 20,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1
    },
    actionButtonText: {
        color: COLORS.black,
        fontWeight: "700",
        fontSize: SIZES.large,
    },
    screenHeader: {
        fontSize: SIZES.xxLarge,
        color: COLORS.black,
        fontWeight: "600"
    },
    subHeader1:{
        fontSize: SIZES.large,
        color: COLORS.black,
        fontWeight: "500"
    },
    text1:{
        fontSize: SIZES.medium,
        color: COLORS.black,
        fontWeight: "500",
    },
    infoButton:{
        width:'95%',
        height: 80,
        justifyContent: 'space-between',
        alignItems:'center',
        borderRadius: 20,
        backgroundColor: COLORS.white,
        flexDirection:'row',
        marginBottom: 20,
        shadowColor: COLORS.secondary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        paddingStart: 30,
        paddingEnd: 30,
        shadowRadius: 5,
        elevation: 2,
    }
});

export default styles;