import React, {useState, useCallback, useMemo, useEffect} from 'react';
import {View, FlatList, StyleSheet, StatusBar, Alert, TouchableOpacity, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ConversationRow} from '@/features/inbox/components/ConversationRow';
import { MOCK_CONVERSATIONS } from '../data/mock';
import {Conversation} from '@/types';
import { SwipeableRow } from '../components/SwipeableRow';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import { RootStackParamList } from '@/types';
import { FilterBar, FilterType } from '../components/FilterBar';
import { useConversationStore } from '@/store/conversationStore';
import { SearchBar } from '../components/SearchBar';
import { useDebounce } from '../hooks/useDebounce';
import * as Haptics from 'expo-haptics';
import { ActionSheet } from '../components/ActionSheet';
import * as Notifications from 'expo-notifications';
import { SkeletonRow } from '@/components/SkeletonRow';
import { EmptyState } from '@/components/EmptyState';
import { AnimatedFAB } from '@/components/AnimatedFAB';




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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from Respond.io servers
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);



  const scheduleTestNotification = async () => {

    // 1. Request permissions (required on iOS)
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission needed for notifications!');
      return;
    }

    // 2. Schedule a fake notification 3 seconds from now
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "New Urgent Message 🚨",
        body: "Sarah Chen needs approval on the contract.",
        data: { url: 'responddemo://chat/1' }, // <--- THE DEEP LINK
      },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: 3 },
    });
    
    alert('Close the app now! Wait 3 seconds.');
  };
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    //1. lifting the data to a local state so we can mutate it
   const conversations = useConversationStore((state)=> state.conversations);
   const deleteConversation = useConversationStore((state) => state.deleteConversation);
   const addConversation = useConversationStore((state) => state.addConversation);
    //Handlers should be wrapped in userCallback to prevent re-creation on every render
    //3. new state for filters

    // search state
    const [searchQuery, setSearchQuery]=useState('');
    // debounce the serach query
    const debouncedSearch= useDebounce(searchQuery,300);

    const [activeFilter, setActiveFilter] = useState<FilterType>('all');
    //4. the systems thinking magic: useMemo

    //updated filtering logic after search and debounce
    const filteredConversations = useMemo(() => {
        let result= conversations;
        //filter by channel first
        if (activeFilter !== 'all') {
            result = result.filter((c)=> c.channel===activeFilter);
        }
        //filter by search (using the DEBOUNCED value)
        if(debouncedSearch){
            const lowerQuery =debouncedSearch.toLowerCase();
            result = result.filter(
                (c)=>
                    c.user.name.toLowerCase().includes(lowerQuery) ||
                c.lastMessage.toLowerCase().includes(lowerQuery)
            );
        }
        return result;
    }, [conversations, activeFilter, debouncedSearch]); //depend on debouncedSearch



    const handlePress=useCallback((id:string)=>{
        console.log('Navigation triggered for:', id);
        navigation.navigate('ChatDetail', {conversationId: id});
    }, [navigation]);
    //cleaner archive function
    const handleArchive = useCallback((conversationId: string) => {
     deleteConversation(conversationId);
  }, [deleteConversation]);

// 1. New State for the Action Sheet
  const [isSheetVisible, setSheetVisible] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  // 2. The Long Press Handler (The "Wow" Interaction)
  const handleLongPress = useCallback((id: string) => {
    // Systems Thinking: Feedback is crucial for hidden gestures
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedChatId(id);
    setSheetVisible(true);
  }, []);

  // 3. The Action Executioner
  const handleAction = (actionId: string) => {
    if (!selectedChatId) return;

    switch (actionId) {
      case 'delete':
        // Reuse our existing store logic!
        deleteConversation(selectedChatId);
        break;
      case 'assign':
        Alert.alert('Assigned', 'Ticket assigned to you.');
        break;
      case 'snooze':
        Alert.alert('Snoozed', 'Reminder set for 1 hour.');
        break;
      case 'close':
        Alert.alert('Closed', 'Ticket marked as resolved.');
        break;
    }
    // Cleanup
    setSelectedChatId(null);
  };
  
  // update renderItem to pass the query for highlighting
  //NOTE: we pass "debouncedSearch" so highlighting update in sync with the list
    const renderItem=useCallback(({item}: {item:Conversation})=>(
        <SwipeableRow onSwipeLeft={() => handleArchive(item.id)}>
            <ConversationRow data={item} onPress={handlePress} onLongPress={handleLongPress} searchQuery={debouncedSearch}/>
        </SwipeableRow>
    ), [handleArchive, handlePress, debouncedSearch, handleLongPress]);  
    return(
        <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.container}>
{/* Temporary Dev Button */}
<TouchableOpacity 
  onPress={scheduleTestNotification}
  style={{ padding: 10, backgroundColor: '#000', alignItems: 'center' }}
>
  <Text style={{ color: '#fff' }}>Simulate Push Notification</Text>
</TouchableOpacity>
        {/* 2. Filter Bar Component */}
        <FilterBar activeFilter={activeFilter} onSelect={setActiveFilter} />
        <SearchBar value={searchQuery} onChangeText={setSearchQuery}/>

        
         {/* 3. Updated FlatList to use filteredConversations */}
         {isLoading ? (
          // Render 6 fake rows while loading
          <View>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonRow key={i} />
            ))}
          </View>
        ) : (
        <FlatList
          data={filteredConversations}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            // Only show empty state if we are NOT loading
            !isLoading ? <EmptyState message="No conversations found." /> : null
          }
          // Performance Optimization:
          // We tell the list the exact height of our rows (80px)
          getItemLayout={(data, index) => (
            { length: 80, offset: 80 * index, index }
          )}
        />
        )}
        
        {/* 5. Add the Action Sheet at the bottom */}
        <ActionSheet 
          visible={isSheetVisible}
          onClose={() => setSheetVisible(false)}
          onSelect={handleAction}
          title={selectedChatId ? "Quick Actions" : ""}
        />
      </View>
      <AnimatedFAB onPress={() => navigation.navigate('NewChat')} />
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