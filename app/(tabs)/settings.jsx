import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";
import { AuthContext, AuthProvider } from "../context/AuthProvider";

const Settings = () => {
  const router = useRouter();
  const { user } = React.useContext(AuthContext);
  const { emails } = React.useContext(AuthContext);
  const { usernames } = React.useContext(AuthContext);
  const { logout } = React.useContext(AuthContext);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/icon.png")}
          style={styles.headerImage}
        />
        <Text style={styles.headerText}>{emails}</Text>
      </View>

      <ScrollView>
        <View style={styles.items}>
          <View style={styles.item}>
            <Ionicons
              name="person-outline"
              size={24}
              color="black"
              style={styles.icon}
            />
            <Pressable
              onPress={() => router.push("/components/Settings/Pages")}
            >
              <Text style={styles.itemText}>Edit Profile</Text>
            </Pressable>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Customer Care</Text>
          </View>

          <View style={styles.item}>
            <Ionicons
              name="call-outline"
              size={24}
              color="black"
              style={styles.icon}
            />
            <Pressable
              onPress={() => router.push("/components/Settings/Contact")}
            >
              <Text style={styles.itemText}>Contact Us</Text>
            </Pressable>
          </View>

          <View style={styles.item}>
            <Ionicons
              name="chatbubbles-outline"
              size={24}
              color="black"
              style={styles.icon}
            />
            <Pressable
              onPress={() => router.push("/components/Settings/Feedback")}
            >
              <Text style={styles.itemText}>Feedback</Text>
            </Pressable>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Legal</Text>
          </View>

          <View style={styles.item}>
            <Pressable
              onPress={() => router.push("/components/Settings/terms")}
            >
              <Ionicons
                name="document-text-outline"
                size={24}
                color="black"
                style={styles.icon}
              />
              <Text style={styles.itemText}>Terms and Conditions</Text>
            </Pressable>
          </View>

          <View style={styles.item}>
            <Pressable
              onPress={() => router.push("/components/Settings/Policies")}
            >
              <Ionicons
                name="shield-checkmark-outline"
                size={24}
                color="black"
                style={styles.icon}
              />
              <Text style={styles.itemText}>Policies</Text>
            </Pressable>
          </View>

          <View style={styles.item}>
            <Ionicons
              name="log-out-outline"
              size={24}
              color="black"
              style={styles.icon}
            />
            <Pressable onPress={logout}>
              <Text style={styles.itemText}>Logout</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  header: {
    alignItems: "center",
    marginVertical: 30,
    marginTop: 5,
  },
  headerImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  items: {
    paddingHorizontal: 30,
  },
  sectionHeader: {
    marginTop: 20,
    paddingVertical: 12,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#666",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  icon: {
    marginRight: 12,
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
});
