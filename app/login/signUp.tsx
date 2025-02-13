import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import Colors from '@/constant/Colors';
import { useRouter } from 'expo-router';
import { auth } from '@/config/FirebaseConfig';
import {  createUserWithEmailAndPassword, updateProfile  } from 'firebase/auth';
import { setLocalStorage } from '@/service/storage';

export default function SignUp() {
    const router = useRouter();
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onSubmit = async() => {
      await createUserWithEmailAndPassword(auth, email, password).then(async (userCred) => {
        const user = userCred.user;
        await updateProfile(user, {
          displayName: fullName
        })
        await setLocalStorage('userDetail', user);
        router.push('/(tabs)');
      }).catch((error) => {
        if (error.code === 'auth/user-already-exist') {
          ToastAndroid.show("User with email already exist", ToastAndroid.BOTTOM)
        } else {
          ToastAndroid.show("Something went wrong", ToastAndroid.BOTTOM)
        }
      })
    } 
  return (
    <View style={{
        padding: 25
    }}>
      <Text style={styles.textHeader}>Create  New Account</Text>
      <View style={{
        marginTop: 25
      }}>
        <Text>Full Name</Text>
        <TextInput onChangeText={setFullName} style={styles.textInput} placeholder='Full Name' />
      </View>
      <View style={{
        marginTop: 25
      }}>
        <Text>Email</Text>
        <TextInput onChangeText={setEmail} style={styles.textInput} placeholder='Email' />
      </View>
      <View style={{
        marginTop: 25
      }}>
        <Text>Password</Text>
        <TextInput onChangeText={setPassword} style={styles.textInput} placeholder='Password' />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/login/signIn')}>
              <Text style={{
                  fontSize: 17,
                  color: 'white',
                  textAlign: 'center'
              }}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCreate} onPress={onSubmit} >
              <Text style={{
                  fontSize: 17,
                  color: Colors.PRIMARY,
                  textAlign: 'center'
              }}>Create Account</Text>
            </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    textHeader: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    textInput: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 5,
        fontSize: 17,
        backgroundColor: 'white'
    },
    button: {
        padding: 20,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 10,
        marginTop: 35
    },
    buttonCreate: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 20,
        borderWidth: 1,
        borderColor: Colors.PRIMARY
    }
});