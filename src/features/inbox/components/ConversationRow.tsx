import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Conversation } from '@/types';
import { ChannelType } from '@/types';

interface ConversationRowProps {
    data: Conversation;
    onPress: (id: string) => void;
}

//A cleaner helper function to map data to visual (Systems thinking:separation of concerns)
const getChannelIcon = (channel: ChannelType) => {
  switch(channel){
    case 'whatsapp': return {name: 'logo-whatsapp', color: '#25D366' };
    case 'messenger': return {name: 'logo-facebook', color: '#0084FF' };
    case 'email': return {name: 'mail', color: '#888' };
    case 'instagram': return {name: 'logo-instagram', color: '#E1306C' };
    default: return {name: 'chatbubbles', color: '#888' };
  }
};
//Performance optimized by react.memo
export const ConversationRow = React.memo(({ data, onPress }: ConversationRowProps) => {
  const channelIcon = getChannelIcon(data.channel);
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={() => onPress(data.id)}
      activeOpacity={0.7}
    >
{/* Avatar Section with Channel Badge */}
      <View style={styles.avatarContainer}>
        <Image source={{ uri: data.user.avatar }} style={styles.avatar} />
        {/* The Channel Badge */}
        <View style={styles.channelBadge}>
          {/* @ts-ignore: Ionicons types can be finicky, ignoring for demo speed */}
          <Ionicons name={channelIcon.name} size={12} color="white" />
        </View>
      </View>
      {/* Middle Section: Name & Message */}
 <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.name}>{data.user.name}</Text>
          {/* Render Tags */}
          {data.tags?.map(tag => (
             <View key={tag} style={styles.tagContainer}>
                <Text style={styles.tagText}>{tag}</Text>
             </View>
          ))}
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
    avatarContainer:{
        position:'relative', //needed for absolute positioning of badge
    },
    channelBadge:{
      position: 'absolute',
      bottom: 0,
      right : 0,
      backgroundColor: '#000', //default black, will be overridden by icon logic if we wanted
      width: 20,
      height: 20,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: '#fff',
    },
    tagContainer:{
        backgroundColor:'#f0f0f0',
        paddingHorizontal:6,
        paddingVertical:2,
        borderRadius:4,
        marginLeft:6,
    },
    tagText:{
      fontSize: 10,
      color: '#666',
      fontWeight: '600',
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