import React from 'react'
import { View,Text, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import { WhiteLogo } from '../components/WhiteLogo'
import { loginStyles } from '../theme/loginTheme'
import { StackScreenProps } from '@react-navigation/stack';
import { useForm } from '../hooks/useForm';

interface Props extends StackScreenProps<any,any>{}

export const RegisterScreen = ({navigation} : Props) => {

    const {email, password, names, onChange} = useForm({
        email: '',
        password: '',
        names: ''
    })

    const onRegister = () => {
        console.log({email, password, names})
        Keyboard.dismiss()
    }
    return (
        <>
            <KeyboardAvoidingView
                style={{flex:1, backgroundColor: '#5856D6'}}
                behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
            >
                <View style={loginStyles.formContainer}>
                    <WhiteLogo />
                    <Text style={loginStyles.title}>Registro</Text>
                    <Text style={loginStyles.label}>Nombre</Text>
                    <TextInput
                        placeholder="Ingrese su nombre"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        underlineColorAndroid="white"
                        style={[
                            loginStyles.inputField,
                            (Platform.OS === 'ios') && loginStyles.inputFieldIOS
                        ]}
                        selectionColor="white"
                        onChangeText={(value) => onChange(value, 'names')}
                        value={names}
                        onSubmitEditing={onRegister}
                        autoCapitalize="words"
                        autoCorrect={false}
                    />
                    <Text style={loginStyles.label}>Email</Text>
                    <TextInput
                        placeholder="Ingrese su email"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        keyboardType="email-address"
                        underlineColorAndroid="white"
                        style={[
                            loginStyles.inputField,
                            (Platform.OS === 'ios') && loginStyles.inputFieldIOS
                        ]}
                        selectionColor="white"
                        onChangeText={(value) => onChange(value, 'email')}
                        value={email}
                        onSubmitEditing={onRegister}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <Text style={loginStyles.label}>Contraseña</Text>
                    <TextInput
                        placeholder="*******"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        underlineColorAndroid="white"
                        secureTextEntry
                        style={[
                            loginStyles.inputField,
                            (Platform.OS === 'ios') && loginStyles.inputFieldIOS
                        ]}
                        selectionColor="white"
                        onChangeText={(value) => onChange(value, 'password')}
                        value={password}
                        onSubmitEditing={onRegister}
                    />

                    <View style={loginStyles.buttonContainer}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={loginStyles.button}
                            onPress={onRegister}
                        >
                            <Text style={loginStyles.buttonText}>Crear Cuenta</Text>

                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={loginStyles.buttonReturn}
                        onPress={() => navigation.replace('Login')}
                    >
                        <Text style={loginStyles.buttonText}>Login</Text>

                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </>
    )
}
