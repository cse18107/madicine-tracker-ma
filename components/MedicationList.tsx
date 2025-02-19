import { View, Text, Image, FlatList, TouchableOpacity, ScrollView, SectionList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { generateDateConfig } from '@/service/ConvertDateTime';
import Colors from '@/constant/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function MedicationList({ medicationsList, setCurrentDate }: any) {
    const [medicationDates, setMedicationDates] = useState([{}]);
    const [changeCDate, setChangeCDate] = useState({});

    useEffect(() => {
        setCurrentDate(changeCDate?.cdate);
    }, [changeCDate])

    useEffect(() => {
        const dates = generateDateConfig();
        setMedicationDates(dates)
        setCurrentDate(dates[0].cdate);
        setChangeCDate(dates[0]);
    }, [])

    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
            <>
                <Image 
                    source={require('../assets/images/medication.jpeg')} 
                    style={{ width: '100%', height: 180, marginTop: 24, borderRadius: 10 }} 
                />
                <Text style={{ marginTop: 24, fontSize: 24, fontWeight: '500' }}>
                    Your Medication Reminder
                </Text>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ marginTop: 5 }}
                    data={medicationDates}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity 
                            onPress={() => setChangeCDate(item)} 
                            style={{
                                width: 60, display: 'flex', alignItems: 'center', 
                                justifyContent: 'center', backgroundColor: changeCDate.date === item.date ? Colors.PRIMARY : Colors.LIGHT_PRIMARY, 
                                height: 80, marginRight: 10, borderRadius: 10 
                            }} 
                        >
                            <Text style={{ fontSize: 20, color: changeCDate.date === item.date ? 'white' : 'black' }}>
                                {item?.weekDay}
                            </Text>
                            <Text style={{ fontSize: 35, color: changeCDate.date === item.date ? 'white' : 'black' }}>
                                {item?.date}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </>
        }
        data={medicationsList}
        renderItem={({ item, index }) => (
            <TouchableOpacity 
                style={{
                    padding: 10, width: '100%', display: 'flex', flexDirection: 'row', 
                    alignItems: 'center', justifyContent: 'space-between', backgroundColor: Colors.LIGHT_PRIMARY, 
                    height: 110, marginBottom: 10, borderRadius: 10, marginTop: index===0?20: 0
                }} 
            >
                <View style={{ borderRadius: 10, backgroundColor: 'white', height: '90%', width: '30%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Image src={item?.type?.icon} style={{ height: 50, width: 50 }} />
                </View>
                <View style={{ width: '30%' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item?.name}</Text>
                    <Text style={{ fontSize: 18 }}>{item?.when}</Text>
                    <Text style={{ fontSize: 18, color: 'white' }}>{item?.does} {item?.type?.name}</Text>
                </View>
                <View style={{ borderRadius: 10, backgroundColor: 'white', height: '90%', width: '30%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Ionicons name="timer-outline" size={24} color="black" />
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item?.reminder}</Text>
                </View>
            </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
    />
    )
}