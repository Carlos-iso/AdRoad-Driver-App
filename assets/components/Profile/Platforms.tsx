import React from "react";
import { Modal, View, Text, Button } from "react-native";
const Plataforms = ({ visible, onClose }) => {
    return (
        <Modal visible={visible} animationType="fade" transparent={true}>
            <View style={{ backgroundColor: "#fff", padding: 20 }}>
                <Text>Informações:</Text>
                <Text>Coloque as informações que você deseja exibir aqui.</Text>
                <Button title="Fechar" onPress={onClose} />
            </View>
        </Modal>
    );
};

export default Plataforms;
