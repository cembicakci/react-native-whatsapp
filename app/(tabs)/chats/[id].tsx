import React, { useCallback, useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { Bubble, GiftedChat, IMessage, SystemMessage } from "react-native-gifted-chat";
import messageData from "@/assets/data/messages.json";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";

const Page = () => {
    const insets = useSafeAreaInsets();

    const [messages, setMessages] = useState<IMessage[]>([]);
    const [text, setText] = useState("");

    useEffect(() => {
        setMessages([
            ...messageData.map((message) => {
                return {
                    _id: message.id,
                    text: message.msg,
                    createdAt: new Date(message.date),
                    user: {
                        _id: message.from,
                        name: message.from ? "You" : "Bob",
                    },
                };
            }),
            {
                _id: 0,
                system: true,
                text: "All your base are belong to us",
                createdAt: new Date(),
                user: {
                    _id: 0,
                    name: "Bot",
                },
            },
        ]);
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
    }, []);

    return (
        <ImageBackground
            source={require("@/assets/images/pattern.png")}
            style={{ flex: 1, marginBottom: insets.bottom, backgroundColor: Colors.background }}
        >
            <GiftedChat
                messages={messages}
                onSend={(messages: any) => onSend(messages)}
                user={{
                    _id: 1,
                }}
                onInputTextChanged={setText}
                renderSystemMessage={(props) => (
                    <SystemMessage {...props} textStyle={{ color: Colors.gray }} />
                )}
                renderBubble={(props) => {
                    return (
                        <Bubble
                            {...props}
                            textStyle={{
                                right: {
                                    color: "#000",
                                },
                            }}
                            wrapperStyle={{
                                left: {
                                    backgroundColor: "#fff",
                                },
                                right: {
                                    backgroundColor: Colors.lightGreen,
                                },
                            }}
                        />
                    );
                }}
                bottomOffset={insets.bottom}
                renderAvatar={null}
                maxComposerHeight={100}
            />
        </ImageBackground>
    );
};

export default Page;

const styles = StyleSheet.create({
    composer: {
        backgroundColor: "#fff",
        borderRadius: 18,
        borderWidth: 1,
        borderColor: Colors.lightGray,
        paddingHorizontal: 10,
        paddingTop: 8,
        fontSize: 16,
        marginVertical: 4,
    },
});
