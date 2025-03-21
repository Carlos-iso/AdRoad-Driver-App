import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Alert
} from "react-native";
import { RootStackParamList } from "../../../routes/types";
import RegisterService from "./RegisterService";
import backgroundImage from "../../../assets/arts/background-adroad.png";
import Icon from "../../../assets/svgs/Logo.svg";
import tokenManager from "../../Utils/tokenManager";
import { timeMs } from "../../Utils/Utils";

const apiUrl = "https://adroad-api.onrender.com";

type RegisterScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "UserSelect"
>;
