import { auth } from "@/config/FirebaseConfig";
import { getLocalStorage, RemoveLocalStorage } from "@/service/storage";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { Button, Text, View } from "react-native";

export default function HomeScreen() {
    const router = useRouter()
    return (
        <View>
            <Text>Hello</Text>
            <Button title="Logout" onPress={() => signOut(auth).then(async() => {
                    await RemoveLocalStorage();
                    router.push('/login')
            }).catch(error => console.log(error))} />
        </View>
    );
}