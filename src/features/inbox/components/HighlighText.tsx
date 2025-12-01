import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';

interface HighlightTextProps extends TextProps {
  text: string;
  highlight: string;
}

export const HighlightText = ({ text, highlight, style, ...props }: HighlightTextProps) => {
  if (!highlight.trim()) {
    return <Text style={style} {...props}>{text}</Text>;
  }

  // Escape special regex characters to prevent crashes (e.g. if user types "(")
  const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  // Create a regex that finds the highlight, case-insensitive ('gi')
  const regex = new RegExp(`(${escapedHighlight})`, 'gi');
  
  // Split the text by the regex
  const parts = text.split(regex);

  return (
    <Text style={style} {...props}>
      {parts.map((part, index) => {
        // Check if this part matches the highlight (case-insensitive check)
        const isMatch = part.toLowerCase() === highlight.toLowerCase();
        
        return isMatch ? (
          <Text key={index} style={styles.highlight}>
            {part}
          </Text>
        ) : (
          <Text key={index}>{part}</Text>
        );
      })}
    </Text>
  );
};

const styles = StyleSheet.create({
  highlight: {
    backgroundColor: '#fff733', // Classic yellow highlighter look
    color: '#000',
    fontWeight: 'bold',
  },
});