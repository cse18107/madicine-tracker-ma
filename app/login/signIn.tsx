import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import Colors from '@/constant/Colors'
import { useRouter } from 'expo-router'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/config/FirebaseConfig';

export default function SignIn() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onSubmit = async () => {
      await signInWithEmailAndPassword(auth, email, password).then((user)=> {
        router.push('/(tabs)');
      }).catch((error) => {
        if (error.code === 'auth/user-not-found') {
          ToastAndroid.show("User not found", ToastAndroid.BOTTOM)
        } else {
          ToastAndroid.show("Something went wrong", ToastAndroid.BOTTOM)
        }
      })
    }
  return (
    <View style={{
        padding: 25
    }}>
      <Text style={styles.textHeader}>Let's Sign You In</Text>
      <Text style={styles.subText}>Welcome Back</Text>
      <Text style={styles.subText}>You've been missed!</Text>
      <View style={{
        marginTop: 25
      }}>
        <Text>Email</Text>
        <TextInput placeholder='Email' style={styles.textInput} onChangeText={setEmail} />
      </View>
      <View style={{
        marginTop: 25
      }}>
        <Text>Password</Text>
        <TextInput placeholder='Password' secureTextEntry={true} style={styles.textInput} onChangeText={setPassword} />
      </View>
      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={{
            fontSize: 17,
            color: 'white',
            textAlign: 'center'
        }}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonCreate} onPress={() => router.push('/login/signUp')}>
        <Text style={{
            fontSize: 17,
            color: Colors.PRIMARY,
            textAlign: 'center'
        }}>Create Account</Text>
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
    textHeader: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    subText: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 15,
        color: Colors.GRAY
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
})