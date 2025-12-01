import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '@/types';
import { useConversationStore } from '@/store/conversationStore';

type ContactDetailsRouteProp= RouteProp<RootStackParamList, 'ContactDetails'>;

export const ContactDetailsScreen = () => {
    const route = useRoute<ContactDetailsRouteProp>();
    const navigation = useNavigation();
    const {userId} = route.params;
    

    //sys thinking: in a real app we would fetch from the store using the ID
    //in a real app, this ensures if the user updates their app sowmwhere else this screen will be updated too
    const conversation = useConversationStore((state) => 
        state.conversations.find((c) => c.user.id === userId));
    const user = conversation?.user;
    if(!user) return <View style={styles.center}><Text>User not found</Text></View>;

    const renderInfoRow = (icon: keyof typeof Ionicons.glyphMap, label: string, value?: string) => {
        if (!value) return null;
        return (
          <View style={styles.infoRow}>
            <View style={styles.iconBox}>
              <Ionicons name={icon} size={20} color="#666" />
            </View>
            <View>
              <Text style={styles.label}>{label}</Text>
              <Text style={styles.value}>{value}</Text>
            </View>
          </View>
        );
      };
      return (
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            
            {/* Header Section */}
            <View style={styles.header}>
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.company}>{user.company || 'Unknown Company'}</Text>
              
              <View style={styles.actionGrid}>
                 <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="call" size={20} color="#fff" />
                    <Text style={styles.actionText}>Call</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="mail" size={20} color="#fff" />
                    <Text style={styles.actionText}>Email</Text>
                 </TouchableOpacity>
              </View>
            </View>
            {/* Contact Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          {renderInfoRow('mail-outline', 'Email', user.email)}
          {renderInfoRow('call-outline', 'Phone', user.phone)}
          {renderInfoRow('location-outline', 'Location', user.location)}
        </View>

        {/* Custom Attributes Section (The "CRM" Part) */}
        {user.attributes && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Attributes</Text>
            <View style={styles.attributesGrid}>
              {Object.entries(user.attributes).map(([key, value]) => (
                <View key={key} style={styles.attributeCard}>
                  <Text style={styles.attrLabel}>{key}</Text>
                  <Text style={styles.attrValue}>{value}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    scrollContent: { paddingBottom: 40 },
    
    header: {
      backgroundColor: '#fff',
      alignItems: 'center',
      paddingVertical: 30,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 16 },
    name: { fontSize: 24, fontWeight: 'bold', color: '#333' },
    company: { fontSize: 16, color: '#666', marginBottom: 20 },
    
    actionGrid: { flexDirection: 'row', gap: 12 },
    actionButton: {
      backgroundColor: '#007AFF',
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderRadius: 20,
      gap: 6,
    },
    actionText: { color: '#fff', fontWeight: '600' },
  
    section: {
      marginTop: 16,
      backgroundColor: '#fff',
      padding: 20,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: '#eee',
    },
    sectionTitle: { fontSize: 13, fontWeight: '700', color: '#999', marginBottom: 16, textTransform: 'uppercase' },
    
    infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
    iconBox: { width: 32, alignItems: 'center', marginRight: 12 },
    label: { fontSize: 12, color: '#999' },
    value: { fontSize: 16, color: '#333' },
  
    attributesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    attributeCard: {
      backgroundColor: '#f8f9fa',
      padding: 12,
      borderRadius: 8,
      width: '48%', // roughly 2 columns
      borderWidth: 1,
      borderColor: '#eee',
    },
    attrLabel: { fontSize: 11, color: '#999', marginBottom: 4 },
    attrValue: { fontSize: 14, fontWeight: '600', color: '#333' },
  });