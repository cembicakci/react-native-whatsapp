import React from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import chats from "@/assets/data/chats.json";
import { defaultStyles } from "@/constants/Styles";
import ChatRow from "@/components/ChatRow";

const Chats = () => {
    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={{ paddingBottom: 40, backgroundColor: "#fff" }}
        >
            <FlatList
                data={chats}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
                ItemSeparatorComponent={() => <View style={[defaultStyles.separator, { marginLeft: 90 }]} />}
                renderItem={({ item }) => {
                    return <ChatRow {...item} />;
                }}
            />
        </ScrollView>
    );
};

export default Chats;

const styles = StyleSheet.create({});
