import {
  Text,
  ScrollView,
  StyleSheet,
  Share,
  Linking,
  Alert,
} from "react-native";
import React from "react";
import { APP_NAME, COLORS, FONTS } from "@/src/constants";
import Card from "@/src/components/Card/Card";
import SettingItem from "@/src/components/SettingItem/SettingItem";
import { useSettingsStore } from "@/src/store/settingsStore";
import { useRouter } from "expo-router";
import { onFetchUpdateAsync, onImpact, rateApp } from "@/src/utils";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import * as Constants from "expo-constants";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import HelpBottomSheet from "@/src/components/BottomSheets/HelpBottomSheet";
import PPBottomSheet from "@/src/components/BottomSheets/PPBottomSheet";
import TnCBottomSheet from "@/src/components/BottomSheets/TnCBottomSheet";
import { useHistoryStore } from "@/src/store/historyStore";
import { useDailyTipStore } from "@/src/store/useDailyTip";
import useLocalAuthState from "@/src/hooks/useLocalAuthState";

const Page = () => {
  const { settings, update, restore } = useSettingsStore();
  const { clear } = useHistoryStore();
  const { restore: restoreTip } = useDailyTipStore();
  const { hasHadWare, isEnrolled } = useLocalAuthState();
  const tnCBottomSheetRef = React.useRef<BottomSheetModal>(null);
  const ppBottomSheetRef = React.useRef<BottomSheetModal>(null);
  const helpBottomSheetRef = React.useRef<BottomSheetModal>(null);
  const router = useRouter();
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: COLORS.main }}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <TnCBottomSheet ref={tnCBottomSheetRef} />
      <PPBottomSheet ref={ppBottomSheetRef} />
      <HelpBottomSheet ref={helpBottomSheetRef} />
      <Text style={[styles.headerText, { marginTop: 20 }]}>Misc</Text>
      <Card
        style={{
          marginHorizontal: 10,
          paddingVertical: 10,
          paddingHorizontal: 0,
          maxWidth: "100%",
          backgroundColor: COLORS.white,
        }}
      >
        <SettingItem
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            update({ ...settings, haptics: !settings.haptics });
          }}
          title="Haptics"
          Icon={
            <MaterialCommunityIcons
              name={settings.haptics ? "vibrate" : "vibrate-off"}
              size={24}
              color={COLORS.black}
            />
          }
          subTitle={settings.haptics ? "ONN" : "OFF"}
        />

        <SettingItem
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            update({ ...settings, sound: !settings.sound });
          }}
          title="In app Sounds"
          subTitle={settings.sound ? "ONN" : "OFF"}
          Icon={
            <MaterialCommunityIcons
              name={settings.sound ? "speaker" : "speaker-off"}
              size={24}
              color={COLORS.black}
            />
          }
        />
        <SettingItem
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            await onFetchUpdateAsync();
          }}
          title="Check for Updates"
          Icon={<MaterialIcons name="update" size={24} color={COLORS.black} />}
        />
      </Card>

      <Text style={[styles.headerText, { marginTop: 20 }]}>
        Storage and Security
      </Text>
      <Card
        style={{
          marginHorizontal: 10,
          paddingVertical: 10,
          paddingHorizontal: 0,
          maxWidth: "100%",
          backgroundColor: COLORS.white,
        }}
      >
        <SettingItem
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            if (!hasHadWare || !isEnrolled) return;
            update({ ...settings, lock: !settings.lock });
          }}
          title={"App Lock"}
          Icon={
            <MaterialCommunityIcons
              name={settings.lock ? "fingerprint" : "fingerprint-off"}
              size={24}
              color={COLORS.black}
            />
          }
          subTitle={settings.lock ? "ONN" : "OFF"}
        />

        <SettingItem
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            Alert.alert(
              APP_NAME,
              "Are you sure you want to clear Prediction history?",
              [
                {
                  text: "YES",
                  style: "default",
                  onPress: async () => {
                    if (settings.haptics) {
                      await onImpact();
                    }
                    clear();
                  },
                },
                {
                  text: "NO",
                  style: "cancel",
                  onPress: async () => {
                    if (settings.haptics) {
                      await onImpact();
                    }
                  },
                },
              ],
              { cancelable: false }
            );
          }}
          labelStyle={{
            color: COLORS.red,
          }}
          title="Clear History"
          Icon={
            <MaterialIcons name="compare-arrows" size={24} color={COLORS.red} />
          }
        />
        <SettingItem
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            Alert.alert(
              APP_NAME,
              "Are you sure you want to reset Oral Guard?",
              [
                {
                  text: "YES",
                  style: "default",
                  onPress: async () => {
                    if (settings.haptics) {
                      await onImpact();
                    }
                    restore();
                    restoreTip();
                    clear();
                    router.dismissAll();
                    router.replace("/");
                  },
                },
                {
                  text: "NO",
                  style: "cancel",
                  onPress: async () => {
                    if (settings.haptics) {
                      await onImpact();
                    }
                  },
                },
              ],
              { cancelable: false }
            );
          }}
          labelStyle={{
            color: COLORS.red,
          }}
          title="Restore Settings"
          Icon={<MaterialIcons name="reset-tv" size={24} color={COLORS.red} />}
        />
      </Card>
      <Text style={styles.headerText}>Support</Text>
      <Card
        style={{
          marginHorizontal: 10,
          paddingVertical: 10,
          paddingHorizontal: 0,
          maxWidth: "100%",
          backgroundColor: COLORS.white,
        }}
      >
        <SettingItem
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            await Share.share(
              {
                url: "https://github.com/CrispenGari/OralGuard",
                message:
                  "An AI-powered mobile tool that assists in the classifying oral cancer: Download at https://github.com/CrispenGari/OralGuard",
                title: "Share  Oral Guard with a Friend",
              },
              { dialogTitle: "Share Oral Guard", tintColor: COLORS.tertiary }
            );
          }}
          title="Share Oral Guard"
          Icon={
            <Ionicons name="heart-outline" size={24} color={COLORS.black} />
          }
        />
        <SettingItem
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            await rateApp();
          }}
          title="Rate Oral Guard"
          Icon={<Ionicons name="star-outline" size={24} color={COLORS.black} />}
        />
        <SettingItem
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            helpBottomSheetRef.current?.present();
          }}
          title="How does Oral Guard works"
          Icon={<Ionicons name="help" size={24} color={COLORS.black} />}
        />
        <SettingItem
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            const res = await Linking.canOpenURL(
              "https://github.com/CrispenGari/OralGuard/issues"
            );
            if (res) {
              Linking.openURL(
                "https://github.com/CrispenGari/OralGuard/issues"
              );
            }
          }}
          title="Report an Issue"
          Icon={<Ionicons name="logo-github" size={24} color={COLORS.black} />}
        />
      </Card>
      <Text style={styles.headerText}>Legal</Text>
      <Card
        style={{
          marginHorizontal: 10,
          paddingVertical: 10,
          paddingHorizontal: 0,
          maxWidth: "100%",
          backgroundColor: COLORS.white,
        }}
      >
        <SettingItem
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            tnCBottomSheetRef.current?.present();
          }}
          title="Terms of Service"
          Icon={
            <Ionicons
              name="document-text-outline"
              size={18}
              color={COLORS.black}
            />
          }
        />
        <SettingItem
          onPress={async () => {
            if (settings.haptics) {
              await onImpact();
            }
            ppBottomSheetRef.current?.present();
          }}
          title="Privacy Policy"
          Icon={
            <Ionicons
              name="document-text-outline"
              size={18}
              color={COLORS.black}
            />
          }
        />
      </Card>
      <Text
        style={{
          fontFamily: FONTS.regular,
          color: COLORS.black,
          padding: 10,
          textAlign: "center",
          marginTop: 30,
        }}
      >
        {Constants.default.expoConfig?.name}
        {" version: "}
        {Constants.default.expoConfig?.version}
      </Text>
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({
  headerText: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    marginLeft: 10,
    marginTop: 20,
    color: COLORS.black,
    marginBottom: 5,
    textTransform: "uppercase",
  },
});
