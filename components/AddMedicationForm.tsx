import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '@/constant/Colors';
import { TypeList, WhenToTake } from '@/constant/Options';
import {Picker} from '@react-native-picker/picker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { FormatDate, formatDateForText, formatTime } from './../service/ConvertDateTime';

type FormDataType = {
    name?: string;
    type?: string;
    dose?: string;
    startDate?: string;
    endDate?: string;
    reminder?: string;
  }
export default function AddMedicationForm() {
    const [formData, setFormData] = useState<FormDataType>();
    const [showStartDate, setShowStartDate] = useState(false);
    const [showEndDate, setShowEndDate] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const onHandleInputChange = (field: string, value: any) => {
        setFormData((prev: any) => ({
            ...prev,
            [field]: value
        }))
    }

    const SaveMedication = () => {
        const docId = Date.now().toString();
        if(!(formData?.name || formData?.type || formData?.dose || formData?.startDate || formData?.endDate || formData?.reminder)){
            Alert.alert("Enter all fields");
            return;
        }
        try{

        } catch (error) {
            
        }
    }
  return (
    <View style={{
        padding: 25
    }}>
      <Text style={styles.header}>AddMedicationForm</Text>
        <View style={styles.inputGroup}>
            <Ionicons style={styles.icon} name="medkit-outline" size={24} color="black" />
            <TextInput style={styles.textInput} placeholder='Medicine Name' onChange={(value) => onHandleInputChange('name', value)} />
        </View>
        {/* Type List */}
        <FlatList horizontal showsHorizontalScrollIndicator={false} style={{marginTop: 5}} data={TypeList} renderItem={({item, index}) => (
            <TouchableOpacity onPress={() => onHandleInputChange('type', item)} style={[styles.inputGroup,{marginRight: 10},{backgroundColor: item.name===formData?.type?.name ? Colors.PRIMARY : 'white'}]} >
                <Text style={[styles.typeText,{color: item.name===formData?.type?.name ? 'white' : 'black'}]}>{item?.name}</Text>
            </TouchableOpacity>
        )} />
        {/* Does Input */}
        <View style={styles.inputGroup}>
            <Ionicons style={styles.icon} name="eyedrop-outline" size={24} color="black" />
            <TextInput style={styles.textInput} placeholder='Does Ex. 3 , 5ml' onChange={(value) => onHandleInputChange('does', value)} />
        </View>
        {/* When to take drop down */}
        <View style={styles.inputGroup}>
            <Ionicons style={styles.icon} name="time-outline" size={24} color="black" />
            <Picker 
                selectedValue={formData?.when}
                onValueChange={(itemValue, itemIndex) => onHandleInputChange('when', itemValue)}
                style={{
                    width: '90%'
                }}
            >
                {WhenToTake.map((item, index)=> (
                    <Picker.Item key={index} label={item} value={item}/>
                ))}
            </Picker>
        </View>

        {/* Start and end date */}
        <View style={styles.dateInputGroup}>
            <TouchableOpacity style={[styles.inputGroup, {flex: 1}]} onPress={() => setShowStartDate(true)}>
                <Ionicons style={styles.icon} name="calendar-outline" size={24} color="black" />
                <Text style={styles.text}>{formatDateForText(formData?.startDate) ?? 'Start Date'}</Text>
            </TouchableOpacity>
            {showStartDate && <RNDateTimePicker 
                    minimumDate={new Date()}
                    onChange={(event) => {
                        onHandleInputChange('startDate', FormatDate(event.nativeEvent.timestamp))
                        setShowStartDate(false)
                    }}
                    value={new Date(formData?.startDate)?? new Date()}
            />}
            <TouchableOpacity style={[styles.inputGroup, {flex: 1}]} onPress={() => setShowEndDate(true)}>
                <Ionicons style={styles.icon} name="calendar-outline" size={24} color="black" />
                <Text style={styles.text}>{formatDateForText(formData?.endDate) ?? 'End Date'}</Text>
                
            </TouchableOpacity>
            {showEndDate && <RNDateTimePicker 
                    minimumDate={new Date()}
                    onChange={(event) => {
                        onHandleInputChange('endDate', FormatDate(event.nativeEvent.timestamp))
                        setShowEndDate(false)
                    }}
                    value={new Date(formData?.endDate)?? new Date()}
                />}
        </View>

        {/* Set reminder input */}
        <View style={styles.dateInputGroup}>
            <TouchableOpacity style={[styles.inputGroup, {flex: 1}]} onPress={() => setShowTimePicker(true)}>
                <Ionicons style={styles.icon} name="timer-outline" size={24} color="black" />
                <Text style={styles.text}>{formData?.reminder??'Select Reminder Time'}</Text>
            </TouchableOpacity>
            {showTimePicker && <RNDateTimePicker 
                mode='time'
                onChange={(event) => {
                    onHandleInputChange('reminder', formatTime(event.nativeEvent.timestamp))
                    setShowTimePicker(false)
                }}
                value={new Date(formData?.reminder)?? new Date()}
            />}
        </View>

        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Add New Medication</Text>
        </TouchableOpacity>

    </View>
  )
};

const styles = StyleSheet.create({
    header: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    inputGroup: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        padding: 12,
        borderWidth: 1,
        borderColor: Colors.LIGHT_GRAY_BORDER,
        backgroundColor: 'white',
        borderRadius: 8,
        marginTop: 10
    },
    textInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16
    },
    icon: {
        color: Colors.PRIMARY,
        borderRightWidth: 1,
        paddingRight: 12,
        borderColor: Colors.GRAY
    },
    typeText: {
        fontSize: 16
    },
    text:{
        fontSize: 15,
        padding: 5,
        flex: 1,
        marginLeft: 10
    },
    dateInputGroup:{
        flexDirection: 'row',
        gap: 10
    },
    button: {
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 15,
        width: '100%',
        marginTop: 25
    },
    buttonText: {
        fontSize: 17,
        color: 'white',
        textAlign: 'center',
    }
});