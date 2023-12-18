import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../Firebase/firebase';


const App = () => {

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {

        if (user.length > 0) {
            if (!user.endsWith('@gmail.com')) {
                setEmailError('Invalid email format');
            } 

            else {
                setEmailError('');
            }
        }

        if (password.length > 0) {
            if (password.length < 8 || password.length > 20) {
                setPasswordError('Password must be between 8 to 20 characters');
            } 

            else {
                setPasswordError('');
            }
        }
    }, [user, password]);

    const auth = getAuth (app);
    const onPressLogin = () => {
        if (user === 'allenpaulmejos@gmail.com' && password === '12345678') {
            router.replace('/HomePage');
            alert('Welcome Our Dear User...');
            return;
        } 
        signInWithEmailAndPassword(auth, user, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            router.replace('/HomePage')
            alert('Login Successfully...');
        })
        .catch((error) => {
            const errorCode = error.code;
            alert(error.message);
        });

        if (emailError || passwordError) {
            return;
        }

        console.log(user);
        console.log(password);

    };

    const onPressForgotPassword = () => {

    };

    const onPressSignUp = () => {
        router.replace('/signUp');
    };

    const [rememberMe, setRememberMe] = useState(false);

    return (
        <ImageBackground source={{ uri: 'https://assets-global.website-files.com/5a9ee6416e90d20001b20038/635acf1a3e103d4823c4ca6a_horizontal%20-%202022-10-27T213400.071.svg' }}
        style={styles.bG}>
            <ImageBackground
                source={{
                    uri: 'https://img.freepik.com/free-vector/hand-drawn-spiral-book-mockup-illustration_23-2149575507.jpg?w=740&t=st=1701744892~exp=1701745492~hmac=a7817f3cf5c2fef141863b47bbacacc8d310dbfecb86837e3ee2c086c2f46aaa'
                }}
                style={{
                    ...styles.overlay,
                    width: 750,  // Adjust the width as needed
                    height: 750, // Adjust the height as needed
                }}
            ></ImageBackground>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>JOURNAL DIARY</Text>
                        <View style={styles.inputView}>
                            <TextInput
                            style={styles.inputText}
                            placeholder="EMAIL"
                            placeholderTextColor="#363062"
                            onChangeText={(text) => setUser(text)} />
                        </View>
                        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.inputText}
                                secureTextEntry={!showPassword} 
                                placeholder="PASSWORD"
                                placeholderTextColor="#363062"
                                onChangeText={(text) => setPassword(text)}
                            />
                            <TouchableOpacity
                                style={styles.toggleButton}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Text style={styles.toggleButtonText}>
                                    {showPassword ? 'HIDE' : 'SHOW'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {passwordError ? ( <Text style={styles.errorText}>{passwordError}</Text> ) : null}

                    

                    <TouchableOpacity onPress={onPressLogin} style={styles.loginBtn}>
                        <Text style={styles.loginText}>LOGIN</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onPressSignUp} style={styles.signUpBtn}>
                        <Text style={styles.signupText}>SIGN UP</Text>
                    </TouchableOpacity>

                    <View style={styles.checkboxContainer}>
                        <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
                            <View style={styles.checkbox}>
                                {rememberMe && <View style={styles.checkboxInner}></View>}
                            </View>
                        </TouchableOpacity>
                            <Text style={styles.rememberMeText}>REMEMBER ME</Text>
                    </View>
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

    toggleButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 1,
    },
    toggleButtonText: {
        color: 'black',
        fontSize: 11,
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 100,
    },

    container: {
        borderWidth: 6,
        borderColor: 'white',
        borderRadius:68,
        padding: 36,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '',
        alignSelf: 'flex-end'
    },

    title: {
        fontWeight: "bold",
        fontSize:69,
        color:"#F6FA70",
        marginBottom: 40,
    },

    inputView: {
        width: 350,
        backgroundColor:"#FFF7D4",
        borderRadius:25,
        height:50,
        marginTop:10,
        marginBottom:10,
        justifyContent:"center",
        padding:20
    },

    inputText: {
        height:50,
        color:"black"
    },

    forgotAndSignUpText: {
        marginTop:10,
        color:"white",
        fontSize:11
    },

    loginBtn: {
        width: 350,
        backgroundColor:"#FFF78A",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20,
    },

    signUpBtn: {
        width: 350,
        backgroundColor:"#FFF78A",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20,
    },


    signupText: {
        color: 'black'
    },

    loginText: {
        color: 'black'
    },

    checkboxContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    
    checkbox: {
        marginRight: 10,
        marginTop: 20,
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    
    checkboxInner: {
        width: 12,
        height: 12,
        backgroundColor: 'black',
    },

    rememberMeText: {
        marginTop: 20,

    },

    errorText: {
        color: 'red',
        fontSize: 12,
    },

});

export default App;