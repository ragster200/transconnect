import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Post } from '../lib/supabase';

interface PostCardProps {
  post: Post & { profiles?: { name?: string; company?: string } };
}

export function PostCard({ post }: PostCardProps) {
  const typeColors = {
    job: '#4CAF50',
    backload: '#2196F3',
    equipment: '#FF9800',
    directory: '#9C27B0',
  };

  return (
    <View style={[styles.card, { borderLeftColor: typeColors[post.type] }]}>
      <View style={styles.header}>
        <View style={[styles.typeTag, { backgroundColor: typeColors[post.type] }]}>
          <Text style={styles.typeText}>{post.type.toUpperCase()}</Text>
        </View>
        <Text style={styles.date}>
          {new Date(post.created_at).toLocaleDateString()}
        </Text>
      </View>
      
      <Text style={styles.title}>{post.title}</Text>
      
      {post.description && (
        <Text style={styles.description} numberOfLines={2}>
          {post.description}
        </Text>
      )}
      
      {post.route_from && post.route_to && (
        <Text style={styles.route}>
          📍 {post.route_from} → {post.route_to}
        </Text>
      )}
      
      {post.price && (
        <Text style={styles.price}>${post.price.toLocaleString()}</Text>
      )}
      
      {post.profiles && (
        <Text style={styles.author}>
          by {post.profiles.name || 'Unknown'}
          {post.profiles.company && ` (${post.profiles.company})`}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  typeTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  typeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  route: {
    fontSize: 14,
    color: '#0066cc',
    marginBottom: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: 4,
  },
  author: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
});