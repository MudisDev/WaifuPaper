import React from 'react';
import { Alert } from 'react-native';

interface AlertInterface {
    title: string;
    text: string;
    onConfirm?: () => void;
    buttonCancel?: string;
    onCancel?: () => void;
    buttonOk?: string;
}

export const ShowAlert = ({ title, text, onConfirm, buttonOk, onCancel, buttonCancel }: AlertInterface): void => {
    Alert.alert(
        title,
        text,
        [
            {
                text: buttonCancel,
                onPress: onCancel,
                style: 'cancel',
            },
            {
                text: buttonOk,
                onPress: onConfirm,
                style: 'destructive',
            },

        ],
        {
            cancelable: true,
            /* onDismiss: () =>
              Alert.alert(
                'This alert was dismissed by tapping outside of the alert dialog.',
              ), */
        },
    );
}
