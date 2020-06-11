import React, { useState } from "react";
import { withApollo } from "../libs/apollo";
import { useQuery } from "@apollo/react-hooks";
import { LIST_COUNTRIES } from "../gql/allCountry";
import {
  Container,
  Typography,
  ExpansionPanelDetails,
  CssBaseline,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import MoneyIcon from "@material-ui/icons/Money";
import PhoneIcon from "@material-ui/icons/Phone";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import LanguageIcon from "@material-ui/icons/Language";
import Select from "@material-ui/core/Select";
import EmojiFlagsIcon from "@material-ui/icons/EmojiFlags";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Head from "next/head";
import { FlagIcon } from "react-flag-kit";

const Country = () => {
  const [country, setCountry] = useState({});
  const [language, setLanguage] = useState("");
  const { loading, error, data } = useQuery(LIST_COUNTRIES);

  if (error) return <h1>Error</h1>;
  if (loading) return <h1>Loading...</h1>;

  const handleChange = (event) => {
    const value = data.countries.find(
      (code) => code.code === event.target.value
    );
    const languageValue = value.languages.map(
      (language) => language.name,
      language.native
    );
    if (value) {
      setCountry(value);
      setLanguage(languageValue);
    }
  };

  return (
    <div className="container">
      <Head>
        <title>Countries!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container>
          <CssBaseline />
          <Typography variant="h3">Countries!</Typography>
          <FormControl>
            <InputLabel>Countries!</InputLabel>
            <Select onChange={handleChange} size={40}>
              {data.countries.map((country) => (
                <MenuItem key={country.code} value={country.code}>
                  <FlagIcon code={country.code} size={28} />
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <ExpansionPanelDetails>
            <List>
              <ListItem>
                <ListItemIcon>
                  <MoneyIcon />
                </ListItemIcon>
                <ListItemText primary={country.currency} />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <PhoneIcon />
                </ListItemIcon>
                <ListItemText primary={country.phone} />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <LocationCityIcon />
                </ListItemIcon>
                <ListItemText primary={country.capital} />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <LanguageIcon />
                </ListItemIcon>
                <ListItemText primary={language} />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <EmojiFlagsIcon />
                </ListItemIcon>
                <FlagIcon code={country.code} size={48} />
              </ListItem>
            </List>
          </ExpansionPanelDetails>
        </Container>
      </main>
    </div>
  );
};

export default withApollo({ ssr: true })(Country);
