import Colors from '@/constant/Colors'
import { getLocalStorage } from '@/service/storage'
import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'

const Profile = () => {
  const [userSN, setUserSN] = useState("")
  const getUserData = async () => {
    const userDetails = await getLocalStorage('userDetail');
    console.log(userDetails.user.displayName);
    // if(userDetails.user.displayName){

    // }
  }
  useEffect(() => {
    getUserData();
  }, [])
  return (
    <ScrollView style={{padding: 25}}>
        <View style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <View style={{height: 130, width: 130, backgroundColor: Colors.LIGHT_PRIMARY, borderRadius: '100%'}}></View>
        </View>
    </ScrollView>
  )
}

export default Profile