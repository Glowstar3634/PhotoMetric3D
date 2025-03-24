import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Switch, Animated, Easing, Dimensions } from 'react-native'
import React from 'react';
import styles from '../styles/default';
import { useRoute } from '@react-navigation/native';

import { useFonts } from 'expo-font';

import { auth, database } from '../firebase';
import { set, get, ref } from 'firebase/database';
import { signOut, onAuthStateChanged, signInWithEmailAndPassword, getAuth } from '@firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from './UserContext';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SHADOWS, SIZES, FONT} from '../constants';

const Start = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const id = route?.params?.profileid ?? null;
    const { currentUser, setCurrentUser } = React.useContext(UserContext)
    const [stage, setStage] = React.useState(0);
    const [shown, setShown] = React.useState(0);

    const up0 = React.useState(new Animated.Value(0))[0];
    const op0 = React.useState(new Animated.Value(1))[0];

    const [usernameInput, onUsernameUpdate] = React.useState('');
    const [passwordInput, onPasswordUpdate] = React.useState('');
    const [remember, setRemember] = React.useState(false);
    const up1 = React.useState(new Animated.Value(0))[0];
    const op1 = React.useState(new Animated.Value(1))[0];
    const toggleSwitch = () => setRemember(previousState => !previousState);

    const [newUserInput, setNewUserInput] = React.useState('');
    const [newPassInput, setNewPassInput] = React.useState('');
    const [newPassCInput, setNewPassCInput] = React.useState('');
    const up2 = React.useState(new Animated.Value(0))[0];
    const op2 = React.useState(new Animated.Value(1))[0];

    const inAnimation0 = React.useRef(
        Animated.parallel([
            Animated.timing(up0, {
                toValue: 0, // Move up0 from -10 to 0
                duration: 500,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(op0, {
                toValue: 1, // Fade op0 from 0 to 1
                duration: 500,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }),
        ])
    ).current;
    
    const inAnimation1 = React.useRef(
        Animated.parallel([
            Animated.timing(up1, {
                toValue: 0, // Move up1 from -10 to 0
                duration: 500,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(op1, {
                toValue: 1, // Fade op1 from 0 to 1
                duration: 500,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }),
        ])
    ).current;
    
    const inAnimation2 = React.useRef(
        Animated.parallel([
            Animated.timing(up2, {
                toValue: 0, // Move up2 from -10 to 0
                duration: 500,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(op2, {
                toValue: 1, // Fade op2 from 0 to 1
                duration: 500,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }),
        ])
    ).current;
    
    const outAnimation0 = React.useRef(
        Animated.parallel([
            Animated.timing(up0, {
                toValue: -10, // Move up0 back from 0 to -10
                duration: 500,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(op0, {
                toValue: 0, // Fade op0 back from 1 to 0
                duration: 500,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }),
        ])
    ).current;
    
    const outAnimation1 = React.useRef(
        Animated.parallel([
            Animated.timing(up1, {
                toValue: -10, // Move up1 back from 0 to -10
                duration: 500,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(op1, {
                toValue: 0, // Fade op1 back from 1 to 0
                duration: 500,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }),
        ])
    ).current;
    
    const outAnimation2 = React.useRef(
        Animated.parallel([
            Animated.timing(up2, {
                toValue: -10, // Move up2 back from 0 to -10
                duration: 500,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(op2, {
                toValue: 0, // Fade op2 back from 1 to 0
                duration: 500,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }),
        ])
    ).current;

    React.useEffect(() => {
        if(stage == 0){
            if(shown == 1){
                outAnimation1.start(()=>{
                    setShown(0)
                    inAnimation0.start(()=>{

                    })
                })
            }else if(shown == 2){
                outAnimation2.start(()=>{
                    setShown(0)
                    inAnimation0.start(()=>{
                        
                    })
                })
            }
        }else if (stage == 1){
            if(shown == 0){
                outAnimation0.start(()=>{
                    setShown(1)
                    inAnimation1.start(()=>{

                    })
                })
            }else if(shown == 2){
                outAnimation2.start(()=>{
                    setShown(1)
                    inAnimation1.start(()=>{
                        
                    })
                })
            }
        }else if(stage == 2){
            if(shown == 1){
                outAnimation1.start(()=>{
                    setShown(2)
                    inAnimation2.start(()=>{

                    })
                })
            }else if(shown == 0){
                outAnimation0.start(()=>{
                    setShown(2)
                    inAnimation2.start(()=>{
                        
                    })
                })
            }
        }
    }, [stage]);

    const guest = () =>{
        navigation.navigate('home')
    }

    const login =()=>{

    }

    const signup =()=>{
        
    }

  return (
    <View style={{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: COLORS.dark
    }}>
        <View style={{
            flex:2,
            width: "100%",
            alignItems: 'center',
            justifyContent:'center'
        }}>
            <Text style={[styles.actionButtonText, { color: "#999999", fontWeight: "300", fontStyle:'italic', fontSize: SIZES.medium, marginTop: 50}]}>Created by Nova, Sanjay, Ethan, and Nimay</Text>
            <View style={{
                flex:2,
                width: '100%',
                justifyContent:'center',
                alignItems:'center'
            }}>
                
                <Image
                    style={{ width: '90%', flex:1, zIndex: 500, alignSelf:'flex-end' }}
                    resizeMode="contain"
                    source={require('../constants/images/PM3DLogo.png')}
                />
            </View>
            <View style={{
                flex:3,
                width:'100%'
            }}>
                {shown == 0 && <Animated.View style={{
                transform: [{ translateY: up0 }],
                opacity: op0,
                width: "100%",
                alignItems: "center",
                marginBottom: 30,
                justifyContent:'space-around'
            }}>
                <TouchableOpacity 
                style={[styles.actionButton, { width: '70%', height: 50, borderWidth: 0, margin:20}, SHADOWS.small]} 
                onPress={() => {setStage(1)}}
            >
                <LinearGradient
                colors={[COLORS.primary, COLORS.light]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={{
                    flex: 1,
                    width: "100%",
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    borderRadius: 20,
                }}
                >
                <Text style={[styles.actionButtonText, { color: "black", fontWeight: "900"}]}>Login</Text>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.actionButton, { width: '70%', height: 50, borderWidth: 0, margin:20}, SHADOWS.small]} 
                onPress={() => {setStage(2)}}
            >
                <LinearGradient
                colors={[COLORS.primary, COLORS.light]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={{
                    flex: 1,
                    width: "100%",
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    borderRadius: 20,
                }}
                >
                <Text style={[styles.actionButtonText, { color: "black", fontWeight: "900"}]}>Create Account</Text>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.actionButton, { width: '70%', height: 50, borderWidth: 0, margin:20}, SHADOWS.small]} 
                onPress={() => { guest() }}
            >
                <LinearGradient
                colors={[COLORS.primary, COLORS.light]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={{
                    flex: 1,
                    width: "100%",
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    borderRadius: 20,
                }}
                >
                <Text style={[styles.actionButtonText, { color: "black", fontWeight: "900"}]}>Use as Guest</Text>
                </LinearGradient>
            </TouchableOpacity>
            </Animated.View>}

            {shown == 1 && <Animated.View style={{
                transform: [{ translateY: up1 }],
                opacity: op1,
                width: "100%",
                alignItems: "center",
                marginBottom: 30,
                justifyContent:'space-around'
            }}>
                <View style={{ width: '70%' }}>
                        <Text style={styles.tbDesc}>Username</Text>
                        <View style={[styles.textBox, { marginBottom: 20 }]}>
                            <TextInput
                                style={styles.tbText}
                                onChangeText={inp => onUsernameUpdate(inp)}
                                defaultValue={usernameInput}
                            />
                        </View>
                    </View>
                    <View style={{ width: '70%' }}>
                        <Text style={styles.tbDesc}>Password</Text>
                        <View style={[styles.textBox, { marginBottom: 20 }]}>
                            <TextInput
                                style={styles.tbText}
                                onChangeText={inp => onPasswordUpdate(inp)}
                                defaultValue={passwordInput}
                            />
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row', 
                        width: '70%', 
                        alignSelf: 'center', 
                        justifyContent: 'flex-start', 
                        alignItems: 'center', 
                        marginBottom: 30
                    }}>
                        <Text style={[styles.tbDesc, { width: 'auto', marginEnd: 10 }]}>Remember Me</Text>
                        <Switch
                            trackColor={{ false: COLORS.dark, true: COLORS.primary }}
                            thumbColor={remember ? COLORS.white : COLORS.white}
                            ios_backgroundColor={COLORS.dark}
                            onValueChange={toggleSwitch}
                            value={remember}
                        />
                    </View>
                    
                    <TouchableOpacity 
                        style={[styles.actionButton, { width: '70%', height: 50, borderWidth: 0}, SHADOWS.small]} 
                        onPress={() => { login() }}
                    >
                        <LinearGradient
                        colors={[COLORS.primary, COLORS.light]}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 1}}
                        style={{
                            flex: 1,
                            width: "100%",
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            borderRadius: 20,
                        }}
                        >
                        <Text style={[styles.actionButtonText, {color: "black", fontWeight: "900"}]}>Login</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[{ width: '70%', height: 50, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginBottom: 15 }]} 
                        onPress={() => {setStage(2)}}
                    >
                        <Text style={{ fontSize: SIZES.medium, color: COLORS.white}}>Don't have an account? </Text>
                        <Text style={{ fontSize: SIZES.medium, fontWeight: 800, color: COLORS.white }}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{width: '70%', height: 50, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginBottom: 50}]} onPress={() => {setStage(0)}}>
                        <Text style={{fontSize: SIZES.medium, fontWeight: 800, color: COLORS.white}}>Back</Text>
                    </TouchableOpacity>
            </Animated.View>}

            {shown == 2 && <Animated.View style={{
                transform: [{ translateY: up2 }],
                opacity: op2,
                width: "100%",
                alignItems: "center",
                marginBottom: 30,
                justifyContent:'space-around'
            }}>
                <View style={{width: '70%'}}>
                <Text style={styles.tbDesc}>Create Username</Text>
                <View style={[styles.textBox,{marginBottom: 20}]}>
                    <TextInput
                        style={styles.tbText}
                        onChangeText={inp => setNewUserInput(inp)}
                        defaultValue= {newUserInput}
                    />
                </View>
            </View>
            <View style={{width: '70%'}}>
                <Text style={styles.tbDesc}>Password</Text>
                <View style={[styles.textBox,{marginBottom: 20, flexDirection: 'row'}]}>
                    <TextInput
                        style={styles.tbText}
                        onChangeText={inp => setNewPassInput(inp)}
                        defaultValue= {newPassInput}
                        secureTextEntry={true}
                    />
                </View>
            </View>
            <View style={{width: '70%'}}>
                <Text style={styles.tbDesc}>Confirm Password</Text>
                <View style={[styles.textBox,{marginBottom: 20}]}>
                    <TextInput
                        style={styles.tbText}
                        onChangeText={inp => setNewPassCInput(inp)}
                        defaultValue= {newPassCInput}
                        secureTextEntry={true}
                    />
                </View>
            </View>
            <TouchableOpacity style={[styles.actionButton,{width: '70%', height: 50, borderWidth:0},SHADOWS.small]} onPress={() => {signup()}}>
                <LinearGradient
                    colors={[COLORS.primary, COLORS.light]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={{
                        flex: 1,
                        width: "100%",
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        borderRadius: 20,
                    }}
                    >
                    <Text style={[styles.actionButtonText, {color: "black", fontWeight: "900"}]}>Sign Up</Text>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={[{width: '70%', height: 50, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginBottom: 15}]} onPress={() => {setStage(1)}}>
                <Text style={{fontSize: SIZES.medium, color: COLORS.white}}>Already have an account? </Text>
                <Text style={{fontSize: SIZES.medium, fontWeight: 800, color: COLORS.white}}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{width: '70%', height: 50, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginBottom: 50}]} onPress={() => {setStage(0)}}>
                <Text style={{fontSize: SIZES.medium, fontWeight: 800, color: COLORS.white}}>Back</Text>
            </TouchableOpacity>
            </Animated.View>}
            </View>
            
            <Text style={[styles.actionButtonText, { color: "#999999", fontWeight: "300", fontStyle:'italic', fontSize: SIZES.medium, marginBottom: 50}]}>Version 1.03</Text>

        </View>
    </View>
  )
}

export default Start