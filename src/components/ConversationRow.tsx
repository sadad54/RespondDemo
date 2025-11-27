import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Conversation } from '@/types';

interface ConversationRowProps {
    data: Conversation;
    onPress: (id: string) => void;
}

//Performance optimized by react.memo
export const ConversationRow = React.memo(({ data, onPress }: ConversationRowProps) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={() => onPress(data.id)}
      activeOpacity={0.7}
    >
      {/* Avatar Section */}
      <Image source={{ uri: data.user.avatar }} style={styles.avatar} />
      
      {/* Middle Section: Name & Message */}
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.name}>{data.user.name}</Text>
          {data.isPinned && <Text style={styles.pin}>📌</Text>}
        </View>
        <Text style={styles.message} numberOfLines={1}>
          {data.lastMessage}
        </Text>
      </View>

      {/* Right Section: Meta Data */}
      <View style={styles.meta}>
        <Text style={styles.time}>
           {/* Simple time formatting for now */}
           {new Date(data.timestamp).getHours()}:{String(new Date(data.timestamp).getMinutes()).padStart(2, '0')}
        </Text>
        {data.unreadCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{data.unreadCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
});
const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomWidth: StyleSheet.hairlineWidth,//thinnest possible line on any device
        borderBottomColor: '#e0e0e0',
        height: 80,//fixed height makes the virtualization faster
    },
    avatar:{
        width: 50,
        height: 50,
        borderRadius: 25,   
        backgroundColor: '#ddd',
    },
    content:{
        flex:1,
        marginLeft:12,
        justifyContent:'center',
    },
    headerRow:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:4,
    },
    name:{
        fontSize:16,
        fontWeight:'600',
        color:'#000',
    },
    pin:{
        marginLeft:4,
        fontSize:12,
    },
    message:{   
        fontSize:14,
        color:'#666',
    },
    meta:{
        alignItems:'flex-end',
    marginLeft:8,
    },
    time:{
        fontSize:12,
        color:'#999',
        marginBottom:6,
    },
    badge:{
        backgroundColor:'#25D366',
        borderRadius:10,
        minWidth:20,
        height:20,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:4,
    },
    badgeText:{
        color:'#fff',
        fontSize:10,
        fontWeight:'bold',
    },
});