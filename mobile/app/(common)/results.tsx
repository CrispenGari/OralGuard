import { Text, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useHistoryStore } from "@/src/store/historyStore";
import ResultHeader from "@/src/components/Headers/ResultHeader";
import {
  COLORS,
  FONTS,
  PLOT_COLORS,
  relativeTimeObject,
} from "@/src/constants";
import Card from "@/src/components/Card/Card";
import Animated, { SlideInLeft, SlideInRight } from "react-native-reanimated";
import { BarChart, CurveType } from "react-native-gifted-charts";
import LegendItem from "@/src/components/LegendItem/LegendItem";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocal from "dayjs/plugin/updateLocale";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/src/components/Button/Button";

dayjs.extend(relativeTime);
dayjs.extend(updateLocal);
dayjs.updateLocale("en", {
  relativeTime: relativeTimeObject,
});

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { history } = useHistoryStore();
  const hist = React.useMemo(
    () => history.find((h) => h.id === id)!,
    [history, id]
  );

  const plotsData = React.useMemo(() => {
    const { prediction } = hist;
    return ["benign", "malignant"].map((item, index) => {
      const isMatch = item === prediction.class_label;
      const probability = isMatch
        ? prediction.probability * 100
        : (1 - prediction.probability) * 100;

      return {
        value: probability,
        frontColor: PLOT_COLORS[index],
        prediction: `${item} (${
          isMatch ? prediction.label : prediction.label === 1 ? 0 : 1
        }) • ${probability.toFixed(0)}%`,
        label: "",
      };
    });
  }, [hist]);
  return (
    <>
      <Stack.Screen options={{ header: () => <ResultHeader /> }} />
      <ScrollView
        bounces
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 300,
          padding: 10,
          gap: 5,
        }}
        style={{
          flex: 1,
          backgroundColor: COLORS.main,
        }}
      >
        <Animated.View entering={SlideInRight.duration(200).delay(200)}>
          <Card style={[styles.card, { marginTop: 30 }]}>
            <View
              style={{
                backgroundColor: COLORS.secondary,
                position: "absolute",
                top: 0,
                right: 0,
                width: 80,
                padding: 5,
              }}
            >
              <Text
                style={{
                  fontFamily: FONTS.bold,
                  color: COLORS.black,
                }}
              >
                {dayjs(new Date(hist.date)).fromNow()} ago
              </Text>
            </View>
            <View style={[styles.badge, {}]}>
              <Text
                style={{
                  fontFamily: FONTS.bold,
                  color: COLORS.black,
                }}
              >
                Image
              </Text>
            </View>

            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: 29,
              }}
            >
              Oral Lesion Image
            </Text>
            <Text
              style={{
                fontFamily: FONTS.regular,
                fontSize: 14,
                color: COLORS.gray,
              }}
            >
              The image that was used for the predictions response.
            </Text>

            <Animated.Image
              source={{
                uri: hist.lesion,
              }}
              style={{
                width: 200,
                height: 200,
                alignSelf: "center",
                marginVertical: 20,
              }}
            />
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInLeft.duration(200).delay(200)}>
          <Card style={[styles.card]}>
            <View
              style={{
                backgroundColor: COLORS.secondary,
                position: "absolute",
                top: 0,
                right: 0,
                width: 80,
                padding: 5,
              }}
            >
              <Text
                style={{
                  fontFamily: FONTS.bold,
                  color: COLORS.black,
                }}
              >
                {dayjs(new Date(hist.date)).fromNow()} ago
              </Text>
            </View>
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: 29,
              }}
            >
              Oral Cancer Classification Results
            </Text>
            <Text
              style={{
                fontFamily: FONTS.regular,
                fontSize: 14,
                color: COLORS.gray,
              }}
            >
              Based on the provided image, here are the oral cancer insights.
            </Text>

            <View
              style={{
                paddingBottom: 30,
                marginTop: 20,
              }}
            >
              <BarChart
                barWidth={50}
                noOfSections={3}
                barBorderRadius={4}
                minHeight={5}
                frontColor={COLORS.gray200}
                data={plotsData}
                yAxisThickness={0}
                xAxisThickness={0}
                width={300}
                isAnimated
                animationDuration={300}
                gradientColor={COLORS.red}
                xAxisLabelTextStyle={{
                  fontFamily: FONTS.bold,
                  color: COLORS.black,
                }}
                yAxisTextStyle={{
                  fontFamily: FONTS.bold,
                  color: COLORS.black,
                }}
                yAxisLabelSuffix="%"
                showLine
                rotateLabel
                roundToDigits={1}
                lineConfig={{
                  curved: true,
                  color: COLORS.secondary,
                  curveType: CurveType.QUADRATIC,
                  isAnimated: true,
                  dataPointsColor: COLORS.red,
                  animationDuration: 300,
                  thickness: 2,
                }}
              />
            </View>
            <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
              {plotsData
                .filter((i) => i.prediction !== "")
                .map((data, index) => (
                  <LegendItem
                    label={data.prediction}
                    key={index}
                    color={data.frontColor}
                  />
                ))}
            </View>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInRight.duration(200).delay(200)}>
          <Card style={[styles.card]}>
            <View
              style={{
                backgroundColor: COLORS.secondary,
                position: "absolute",
                top: 0,
                right: 0,
                width: 80,
                padding: 5,
              }}
            >
              <Text
                style={{
                  fontFamily: FONTS.bold,
                  color: COLORS.black,
                }}
              >
                {dayjs(new Date(hist.date)).fromNow()} ago
              </Text>
            </View>
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: 29,
              }}
            >
              Prediction Summary
            </Text>
            <Text
              style={{
                fontFamily: FONTS.regular,
                fontSize: 18,
                color: COLORS.black,
              }}
            >
              {`Based on the Oral Lesion image provided, the class of the cancer is "${hist.prediction.class_label}".`}
            </Text>

            <Text>{}</Text>
          </Card>
        </Animated.View>

        <Card
          style={{
            backgroundColor: COLORS.white,
            width: "100%",
            maxWidth: 500,
            alignSelf: "center",
            shadowOffset: { width: 2, height: 2 },
            elevation: 1,
            shadowColor: COLORS.tertiary,
            shadowOpacity: 0.35,
            shadowRadius: 2,
            padding: 20,
            gap: 20,
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: 25,
              }}
            >
              Want to try another Oral Lesion Image?
            </Text>
            <Text
              style={{
                fontFamily: FONTS.regular,
                color: COLORS.gray,
              }}
            >
              Change the lesion image or try to take another clear image and see
              the results.
            </Text>
          </View>
          <Button
            title="Scan a Oral Lesion"
            Icon={
              <Ionicons name="camera-outline" size={24} color={COLORS.black} />
            }
            style={{
              width: "100%",
              backgroundColor: COLORS.secondary,
              marginVertical: 10,
            }}
            titleStyle={{ color: COLORS.black }}
            onPress={() => {
              if (router.canGoBack()) router.back();
              router.navigate({
                pathname: "/(common)/predict",
              });
            }}
          />
        </Card>
      </ScrollView>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
    shadowOffset: { width: 2, height: 2 },
    elevation: 1,
    shadowColor: COLORS.secondary,
    shadowOpacity: 0.35,
    shadowRadius: 2,
    padding: 20,
    overflow: "hidden",
  },
  badge: {
    alignSelf: "center",
    position: "absolute",
    backgroundColor: COLORS.secondary,
    borderRadius: 999,
    shadowOffset: { width: 2, height: 2 },
    elevation: 1,
    shadowColor: COLORS.secondary,
    shadowOpacity: 0.35,
    shadowRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    top: -10,
    paddingHorizontal: 30,
  },
});
