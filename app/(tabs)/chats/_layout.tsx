import React from "react";
import { Link, Stack } from "expo-router";
import Colors from "@/constants/Colors";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Layout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: "Chats",
                    headerLargeTitle: true,
                    headerTransparent: true,
                    headerBlurEffect: "regular",
                    // headerStyle: { backgroundColor: "#fff" },
                    headerSearchBarOptions: {
                        placeholder: "Search",
                    },
                    headerLeft: () => {
                        return (
                            <TouchableOpacity>
                                <Ionicons
                                    name="ellipsis-horizontal-circle-outline"
                                    color={Colors.primary}
                                    size={30}
                                />
                            </TouchableOpacity>
                        );
                    },
                    headerRight: () => {
                        return (
                            <View style={{ flexDirection: "row", gap: 30 }}>
                                <TouchableOpacity>
                                    <Ionicons name="camera-outline" color={Colors.primary} size={30} />
                                </TouchableOpacity>
                                <Link href={"/(modals)/new-chat"} asChild>
                                    <TouchableOpacity>
                                        <Ionicons name="add-circle" color={Colors.primary} size={30} />
                                    </TouchableOpacity>
                                </Link>
                            </View>
                        );
                    },
                }}
            />
        </Stack>
    );
};

export default Layout;
