import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../routes/types";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Alert
} from "react-native";
type UserSelecScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "UserSelect"
>;
export default function UserSelect() {
    const navigation = useNavigation<UserSelecScreenNavigationProp>();
    return (
        <View>
            <Text>User Select</Text>
        </View>
    )
}
