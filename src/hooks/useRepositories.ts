import { useState, useCallback } from 'react';
import { useLazySearchRepositoriesQuery } from '../services/githubAPI';
import { SearchResponse } from '../services/githubAPI';
import { Repository } from "../models/Repository"


const transformData = (data: SearchResponse): Repository[] => {
  return data.data.search.edges.map( edge => {
    const repo = edge.node;
    return {
      id: repo.id,
      title: repo.name,
      language: repo.primaryLanguage?.name || 'Unknown',
      forks: repo.forks.totalCount,
      stars: repo.stargazers.totalCount,
      update: new Date(repo.updatedAt).toLocaleDateString(),
      tags: repo.repositoryTopics.edges.map(topicEdge => topicEdge.node.topic.name),
      license: repo.licenseInfo ? repo.licenseInfo.name : 'No license',
    };
  });
};

const useRepositories = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [trigger, { data, error, isLoading }] = useLazySearchRepositoriesQuery();

  const handleSearch = useCallback(async () => {
    await trigger(searchTerm);
  }, [searchTerm, trigger]);

  const transformedData = data ? transformData(data) : [];

  return {
    searchTerm,
    setSearchTerm,
    handleSearch,
    transformedData,
    error,
    isLoading,
  };
};

export default useRepositories;