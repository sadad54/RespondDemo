import React, {useState, useCallback} from 'react';
import {View, FlatList, StyleSheet, StatusBar, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ConversationRow} from '@/features/inbox/components/ConversationRow';
import { MOCK_CONVERSATIONS } from '../data/mock';
import {Conversation} from '@/types';
import { SwipeableRow } from '../components/SwipeableRow';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import { RootStackParamList } from '@/types';




//fake api call simulation which takes 1sec to respond
//retuns TRUE on success, FALSE on failure
const fakeArchiveApi = async (id:string): Promise<boolean>=>{
    return new Promise((resolve) => {
        setTimeout(() => {
            //randomly fails half of the time just for demo
            const shouldFail = Math.random()>0.5;
            resolve(!shouldFail);
        }, 1000);
    });
};
export const InboxScreen =()=>{

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    //1. lifting the data to a local state so we can mutate it
    const [conversations, setConversations]=useState<Conversation[]>(MOCK_CONVERSATIONS);
    //Handlers should be wrapped in userCallback to prevent re-creation on every render
    const handlePress=useCallback((id:string)=>{
        console.log('Navigation triggered for:', id);
        navigation.navigate('ChatDetail', {conversationId: id});
    }, [navigation]);
    const handleArchive= useCallback(async (conversationId: string)=>{
        //A. snapshot to remember the previous list if we need to go back
        const previousList=[...conversations];
        //B. Optimistically update the UI
        setConversations((current)=>current.filter(c=>c.id!==conversationId));
        try {
            //C. API Call: tell the server 
            const success = await fakeArchiveApi(conversationId);
            if (!success) {
                throw new Error('Network glitch!');
            }
            //If success, do nothing! the UI is already updated
        } catch (error) {
            //D. If error, rollback to the previous state
            console.log('Archiving failed, rolling back...', error);
            Alert.alert("Connection error", "Could not archive chat. Restoring...")
            setConversations(previousList);
        }
    }, [conversations]);



    const renderItem=useCallback(({item}: {item:Conversation})=>(
        <SwipeableRow onSwipeLeft={() => handleArchive(item.id)}>
            <ConversationRow data={item} onPress={handlePress} />
        </SwipeableRow>
    ), [handlePress, handleArchive]);  
    return(
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.container}>
        <FlatList
          data={conversations}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          // Performance Optimization:
          // We tell the list the exact height of our rows (80px)
          getItemLayout={(data, index) => (
            { length: 80, offset: 80 * index, index }
          )}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});