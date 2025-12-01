import React from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

interface SearchBarProps{
    value: string;
    onChangeText: (text: string)=> void;
    placeholder?: string;
}

export const SearchBar = ({value, onChangeText, placeholder = "Search messages..."}: SearchBarProps) => {
    return(
        <View style={styles.container}>
            <Ionicons name="search" size={20} color='#999' style={styles.icon}/>
            <TextInput
            style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        autoCapitalize="none"
        returnKeyType="search"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText('')}>
          <Ionicons name="close-circle" size={20} color="#999" />
        </TouchableOpacity>
      )}
        </View>
    );
};

const styles =StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems: 'center',
        backgroundColor:'#f5f5f5',
        marginHorizontal:16,
        marginBottom: 10,//spacing from the list
        paddingHorizontal: 10,
        height: 40,
        borderRadius: 10,

    },
    icon:{
        marginRight: 8,
    },
    input:{
        flex:1,
        fontSize: 16,
        color: '#000',
        height:'100%'
    },
});