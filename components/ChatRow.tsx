import Colors from "@/constants/Colors";
import { format } from "date-fns";
import { Link } from "expo-router";
import React, { FC } from "react";
import { Image, StyleSheet, Text, TouchableHighlight, View } from "react-native";

export interface ChatRowProps {
    id: string;
    from: string;
    date: string;
    img: string;
    msg: string;
    read: boolean;
    unreadCount: number;
}

const ChatRow: FC<ChatRowProps> = ({ id, from, date, img, msg, read, unreadCount }) => {
    return (
        <Link href={"/(tabs)/chats"} asChild>
            <TouchableHighlight activeOpacity={0.6} underlayColor={Colors.lightGray}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 14,
                        paddingLeft: 20,
                        paddingVertical: 10,
                    }}
                >
                    <Image source={{ uri: img }} style={{ width: 50, height: 50, borderRadius: 50 }} />
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18, color: read ? "#000" : "#000ff" }}>{from}</Text>
                        <Text style={{ color: "#888" }}>
                            {msg.length > 40 ? `${msg.substring(0, 40)}...` : msg}
                        </Text>
                    </View>
                    <Text style={{ color: Colors.gray, paddingRight: 20, alignSelf: "flex-start" }}>
                        {format(date, "MM.dd.yy")}
                    </Text>
                </View>
            </TouchableHighlight>
        </Link>
    );
};

export default ChatRow;

const styles = StyleSheet.create({});
