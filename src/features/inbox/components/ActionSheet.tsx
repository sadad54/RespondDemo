// src/features/inbox/components/ActionSheet.tsx
import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ActionOption {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  color?: string;
  isDestructive?: boolean;
}

interface ActionSheetProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (actionId: string) => void;
  title?: string;
}

const ACTIONS: ActionOption[] = [
  { id: 'assign', label: 'Assign to Agent', icon: 'person-add', color: '#007AFF' },
  { id: 'snooze', label: 'Snooze for 1 Hour', icon: 'time', color: '#FF9500' },
  { id: 'close', label: 'Close Ticket', icon: 'checkmark-circle', color: '#4CD964' },
  { id: 'delete', label: 'Delete Conversation', icon: 'trash', color: '#FF3B30', isDestructive: true },
];

export const ActionSheet = ({ visible, onClose, onSelect, title }: ActionSheetProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.sheet}>
              {/* Handle Bar */}
              <View style={styles.handleContainer}>
                <View style={styles.handle} />
              </View>

              {title && <Text style={styles.title}>{title}</Text>}

              {ACTIONS.map((action) => (
                <TouchableOpacity
                  key={action.id}
                  style={styles.actionRow}
                  onPress={() => {
                    onSelect(action.id);
                    onClose();
                  }}
                >
                  <View style={[styles.iconBox, { backgroundColor: action.color + '20' }]}> 
                    <Ionicons name={action.icon} size={20} color={action.color} />
                  </View>
                  <Text style={[styles.actionLabel, action.isDestructive && styles.destructiveText]}>
                    {action.label}
                  </Text>
                </TouchableOpacity>
              ))}

              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  handleContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#888',
    marginBottom: 20,
    textAlign: 'center',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#f0f0f0',
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  actionLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  destructiveText: {
    color: '#FF3B30',
  },
  cancelButton: {
    marginTop: 20,
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});