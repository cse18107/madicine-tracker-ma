import { Tabs, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/FirebaseConfig";

let timeout: number ;
const TabLayout = () => {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(0)
  onAuthStateChanged(auth, (user) => {
    if(user){
      setAuthenticated(1)
    }else {
      setAuthenticated(2)
    }
  })
  useEffect(() => {
    if(authenticated===2){
      if(timeout) clearTimeout(timeout)
      timeout = setTimeout(() => {
        router.push('/login');
      },100) as unknown as number
    }
    return () => clearTimeout(timeout)
  }, [authenticated])
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="AddNew"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="plus-square" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
