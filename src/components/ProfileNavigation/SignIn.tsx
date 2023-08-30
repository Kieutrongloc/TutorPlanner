import React, { useState } from 'react';
import {View, SafeAreaView, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Dimensions, KeyboardAvoidingView, Platform} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faClose, faSignIn } from '@fortawesome/free-solid-svg-icons';
// import { LinearGradient } from 'react-native-svg';
// import SwipeablePanel from 'rn-swipeable-panel';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const SignIn: React.FC<{ isVisible: boolean; onClose: () => void; onOpenSignUp: () => void }> = ({ isVisible, onClose, onOpenSignUp}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Logic for handling sign-in here
    console.log('Sign in:', email, password);
  };
  
  const handleForgotPassword = () => {
    console.log('forgot pw')
  };

  const handleSignUp = () => {

  };

  const clearForm = () => {
    setEmail(''); setPassword('');
  };

  const closeHandle = () => {
    onClose();
    clearForm();
  };

  const switchSignUpHandle = () => {
    onClose();
    onOpenSignUp();
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
                <Text style={styles.title}>Sign In</Text>
                <Text style={styles.description}>Welcome back! Sign in to your account</Text>
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
                <TouchableOpacity onPress={handleForgotPassword}>
                  <Text style={styles.forgotPassword}>Forgot your password?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                  <Text style={styles.buttonText}>Sign in</Text>
                  <FontAwesomeIcon icon={ faSignIn } color="white" size={24} />
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <View style={styles.createAccountContainer}>
                <Text>Don't have an account? </Text>
                <TouchableOpacity onPress={switchSignUpHandle}>
                  <Text style={styles.createAccount}>Create one.</Text>
                </TouchableOpacity>
              </View>

            </View>
            
          </View>
        </View>

      </KeyboardAvoidingView>
    </Modal>
  )

}
export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
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
    alignItems: 'center'
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
  }

})