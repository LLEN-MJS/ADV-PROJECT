import { router } from 'expo-router';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';


const App = () => {

    const onPressSignUp = () => {
        router.replace('/');
    };

    return (
        <ImageBackground source={{ uri: 'https://assets-global.website-files.com/5a9ee6416e90d20001b20038/635acf1a3e103d4823c4ca6a_horizontal%20-%202022-10-27T213400.071.svg' }}
        style={styles.bG}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Successfully Registered...</Text>

                    <TouchableOpacity onPress={onPressSignUp} style={styles.signUpBtn}>
                        <Text style={styles.signupText}>LOGIN</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    
    bG: {
        flex: 1,
        resizeMode: 'cover'
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        alignItems: 'center',
        justifyContent: 'center',
    },

    container: {
        borderWidth: 1  ,
        borderColor: '#FBFFDC',
        borderRadius:25,
        padding: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },

    title: {
        fontWeight: "bold",
        fontSize:25,
        color:"white",
        marginBottom: 20,
    },

    signUpBtn: {
        width: 350,
        backgroundColor:"#FF90BC",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:10,
    },

    signupText: {
        color: 'white'
    },

});

export default App;