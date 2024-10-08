import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field";
import Colors from "@/constants/Colors";
import { isClerkAPIResponseError, useSignIn, useSignUp } from "@clerk/clerk-expo";

const Page = () => {
    const { phone, signin } = useLocalSearchParams<{ phone: string; signin: string }>();

    const { signUp, setActive } = useSignUp();
    const { signIn } = useSignIn();

    const CELL_COUNT = 6;

    const [value, setValue] = useState("");
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    useEffect(() => {
        if (value.length === 6) {
            if (signin) {
                verifySignIn();
            } else {
                verifyCode();
            }
        }
    }, [value]);

    const verifyCode = async () => {
        try {
            await signUp?.attemptPhoneNumberVerification({ code: value });

            await setActive!({ session: signUp?.createdSessionId });
        } catch (error) {
            if (isClerkAPIResponseError(error)) {
                Alert.alert("Error", error.errors[0].message);
            }
        }
    };

    const verifySignIn = async () => {
        try {
            await signIn!.attemptFirstFactor({
                strategy: "phone_code",
                code: value,
            });

            await setActive!({ session: signIn!.createdSessionId });
        } catch (err) {
            console.log("error", JSON.stringify(err, null, 2));
            if (isClerkAPIResponseError(err)) {
                Alert.alert("Error", err.errors[0].message);
            }
        }
    };

    const resendCode = async () => {
        try {
            if (signin === "true") {
                const { supportedFirstFactors } = await signIn!.create({
                    identifier: phone,
                });

                const firstPhoneFactor: any = supportedFirstFactors.find((factor: any) => {
                    return factor.strategy === "phone_code";
                });

                const { phoneNumberId } = firstPhoneFactor;

                await signIn!.prepareFirstFactor({
                    strategy: "phone_code",
                    phoneNumberId,
                });
            } else {
                await signUp!.create({
                    phoneNumber: phone,
                });
                signUp!.preparePhoneNumberVerification();
            }
        } catch (err) {
            console.log("error", JSON.stringify(err, null, 2));
            if (isClerkAPIResponseError(err)) {
                Alert.alert("Error", err.errors[0].message);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerTitle: phone }} />
            <Text style={styles.legal}>We have sent you an SMS with a code to the number above</Text>
            <Text style={styles.legal}>
                To complete your phone number verification, please enter the 6-digit activation code.
            </Text>

            <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                    <View
                        onLayout={getCellOnLayoutHandler(index)}
                        key={index}
                        style={[styles.cellRoot, isFocused && styles.focusCell]}
                    >
                        <Text style={styles.cellText}>{symbol || (isFocused ? <Cursor /> : null)}</Text>
                    </View>
                )}
            />

            <TouchableOpacity style={styles.button} onPress={resendCode}>
                <Text style={styles.buttonText}>Did't receive a verification code?</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Page;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 20,
        backgroundColor: Colors.background,
        gap: 20,
    },
    loading: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    legal: {
        fontSize: 12,
        textAlign: "center",
        color: "#000",
    },
    button: {
        width: "100%",
        alignItems: "center",
    },
    buttonText: {
        color: Colors.primary,
        fontSize: 18,
    },
    codeFieldRoot: {
        marginTop: 20,
        width: 260,
        marginLeft: "auto",
        marginRight: "auto",
        gap: 4,
    },
    cellRoot: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
    },
    cellText: {
        color: "#000",
        fontSize: 36,
        textAlign: "center",
    },
    focusCell: {
        paddingBottom: 4,
        borderBottomColor: "#000",
        borderBottomWidth: 2,
    },
});
