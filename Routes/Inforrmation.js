import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TextInput,
  Pressable,
  ToastAndroid,
} from "react-native";
import * as Linking from "expo-linking";
import { StatusBar } from "expo-status-bar";

const NETLIFY_PORTFOLIO = "https://phoenixcreation.netlify.app";

const theme = {
  font: "white",
  fontSecondary: "#a1a1a1",
  fontPrivacy: "#e1e1e1",
  backgroundColor: "#222",
};

const Inforrmation = () => {
  const [contact, setContact] = useState({
    username: "",
    useremail: "",
    title: "",
    description: "",
  });

  const goToLink = (link) => {
    Linking.openURL(link);
  };

  const submitContact = async () => {
    const res = await fetch(
      "https://discord.com/api/webhooks/834448800511950859/GNdHRvr9NqTOAdD5Ham4Fc7P5mhFOc8XzmwrmOdU4Jjhc5AL2lLWEOf6Q3_NzxcjfBBW",
      {
        method: "POST",
        body: JSON.stringify({
          username: "Relaxer Contact",
          content: "Contact submission from Relaxer",
          embeds: [
            {
              title: "`Title`: " + contact.title,
              url: "",
              description: "`Description`: " + contact.description,
              color: Math.floor(Math.random() * 16777215),
              fields: [
                {
                  name: "`User's name`",
                  value: contact.username,
                },
                {
                  name: "`User's Email`",
                  value: contact.useremail,
                },
              ],
            },
          ],
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    ToastAndroid.show("Thank you for reaching out", ToastAndroid.LONG);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headingCont}>
        <View style={styles.logoCont}>
          <LinearGradient
            colors={["#00bfa1", "#007cb0"]}
            style={styles.logoCircle}
          />
        </View>
        <Text style={styles.headingMain}>Relaxer</Text>
        <Text style={styles.headingVersion}>1.5.18</Text>
      </View>
      <View style={styles.copyrightCont}>
        <Text style={styles.copyright}>
          ©{" "}
          <Text
            onPress={() => goToLink(NETLIFY_PORTFOLIO)}
            style={{
              ...styles.copyright,
              textDecorationColor: "green",
              textDecorationLine: "underline",
              fontWeight: "bold",
            }}
          >
            PhoenixCreation{" "}
          </Text>
          2021-2028
        </Text>
        <Text
          style={styles.licence}
          onPress={() =>
            goToLink(
              "https://github.com/PhoenixCreation/relaxer/blob/main/LICENCE.md"
            )
          }
        >
          Licence: MIT
        </Text>
        <View style={styles.privacyCont}>
          <Text style={styles.privacy}>
            <Text style={styles.privacyHeading}>Privacy notice:</Text> I(we)
            care about your personal data. So there is no personal data
            compromization in this app. There is actually no database connected
            to this app. I also don't call any api (except for contact support)
            or use any type of tracking services. If you don't belive me which
            you shouldn't then you can check the{" "}
            <Text
              onPress={() =>
                goToLink("https://github.com/PhoenixCreation/relaxer")
              }
              style={{
                ...styles.privacy,
                textDecorationColor: theme.font,
                textDecorationLine: "underline",
              }}
            >
              source code of this app here
            </Text>
            . If you are not expert or doesn't know about code base then you can
            use any type of contact services to reach me(us) mentioned below and
            I(we) will explain whatever problem you have.
          </Text>
        </View>
        <View style={styles.contactHeadingCont}>
          <Text style={styles.contactHeading}>Contact Me(Us):</Text>
        </View>
        <View style={styles.contactForm}>
          <Text style={styles.label}>Your Name: </Text>
          <TextInput
            value={contact.username}
            onChangeText={(e) => setContact({ ...contact, username: e })}
            placeholder="Your Good Name..."
            placeholderTextColor="#a1a1a1"
            style={styles.contactField}
          />
          <Text style={styles.label}>Your Email(optional): </Text>
          <TextInput
            value={contact.useremail}
            onChangeText={(e) => setContact({ ...contact, useremail: e })}
            placeholder="abc@xyz.com (optional)"
            placeholderTextColor="#a1a1a1"
            style={styles.contactField}
          />
          <Text style={styles.label}>Title: </Text>
          <TextInput
            value={contact.title}
            onChangeText={(e) => setContact({ ...contact, title: e })}
            placeholder="Main reason"
            placeholderTextColor="#a1a1a1"
            style={styles.contactField}
          />
          <Text style={styles.label}>Description: </Text>
          <TextInput
            value={contact.description}
            onChangeText={(e) => setContact({ ...contact, description: e })}
            numberOfLines={5}
            multiline={true}
            placeholder="Describe your reason to contact"
            placeholderTextColor="#a1a1a1"
            style={styles.contactField}
          />
          <Pressable style={styles.contactSubmit} onPress={submitContact}>
            <LinearGradient
              style={{ ...StyleSheet.absoluteFillObject }}
              colors={["#00bfa1", "#00a1c1"]}
            ></LinearGradient>
            <Text style={styles.submit}>Submit</Text>
          </Pressable>
        </View>
        <View style={styles.developersCont}>
          <Text style={styles.developers}>Developer(s):</Text>
        </View>
        <View style={styles.contactDetails}>
          <Text style={styles.contactHead}>1. HET PATEL (phoenix)</Text>
          <Text
            style={styles.contact}
            onPress={() => goToLink("https://twitter.com/PhoenixCrea2ion")}
          >
            - Twitter: @PhoenixCrea2ion
          </Text>
          <Text
            style={styles.contact}
            onPress={() => goToLink("https://instagram.com/phoenixcreationweb")}
          >
            - Instagram: phoenixcreationweb
          </Text>
          <Text
            style={styles.contact}
            onPress={() => goToLink(NETLIFY_PORTFOLIO)}
          >
            - Website: phoenixcreation.netlify.app
          </Text>
        </View>
        <View style={styles.developersCont}>
          <Text style={styles.developers}>UI/UX Designer(s)</Text>
        </View>
        <View style={styles.contactDetails}>
          <Text style={styles.contactHead}>1. HET PATEL (phoenix)</Text>
          <Text
            style={styles.contact}
            onPress={() => goToLink("https://twitter.com/PhoenixCrea2ion")}
          >
            - Twitter: @PhoenixCrea2ion
          </Text>
          <Text
            style={styles.contact}
            onPress={() => goToLink("https://instagram.com/phoenixcreationweb")}
          >
            - Instagram: phoenixcreationweb
          </Text>
          <Text
            style={styles.contact}
            onPress={() => goToLink(NETLIFY_PORTFOLIO)}
          >
            - Website: phoenixcreation.netlify.app
          </Text>
        </View>
        <View style={styles.contactDetails}>
          <Text style={styles.contactHead}>2. GAURAV PATEL</Text>
          <Text
            style={styles.contact}
            onPress={() => goToLink("https://twitter.com/Patelgauravd")}
          >
            - Twitter: @Patelgauravd
          </Text>
          <Text
            style={styles.contact}
            onPress={() => goToLink("https://t.me/yisyyq")}
          >
            - Telegram: yisyyq (click to open in app)
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Inforrmation;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.backgroundColor,
  },
  headingCont: {
    width: "100%",
    margin: 10,
    paddingTop: 80,
    paddingBottom: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  logoCont: {
    width: 75,
    height: 75,
    backgroundColor: "#333",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#00bfa1",
  },
  logoCircle: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  headingMain: {
    color: theme.font,
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Roboto",
  },
  headingVersion: {
    color: theme.fontSecondary,
    textAlign: "center",
    fontSize: 18,
  },
  copyrightCont: {
    width: "100%",
    alignItems: "center",
  },
  copyright: {
    color: "green",
    textAlign: "center",
    fontSize: 18,
  },
  licence: {
    color: theme.font,
    marginTop: 10,
    fontSize: 18,
  },
  privacyCont: {
    margin: 10,
    padding: 5,
  },
  privacy: {
    color: theme.fontPrivacy,
    fontSize: 15,
    textAlign: "justify",
  },
  privacyHeading: {
    fontWeight: "bold",
  },
  developersCont: {
    margin: 10,
    padding: 5,
  },
  developers: {
    textAlign: "left",
    color: "#00bfa1",
    fontSize: 20,
    fontWeight: "bold",
  },
  contactDetails: {
    width: "100%",
    padding: 15,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  contactHead: {
    color: theme.font,
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "left",
  },
  contact: {
    color: theme.fontPrivacy,
    fontSize: 15,
    marginLeft: 20,
    paddingVertical: 4,
  },
  contactHeadingCont: {
    width: "100%",
    alignItems: "center",
  },
  contactHeading: {
    color: "#00bfa1",
    fontSize: 20,
    fontWeight: "bold",
  },
  contactForm: {
    width: "100%",
    padding: 15,
  },
  label: {
    color: theme.font,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  contactField: {
    color: theme.font,
    fontSize: 15,
    width: "100%",
    paddingVertical: 7,
    paddingLeft: 20,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#00a1a1",
    marginBottom: 15,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  contactSubmit: {
    width: 130,
    height: 40,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    overflow: "hidden",
  },
  submit: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
});
