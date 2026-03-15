import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../lib/supabase';

export function AISearchScreen() {
  const [query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: results, isLoading, refetch } = useQuery({
    queryKey: ['ai-search', searchQuery],
    queryFn: () => getPosts(),
    enabled: searchQuery.length > 2,
  });

  const handleSearch = () => {
    if (query.trim()) {
      setSearchQuery(query.trim());
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Search</Text>
      <Text style={styles.subtitle}>
        Ask anything about transport: "Find me a backload Melbourne to Sydney"
      </Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="What are you looking for?"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {isLoading && <ActivityIndicator size="large" style={styles.loader} />}

      {results?.data && results.data.length > 0 && (
        <View style={styles.results}>
          <Text style={styles.resultsTitle}>Results ({results.data.length})</Text>
          {results.data.map((post) => (
            <View key={post.id} style={styles.resultCard}>
              <Text style={styles.resultType}>{post.type.toUpperCase()}</Text>
              <Text style={styles.resultTitle}>{post.title}</Text>
              {post.route_from && post.route_to && (
                <Text style={styles.resultRoute}>
                  {post.route_from} → {post.route_to}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}

      {searchQuery && !isLoading && results?.data?.length === 0 && (
        <Text style={styles.noResults}>No results found for "{searchQuery}"</Text>
      )}
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
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: '#0066cc',
    borderRadius: 8,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 20,
  },
  results: {
    marginTop: 16,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  resultCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#0066cc',
  },
  resultType: {
    fontSize: 12,
    color: '#0066cc',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  resultRoute: {
    fontSize: 14,
    color: '#666',
  },
  noResults: {
    textAlign: 'center',
    color: '#666',
    marginTop: 32,
  },
});