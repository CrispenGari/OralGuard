import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Card from "../Card/Card";
import { THistory } from "../../types";
import { useSettingsStore } from "../../store/settingsStore";
import { useRouter } from "expo-router";
import { onImpact } from "../../utils";
import {
  COLORS,
  FONTS,
  PLOT_COLORS,
  relativeTimeObject,
} from "../../constants";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocal from "dayjs/plugin/updateLocale";
import { PieChart } from "react-native-gifted-charts";
import LegendItem from "../LegendItem/LegendItem";
import Animated from "react-native-reanimated";
dayjs.extend(relativeTime);
dayjs.extend(updateLocal);
dayjs.updateLocale("en", {
  relativeTime: relativeTimeObject,
});

const HistoryItemHome = ({ item }: { item: THistory }) => {
  const { settings } = useSettingsStore();
  const router = useRouter();

  const plotsData = React.useMemo(() => {
    const { prediction } = item;
    return ["benign", "malignant"].map((item, index) => {
      const isMatch = item === prediction.class_label;
      const probability = isMatch
        ? prediction.probability * 100
        : (1 - prediction.probability) * 100;

      return {
        value: probability,
        color: PLOT_COLORS[index],
        prediction: `${item} (${
          isMatch ? prediction.label : prediction.label === 1 ? 0 : 1
        }) • ${probability.toFixed(0)}%`,
        label: "",
      };
    });
  }, [item]);
  return (
    <Card
      style={{
        backgroundColor: COLORS.white,
        width: "100%",
        maxWidth: 500,
        alignSelf: "center",
        padding: 10,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          backgroundColor: COLORS.secondary,
          position: "absolute",
          top: 0,
          right: 0,
          width: 50,
          padding: 5,
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.bold,
            color: COLORS.black,
            fontSize: 10,
          }}
        >
          {dayjs(new Date(item.date)).fromNow()} ago
        </Text>
      </View>
      <TouchableOpacity
        style={{}}
        onPress={async () => {
          if (settings.haptics) {
            await onImpact();
          }
          router.navigate({
            pathname: "/(common)/results",
            params: {
              id: item.id,
            },
          });
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            width: "100%",
            gap: 20,
          }}
        >
          <View style={{ flex: 1 }}>
            <Animated.Image
              source={{
                uri: item.lesion,
              }}
              style={{ width: 30, height: 30, resizeMode: "contain" }}
            />
            <Text
              style={{
                fontFamily: FONTS.regular,
                fontSize: 14,
                color: COLORS.gray,
              }}
            >
              {`Based on the Lesion image provided, the oral cancer class is "${item.prediction.class_label}".`}
            </Text>
          </View>
          <View
            style={{
              gap: 5,
              flex: 1,
            }}
          >
            <View style={{}}>
              <PieChart
                donut
                isAnimated
                animationDuration={300}
                innerRadius={23}
                data={plotsData}
                radius={35}
                centerLabelComponent={() => {
                  return (
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: FONTS.bold,
                          fontSize: 10,
                          textAlign: "center",
                        }}
                      >
                        {item.prediction.class_label}
                      </Text>
                    </View>
                  );
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginTop: 5,
                }}
              >
                {plotsData.map((data, index) => (
                  <LegendItem
                    label={data.prediction}
                    key={index}
                    color={data.color}
                    dotStyle={{ width: 10, height: 10, borderRadius: 10 }}
                    labelStyle={{
                      fontSize: 12,
                      fontFamily: FONTS.regular,
                    }}
                  />
                ))}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

export default HistoryItemHome;
