import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../lib/supabase';
import { PostCard } from '../components/PostCard';

export function JobsScreen() {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts', 'job'],
    queryFn: () => getPosts('job'),
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading jobs...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error loading jobs</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Driver Jobs</Text>
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
    marginBottom: 16,
  },
});