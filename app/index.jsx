import { Colors } from "@/constants/Colors";
import {  useRouter } from "expo-router";
import React, { useRef } from "react";
import { Text, View, Image, StyleSheet,  TouchableOpacity } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import Animated, {
  FadeIn,
  Easing
} from "react-native-reanimated";

export default function Index() {
  const onboardingRef = useRef(null);
  const handleNext = () => {
    onboardingRef.current?.goNext(); 
  };
  return (
    //onBoarding screen to display some images and text when app starts
    <Onboarding
      DotComponent={Dots}
      NextButtonComponent={() => <Next onNext={handleNext} />}
      ref ={onboardingRef}
      SkipButtonComponent={Skip}
      DoneButtonComponent={Done}
      bottomBarColor = {Colors.dark}
      titleStyles={{ color: Colors.primary, fontWeight: "700" }}
      subTitleStyles={{
        color: Colors.light,
        textAlign: "center",
        paddingHorizontal: 20,
        lineHeight: 25,
        fontWeight: "200",
      }}
      pages={[
        {
          backgroundColor: Colors.dark,
          image: (
            <View style={styles.container}>
              <Image
                source={require("../assets/images/onboarding/calender.png")}
                style={styles.img}
              />
            </View>
          ),
          title: "Build a Better Routine.",
          subtitle:
            "Start by cording the habbits you want to track in your life along with your pending.",
        },
        {
          backgroundColor: Colors.dark,
          image: (
            <View style={styles.container}>
              <Image
                source={require("../assets/images/onboarding/study.png")}
                style={styles.img}
              />
            </View>
          ),
          title: "Stay Motivated",
          subtitle:
            "Create streaks of success for your habbits and complete all your tasks. Use the charts and tools to deeply analyze your progress.",
        },
        {
          backgroundColor: Colors.dark,
          image: (
            <View style={styles.container}>
              <Image
                source={require("../assets/images/onboarding/register.png")}
                style={styles.img}
              />
            </View>
          ),
          title: "Make Each Day Count",
          subtitle:
            "Every day you will receive a list of all your activities. Make use of reminders to ensure you.",
        },
        {
          backgroundColor: Colors.dark,
          image: (
            <View style={styles.container}>
              <Image
                source={require("../assets/images/onboarding/mobile.png")}
                style={styles.img}
              />
            </View>
          ),
          title: "Customize Your Journey",
          subtitle:
            "Try all the customization options. Create a daily journal and protect your data.",
        },
      ]}
    />
  );
}



// this component is for dots of onboarding screen
const Dots = ({ isLight, selected }) => {
  let backgroundColor;
  if (isLight) {
    backgroundColor = selected ? Colors.primary : Colors.dark;
  } else {
    backgroundColor = selected ? Colors.primary : Colors.light;
  }
  return (
    <View style={{paddingBottom  :120}}>
      {selected ? (
        <Animated.View
        entering={FadeIn.delay(1)
          .duration(1000) 
          .damping(8)
          .easing(Easing.inOut(Easing.ease))}
          style={{
            width: 25,
            height: 10,
            borderRadius : 10,
            marginHorizontal: 1,
            backgroundColor,
          }}
        />
      ) : (
        <View
          style={{
            width: 14,
            height: 10,
            marginHorizontal: 2,
            borderRadius : 5,
            backgroundColor,
          }}
        />
      )}
    </View>
  );
};


// done button
const Done = () => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.replace("/(tabs)/today")}
      style={{
        justifyContent: "center",
        paddingVertical: 8,
        paddingHorizontal: 30,
        backgroundColor: Colors.primary,
        borderRadius: 50,
        marginHorizontal: 10,
      }}
    >
      <Text style={{ color: Colors.light, fontSize: 16, fontWeight: "bold" }}>
        Done
      </Text>
    </TouchableOpacity>
  );
};

// Skip button for onboarding
const Skip = () => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.replace("/(tabs)/today")}
      style={{
        justifyContent: "center",
        paddingHorizontal: 20,
      }}
    >
      <Text style={{ color: Colors.light, fontSize: 16, fontWeight: "bold" }}>
        Skip
      </Text>
    </TouchableOpacity>
  );
};


// this component for the next button of onboarding screen

const Next = ({onNext}) => (
  <TouchableOpacity
    onPress={onNext} 
    style={{
      justifyContent: "center",
      paddingVertical: 8,
      paddingHorizontal: 30,
      backgroundColor: Colors.primary,
      borderRadius: 50,
      marginHorizontal: 10,
    }}
  >
    <Text style={{ color: Colors.light, fontSize: 16, fontWeight: "bold" }}>
      Next
    </Text>
  </TouchableOpacity>
);


const styles = StyleSheet.create({
  container: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: Colors.primaryLight,
    borderRadius: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 120,
    height: 120,
  },
});