import Colors from '@/constant/Colors'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, ImageBase, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'

export default function LoginScreen() {
  const router = useRouter();
  return (
    <View>
        <View style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 30
        }}>
          <Image source={require('./../../assets/images/login.png')}
            style={styles.image}
          />
        </View>
        <View
          style={{
            padding: 25,
            backgroundColor: Colors.PRIMARY,
            height: '100%',
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50 
          }}
        >
          <Text style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center'
          }}>Stay on Track, Stay Healthy!</Text>
          <Text style={{
            color: 'white',
            textAlign: 'center',
            fontSize: 17,
            marginTop: 20
          }}>Track your meds, take control of your health. Stay consistent, stay confident</Text>
          <TouchableOpacity style={styles?.button} onPress={() => router.push('/login/signIn')}>
            <Text style={{
              textAlign: 'center',
              fontSize: 16,
              color: Colors.PRIMARY
            }}>Continue</Text>
          </TouchableOpacity>
          <Text style={{
            color: 'white',
            textAlign: 'center', 
            marginTop: 10 
          }}>Note: By clicking continue button, you will agree to our terms and conditions</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 210,
    height: 400,
    borderRadius: 23
  },
  button: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 99,
    marginTop: 25
  }
})

