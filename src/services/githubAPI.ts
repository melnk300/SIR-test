import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Repository {
  id: string;
  name: string;
  primaryLanguage: {
    name: string;
  } | null;
  forks: {
    totalCount: number;
  };
  stargazers: {
    totalCount: number;
  };
  updatedAt: string;
  repositoryTopics: {
    edges: {
      node: {
        topic: {
          name: string;
        };
      };
    }[];
  };
  licenseInfo: {
    name: string;
  } | null;
}

export interface SearchResponse {
  data: {
    search: {
      edges: {
        node: Repository;
      }[];
    };
  }
}

export const githubApi = createApi({
  reducerPath: 'githubApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com/graphql',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      headers.set('Authorization', `Bearer ${localStorage.getItem("gh-token")}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    searchRepositories: builder.query<SearchResponse, string>({
      query: (searchTerm) => ({
        method: 'POST',
        url: "",
        body: {
          query: `
            query($query: String!) {
              search(query: $query, type: REPOSITORY, first: 20) {
                edges {
                  node {
                    ... on Repository {
                      id
                      name
                      url
                      primaryLanguage {
                        name
                      }
                      forks {
                        totalCount
                      }
                      stargazers {
                        totalCount
                      }
                      updatedAt
                      repositoryTopics(first: 10) {
                        edges {
                          node {
                            topic {
                              name
                            }
                          }
                        }
                      }
                      licenseInfo {
                        name
                      }
                    }
                  }
                }
              }
            }
          `,
          variables: {
            query: searchTerm,
          },
        },
      }),
    }),
  }),
});

export const { useLazySearchRepositoriesQuery } = githubApi;