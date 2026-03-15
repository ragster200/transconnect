import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../lib/supabase';

export function DirectoryScreen() {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts', 'directory'],
    queryFn: () => getPosts('directory'),
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading directory...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error loading directory</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Operator Directory</Text>
      <Text style={styles.subtitle}>Find operators by route and zone</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.companyName}>{item.profiles?.company || 'Unknown Company'}</Text>
              <Text style={styles.location}>{item.location || 'Location not specified'}</Text>
            </View>
            <Text style={styles.description}>{item.description}</Text>
            <View style={styles.routes}>
              {item.route_from && item.route_to && (
                <Text style={styles.route}>
                  {item.route_from} → {item.route_to}
                </Text>
              )}
            </View>
          </View>
        )}
      />
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
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 14,
    color: '#666',
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  routes: {
    flexDirection: 'row',
  },
  route: {
    fontSize: 12,
    color: '#0066cc',
    backgroundColor: '#e6f2ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
});