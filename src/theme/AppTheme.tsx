import { StyleSheet } from "react-native";

export const stylesAppTheme = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#fff',
        //marginTop:20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    textinput: {
        backgroundColor: "white",
        width: "80%",
        height: 40,
        borderRadius: 5,
    },
    button: {
        width: "50%",
        height: 30,
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    textButton: {
        //color: "black",
        fontSize: 15,
        textTransform: 'uppercase',
    },
    title: {
        fontSize: 30,
        marginBottom: 30,
        textDecorationStyle: 'solid',
    },
    pickerContainer: {
        borderRadius: 10, // Bordes redondeados
        borderWidth: 4, // Ancho del borde
        //borderColor: themeData.vistas, // Color del borde
        paddingHorizontal: 10, // Espaciado interno
        marginVertical: 10, // Margen vertical
        backgroundColor: "green",
        width: 200,
    },

    buttonLink: {
        alignItems: "center",
        height: 40,
        justifyContent: "center",
        width: 'auto',
        paddingHorizontal: 20,
        alignSelf: "center",
        marginBottom: 5,
    },
    textLink: {
        fontSize: 17,
        fontWeight: "bold",
        textDecorationLine: "underline",

    },

     animeConteiner: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: "100%",
        justifyContent: "center",
        borderRadius: 10,
        marginTop: 5,
        //marginHorizontal: -3,
    },

    animeCell:
    {
        padding: 0,
        //margin: 5,
        //marginHorizontal: 3,

    },
    animeCellImage: {
        width: 100,
        height: 150,
        borderRadius: 10,

    },
    animeCellText: {
        textAlign: "right",
        width: 100,
    },
});
