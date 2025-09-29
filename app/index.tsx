import { Redirect } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, StyleSheet } from "react-native";

export default function Index() {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Redirect href="/(tabs)/(search)/search" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});