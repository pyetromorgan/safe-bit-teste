
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';

const restricoesDisponiveis = [
  {
    id: 'lactose',
    titulo: 'Intolerância à lactose',
    descricao: 'Leite e derivados que contenham lactose',
    categoria: 'Intolerâncias',
  },
  {
    id: 'gluten',
    titulo: 'Glúten',
    descricao: 'Trigo, cevada, centeio e derivados',
    categoria: 'Intolerâncias',
  },
  {
    id: 'amendoim',
    titulo: 'Amendoim',
    descricao: 'Amendoim e produtos derivados',
    categoria: 'Alergias',
  },
  {
    id: 'castanhas',
    titulo: 'Castanhas e nozes',
    descricao: 'Castanhas, nozes e outras oleaginosas',
    categoria: 'Alergias',
  },
  {
    id: 'ovo',
    titulo: 'Ovos',
    descricao: 'Ovos e ingredientes derivados',
    categoria: 'Alergias',
  },
  {
    id: 'leite',
    titulo: 'Proteínas do leite',
    descricao: 'Proteínas como caseína e whey protein',
    categoria: 'Alergias',
  },
  {
    id: 'soja',
    titulo: 'Soja',
    descricao: 'Soja e produtos derivados',
    categoria: 'Alergias',
  },
  {
    id: 'frutos_mar',
    titulo: 'Peixes e frutos do mar',
    descricao: 'Peixes, crustáceos e moluscos',
    categoria: 'Alergias',
  },
];

export default function RestricoesScreen({ navigation }) {
  const [selecionadas, setSelecionadas] = useState([]);

  function alternarRestricao(id) {
    setSelecionadas((atuais) =>
      atuais.includes(id)
        ? atuais.filter((item) => item !== id)
        : [...atuais, id]
    );
  }

  function salvarRestricoes() {
    Alert.alert(
      'Restrições selecionadas',
      selecionadas.length > 0
        ? `Você selecionou ${selecionadas.length} restrição(ões). O salvamento no banco de dados será implementado na integração com o backend.`
        : 'Nenhuma restrição foi selecionada. O salvamento no banco de dados será implementado posteriormente.'
    );
  }

  function renderizarGrupo(categoria) {
    const itens = restricoesDisponiveis.filter(
      (item) => item.categoria === categoria
    );

    return (
      <View style={styles.section} key={categoria}>
        <Text style={styles.sectionTitle}>{categoria}</Text>

        {itens.map((item) => {
          const selecionada = selecionadas.includes(item.id);

          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.restricaoCard,
                selecionada && styles.restricaoSelecionada,
              ]}
              activeOpacity={0.8}
              onPress={() => alternarRestricao(item.id)}
            >
              <View
                style={[
                  styles.checkbox,
                  selecionada && styles.checkboxAtivo,
                ]}
              >
                {selecionada && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>

              <View style={styles.restricaoInfo}>
                <Text style={styles.restricaoTitulo}>
                  {item.titulo}
                </Text>

                <Text style={styles.restricaoDescricao}>
                  {item.descricao}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#FFFFFF"
        barStyle="dark-content"
      />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Restrições alimentares
        </Text>

        <View style={styles.headerSpace} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.introCard}>
          <Text style={styles.introTitle}>
            Personalize sua alimentação
          </Text>

          <Text style={styles.introDescription}>
            Selecione as alergias ou intolerâncias que deseja
            considerar ao consultar receitas.
          </Text>

          <View style={styles.counterContainer}>
            <Text style={styles.counter}>
              {selecionadas.length}
            </Text>
            <Text style={styles.counterLabel}>
              {selecionadas.length === 1
                ? 'restrição selecionada'
                : 'restrições selecionadas'}
            </Text>
          </View>
        </View>

        {renderizarGrupo('Alergias')}
        {renderizarGrupo('Intolerâncias')}

        <View style={styles.warningCard}>
          <Text style={styles.warningTitle}>
            Importante sobre sua segurança
          </Text>

          <Text style={styles.warningText}>
            Esta seleção é informativa e não substitui a leitura
            dos rótulos, a verificação de contaminação cruzada ou
            a orientação de um profissional de saúde. A ausência
            de um ingrediente na descrição não garante que o
            alimento seja seguro.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={salvarRestricoes}
        >
          <Text style={styles.saveButtonText}>
            Salvar restrições
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => setSelecionadas([])}
        >
          <Text style={styles.clearButtonText}>
            Limpar seleção
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backButton: {
    width: 35,
    height: 40,
    justifyContent: 'center',
  },
  backText: {
    fontSize: 34,
    lineHeight: 38,
    color: '#1A1A1A',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  headerSpace: {
    width: 35,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  introCard: {
    backgroundColor: '#FFF3DD',
    marginHorizontal: 16,
    marginTop: 20,
    padding: 20,
    borderRadius: 16,
  },
  introTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  introDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 21,
    marginTop: 8,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 17,
  },
  counter: {
    fontSize: 23,
    fontWeight: '800',
    color: '#D88900',
    marginRight: 8,
  },
  counterLabel: {
    fontSize: 13,
    color: '#6B7280',
  },
  section: {
    marginHorizontal: 16,
    marginTop: 25,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  restricaoCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  restricaoSelecionada: {
    borderColor: '#22C55E',
    backgroundColor: '#F0FAF3',
  },
  checkbox: {
    width: 23,
    height: 23,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxAtivo: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  restricaoInfo: {
    flex: 1,
  },
  restricaoTitulo: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  restricaoDescricao: {
    fontSize: 12,
    lineHeight: 18,
    color: '#6B7280',
    marginTop: 4,
  },
  warningCard: {
    backgroundColor: '#FFFFFF',
    borderLeftWidth: 4,
    borderLeftColor: '#F5A623',
    padding: 15,
    marginHorizontal: 16,
    marginTop: 24,
    borderRadius: 10,
  },
  warningTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 7,
  },
  warningText: {
    fontSize: 12,
    lineHeight: 19,
    color: '#6B7280',
  },
  saveButton: {
    backgroundColor: '#F5A623',
    marginHorizontal: 16,
    marginTop: 22,
    height: 50,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  clearButton: {
    marginHorizontal: 16,
    marginTop: 10,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButtonText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '600',
  },
});
