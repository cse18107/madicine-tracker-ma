import { auth } from "@/config/FirebaseConfig";
import { signOut } from "firebase/auth";
import { Button, Text, View } from "react-native";

export default function HomeScreen() {
    return (
        <View>
            <Text>Hello</Text>
            <Button title="Logout" onPress={() => signOut(auth).catch(error => console.log(error))} />
        </View>
    );
}