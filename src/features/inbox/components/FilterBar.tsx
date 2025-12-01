import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { ChannelType } from '@/types';

// We add 'all' as a special option
export type FilterType = ChannelType | 'all';

interface FilterBarProps {
  activeFilter: FilterType;
  onSelect: (filter: FilterType) => void;
}

const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'All Chats', value: 'all' },
  { label: 'WhatsApp', value: 'whatsapp' },
  { label: 'Messenger', value: 'messenger' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'Email', value: 'email' },
];

export const FilterBar = ({ activeFilter, onSelect }: FilterBarProps) => {
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {FILTERS.map((filter) => {
          const isActive = activeFilter === filter.value;
          return (
            <TouchableOpacity
              key={filter.value}
              style={[
                styles.chip,
                isActive ? styles.activeChip : styles.inactiveChip,
              ]}
              onPress={() => onSelect(filter.value)}
            >
              <Text
                style={[
                  styles.text,
                  isActive ? styles.activeText : styles.inactiveText,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
            
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  activeChip: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  inactiveChip: {
    backgroundColor: '#fff',
    borderColor: '#e0e0e0',
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
  activeText: {
    color: '#fff',
  },
  inactiveText: {
    color: '#666',
  },
});