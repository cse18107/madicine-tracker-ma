import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getLocalStorage, RemoveLocalStorage } from '@/service/storage'
import { signOut } from 'firebase/auth';
import { auth } from '@/config/FirebaseConfig';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '@/constant/Colors';

export default function Header() {
    const [user, setUser] = useState();
    useEffect(() => {
        // signOut(auth).then(async() => {
        //     await RemoveLocalStorage()
        // })
        GetUserDetails();
    }, [])
    const GetUserDetails = async () => {
        const userInfo = await getLocalStorage('userDetail');
        setUser(userInfo.user);
    }
  return (
    <View style={{
        marginTop: 20
    }}>
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
        }}>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
      }}>
        <Image source={require('./../assets/images/smiley.png')} style={{
            width: 45,
            height: 45
        }} />
        <Text style={{
            fontSize: 30,
            fontWeight: 'bold'
        }}>Hello {user?.displayName}</Text>
        </View>
        <Ionicons name='settings-outline' size={34} color={Colors.DARK_GRAY} />
      </View>
    </View>
  )
}