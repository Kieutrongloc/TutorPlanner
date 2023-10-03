import React, { useState } from 'react';
import {View, SafeAreaView, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Dimensions, KeyboardAvoidingView, Platform} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faClose, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import CountryPicker, { CountryModalProvider } from 'react-native-country-picker-modal';
// import { LinearGradient } from 'react-native-svg';
// import SwipeablePanel from 'rn-swipeable-panel';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const SignUp: React.FC<{ isVisible: boolean; onClose: () => void; onOpenSignIn: () => void }> = ({ isVisible, onClose, onOpenSignIn }) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirm, setPasswordConfirm] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [countryCode, setCountryCode] = React.useState('');
    const [countryPhoneCode, setCountryPhoneCode] = React.useState('')
    const [country, setCountry] = React.useState(null);
    // const [country, setCountry] = React.useState<Country | null>(null);


  const handleSignUp = () => {
    console.log('Sign up:', email, password, passwordConfirm, phoneNumber, country, countryCode);
  };
  
  const handleForgotPassword = () => {
    console.log('forgot pw')
  };

  const handleSignIn = () => {

  };
  const handleCountrySelect = (selectedCountry: Country) => {
    setCountryCode(selectedCountry.cca2);
    setCountry(selectedCountry);
  };

  const clearForm = () => {
    setEmail(''); setPassword(''); setPasswordConfirm(''); setPhoneNumber(''), setCountryCode(''); setCountryPhoneCode(''); setCountry(null);
  };

  const closeHandle = () => {
    onClose();
    clearForm();
  };

  const switchSignInHandle = () => {
    onClose();
    onOpenSignIn();
  }

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

        <View style={styles.container}>
          <View style={styles.wrapper}>
            <TouchableOpacity onPress={closeHandle} style={styles.closeButton}>
              <FontAwesomeIcon icon={ faClose } color="#777777" size={24} />
            </TouchableOpacity>

            <View>
              <View style={styles.formContainer}>
                <Text style={styles.title}>Sign Up</Text>
                <Text style={styles.description}>Create your new account!</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  onChangeText={text => setEmail(text)}
                  value={email}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  onChangeText={text => setPassword(text)}
                  value={password}
                  secureTextEntry
                />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm password"
                  onChangeText={text => setPasswordConfirm(text)}
                  value={passwordConfirm}
                  secureTextEntry
                />

                <CountryModalProvider>
                    <CountryPicker
                    countryCode={countryCode}
                    withFilter
                    withFlag
                    withCountryNameButton
                    withAlphaFilter
                    withCallingCode
                    onSelect={handleCountrySelect}
                    containerButtonStyle={styles.countryPickerButton}
                    />
                </CountryModalProvider>

                <TextInput
                  style={styles.input}
                  placeholder="Phone number"
                  onChangeText={text => setPhoneNumber(text)}
                  value={phoneNumber}
                  keyboardType="numeric"
                />

                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                  <Text style={styles.buttonText}>Sign up</Text>
                  <FontAwesomeIcon icon={ faUserPlus } color="white" size={24} />
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <View style={styles.createAccountContainer}>
                <Text>Have an account already? </Text>
                <TouchableOpacity onPress={switchSignInHandle}>
                  <Text style={styles.createAccount}>Sign in.</Text>
                </TouchableOpacity>
              </View>
            </View>
            
          </View>
        </View>

      </KeyboardAvoidingView>
    </Modal>
  )

}
export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    // borderTopRightRadius: 16,
    // borderTopLeftRadius: 16,
  },
  wrapper: {
    backgroundColor: '#e5e5e5',
    height: screenHeight * 0.92,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    marginTop: screenHeight * 0.08,
    paddingTop: 20,
    justifyContent: 'space-between',
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    marginBottom: 14,
    fontWeight: 'bold',
    color: '#FF6347',
  },
  description: {
    fontSize: 14,
    marginBottom: 30,
    color: '#666'
  },
  input: {
    width: screenWidth * 0.9,
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  forgotPassword: {
    marginTop: 10,
    marginBottom: 20,
    color: 'brown',
  },
  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 16,
    width: screenWidth * 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginRight: 6
  },
  createAccountContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginBottom: 40
  },
  createAccount: {
    color: 'green',
    textDecorationLine: 'underline'
  },
  closeButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#dadada',
    borderWidth: 1,
    padding: 4,
    borderRadius: 16,
    zIndex: 100
  },
  countryPickerButton: {
    width: screenWidth * 0.9,
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 20,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
})