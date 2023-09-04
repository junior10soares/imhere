import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";
import { Participant } from "../../components/Participant";
import { useState } from "react";

export function Home() {
    const [participants, setParticipants] = useState<string[]>([])
    const [participantName, setParticipantName] = useState('')

    function handleParticipantAdd() {
        if (participants.includes(participantName)) {//verificar se esse nome ja tem no array
            return Alert.alert('Participante existe', 'Já existe um participante com esse nome')
        }
        if (participantName.length <= 0) {
            return Alert.alert('Campo vazio', 'Digite algo no campo')
        }
        setParticipants(prevState => [...prevState, participantName])
        setParticipantName('')
    }

    function handleParticipantRemove(name: string) {
        Alert.alert('Remover', `Remover o participante ${name}?`, [

            {
                text: 'Sim',
                onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))//deletar participant
            },
            {
                text: 'Não',
                style: 'cancel'
            }
        ])
    }
    return (
        <View style={styles.container}>
            <Text style={styles.eventName}>Nome do evento</Text>

            <Text style={styles.eventDate}>Sexta, 4 de novembro de 2022</Text>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome do participante"
                    placeholderTextColor='#6b6b6b'
                    onChangeText={setParticipantName}
                    value={participantName}
                />

                <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={participants}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Participant
                        key={item}
                        name={item}
                        onRemove={() => handleParticipantRemove(item)}
                    />
                )}
                showsHorizontalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <Text style={styles.listEmptyText}>
                        Ninguém chegou no evento ainda? Adicione participantes a sua lista!
                    </Text>
                )}
            />
        </View>
    )
}