import { router } from 'expo-router';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native';

const HomePage = () => {

    const onPressRecipe = () => {
        router.replace('/recipe');
    };

    const onPressCustom = () => {
        router.replace('/RecipeList');
    };

    const onPressLogout = () => {
        router.replace('/');
    };

    return (
        <ImageBackground
            source={{
                uri: 'https://assets-global.website-files.com/5a9ee6416e90d20001b20038/635acf1a3e103d4823c4ca6a_horizontal%20-%202022-10-27T213400.071.svg',
            }}
            style={styles.bG}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>DIARY </Text>
                    <View style={styles.imageContainer}>
                        <TouchableOpacity onPress={onPressRecipe} style={styles.recipeBtn}>
                            <ImageBackground
                                source={{
                                    uri: 'https://img.freepik.com/premium-vector/3d-list-3d-document-3d-report-sheet_238404-1369.jpg?size=626&ext=jpg&ga=GA1.1.1880011253.1699488000&semt=ais',
                                }}
                                style={styles.imageBackground}
                            >
                                <Text style={styles.imageText}>To Do List</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onPressCustom} style={styles.customBtn}>
                            <ImageBackground
                                source={{
                                    uri: 'https://img.freepik.com/premium-vector/3d-mail-envelope-icon-with-notification-new-message-blue-sky-cloud-background-minimal-email-letter-with-bubble-unread-icon-message-concept-3d-vector-render-isolated-purple-pastel-background_412828-954.jpg',
                                }}
                                style={styles.imageBackground}
                            >
                                <Text style={styles.imageText}>Reflection Log</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={onPressLogout} style={styles.logoutBtn}>
                        <Text style={styles.logoutText}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    bG: {
        flex: 1,
        resizeMode: 'cover',
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    container: {
        borderWidth: 3,
        borderColor: '#FBFFDC',
        borderRadius: 40, // Increase border radius
        padding: 40, // Increase padding
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        fontWeight: 'bold',
        fontSize: 80, // Increase font size
        color: 'white',
        marginBottom: 20, // Add margin bottom for spacing
    },

    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20, // Reduce margin top
    },

    recipeBtn: {
        width: '48%', // Adjust the width as needed
        height: 300, // Increase the height
        borderRadius: 20, // Add border radius
        overflow: 'hidden', // Clip the border radius overflow
    },

    customBtn: {
        width: '48%', // Adjust the width as needed
        height: 300, // Increase the height
        borderRadius: 20, // Add border radius
        overflow: 'hidden', // Clip the border radius overflow
    },

    logoutBtn: {
        width: 400, // Increase width
        backgroundColor: '#FF90BC', // Change button color
        borderRadius: 25,
        height: 80, // Increase height
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20, // Increase margin top
    },

    imageBackground: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    imageText: {
        color: '#8ACDD7',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        textAlign: 'center',
    },

    logoutText: {
        color: 'white',
    },
});

export default HomePage;

