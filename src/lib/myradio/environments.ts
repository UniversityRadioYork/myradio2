const MyRadioEnvironments = {
  dev: {
    webBase: "https://ury.org.uk/myradio-dev",
    apiBase: "https://ury.org.uk/api-dev/v2",
    graphqlBase: "https://ury.org.uk/api-dev/graphql",
  },
  staging: {
    webBase: "https://ury.org.uk/myradio-staging",
    apiBase: "https://ury.org.uk/api-staging/v2",
    graphqlBase: "https://ury.org.uk/api-staging/graphql",
  },
  prod: {
    webBase: "https://ury.org.uk/myradio",
    apiBase: "https://ury.org.uk/api/v2",
    graphqlBase: "https://ury.org.uk/api/graphql",
  },
};

export default MyRadioEnvironments;
