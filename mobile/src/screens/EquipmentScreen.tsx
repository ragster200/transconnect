import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../lib/supabase';
import { PostCard } from '../components/PostCard';

export function EquipmentScreen() {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts', 'equipment'],
    queryFn: () => getPosts('equipment'),
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading equipment...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error loading equipment</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Equipment Marketplace</Text>
      <Text style={styles.subtitle}>Buy, sell, or rent trucks, trailers, and parts</Text>
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
});