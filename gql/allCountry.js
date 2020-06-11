import gql from "graphql-tag";

export const LIST_COUNTRIES = gql`
  query getCountry($data: CountryFilterInput) {
    countries(filter: $data) {
      name
      code
      emoji
      emojiU
      capital
      currency
      phone
      languages {
        name
        native
      }
    }
  }
`;
