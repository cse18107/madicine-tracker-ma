import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import MedicationList from "@/components/MedicationList";
import { db } from "@/config/FirebaseConfig";
import { getLocalStorage } from "@/service/storage";
import { collection, getDocs, query, where } from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function HomeScreen() {
    const [medications, setMedications] = useState([{}]);
    const [currentDate, setCurrentDate] = useState(moment().format("YYYY-MM-DD"));
    const fetchData = async () => {
        const user = await getLocalStorage('userDetail')
        console.log(user)
        try{
            console.log(new Date(currentDate))
            const currentDateObj = moment(currentDate, "YYYY-MM-DD").toDate();
            const user = await getLocalStorage('userDetail');
            const q = query(collection(db, 'medication'), where('userEmail', "==", user?.user?.email), where("startDate", "<=", currentDateObj),
            where("endDate", ">=", currentDateObj));
            const querySnapshots = await getDocs(q);
            const medications = querySnapshots.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) 
            setMedications(medications);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        
        fetchData();
    }, [currentDate])
    return (
        <View style={{
            padding: 25,
            backgroundColor: 'white',
            height: '100%'
        }}>
            <Header/>
            {medications.length>0?<MedicationList medicationsList={medications} setCurrentDate={setCurrentDate} />:<EmptyState/>}
        </View>
    );
}