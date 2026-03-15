import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../lib/supabase';
import { PostCard } from '../components/PostCard';

export function BackloadsScreen() {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts', 'backload'],
    queryFn: () => getPosts('backload'),
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading backloads...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error loading backloads</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Backloads</Text>
      <Text style={styles.subtitle}>Find return freight for your empty runs</Text>
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