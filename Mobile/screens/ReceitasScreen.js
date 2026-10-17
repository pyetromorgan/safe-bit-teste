
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

const receitasDemo = [
  {
    id: 'demo-1',
    titulo: 'Panqueca de banana',
    descricao: 'Uma opção simples para o café da manhã.',
    imagem_url: null,
  },
  {
    id: 'demo-2',
    titulo: 'Salada colorida',
    descricao: 'Uma combinação de vegetais frescos.',
    imagem_url: null,
  },
  {
    id: 'demo-3',
    titulo: 'Creme de abacate',
    descricao: 'Uma preparação cremosa e fácil.',
    imagem_url: null,
  },
];

export default function ReceitasScreen({ navigation }) {
  const [pesquisa, setPesquisa] = useState('');
  const [carregando] = useState(false);
  const [modoDemo] = useState(true);

  const receitas = useMemo(() => {
    const termo = pesquisa.trim().toLowerCase();

    if (!termo) return receitasDemo;

    return receitasDemo.filter((receita) => {
      const titulo = receita.titulo.toLowerCase();
      const descricao = (receita.descricao || '').toLowerCase();

      return titulo.includes(termo) || descricao.includes(termo);
    });
  }, [pesquisa]);

  function abrirReceita(receita) {
    navigation.navigate('ReceitaDetalhe', {
      receita,
      receitaId: receita.id,
    });
  }

  function limparPesquisa() {
    setPesquisa('');
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />

      <View style={styles.cabecalho}>
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <Text style={styles.textoVoltar}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.tituloCabecalho}>
          Receitas
        </Text>

        <View style={styles.espacador} />
      </View>

      <ScrollView
        contentContainerStyle={styles.conteudo}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.introducao}>
          <Text style={styles.titulo}>
            Encontre sua próxima receita
          </Text>

          <Text style={styles.subtitulo}>
            Pesquise pelo nome do prato ou explore as receitas
            disponíveis.
          </Text>
        </View>

        <View style={styles.pesquisaContainer}>
          <Text style={styles.simboloPesquisa}>⌕</Text>

          <TextInput
            style={styles.inputPesquisa}
            placeholder="Buscar receita"
            placeholderTextColor="#9CA3AF"
            value={pesquisa}
            onChangeText={setPesquisa}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
          />

          {pesquisa.length > 0 && (
            <TouchableOpacity
              onPress={limparPesquisa}
              accessibilityRole="button"
              accessibilityLabel="Limpar pesquisa"
            >
              <Text style={styles.limpar}>Limpar</Text>
            </TouchableOpacity>
          )}
        </View>

        {modoDemo && (
          <View style={styles.avisoDemo}>
            <Text style={styles.tituloAviso}>
              Modo de demonstração
            </Text>

            <Text style={styles.textoAviso}>
              As receitas abaixo são exemplos visuais. Ainda não
              foram carregadas do servidor e não tiveram sua
              compatibilidade com restrições alimentares verificada.
            </Text>
          </View>
        )}

        <View style={styles.tituloListaContainer}>
          <Text style={styles.tituloLista}>
            {pesquisa.trim()
              ? 'Resultados da pesquisa'
              : 'Receitas disponíveis'}
          </Text>

          <Text style={styles.contagem}>
            {receitas.length}
          </Text>
        </View>

        {carregando ? (
          <View style={styles.estado}>
            <ActivityIndicator size="large" color="#F5A623" />
            <Text style={styles.textoEstado}>
              Carregando receitas...
            </Text>
          </View>
        ) : receitas.length > 0 ? (
          receitas.map((receita) => (
            <TouchableOpacity
              key={receita.id}
              style={styles.cardReceita}
              onPress={() => abrirReceita(receita)}
              activeOpacity={0.8}
            >
              <View style={styles.imagemContainer}>
                {receita.imagem_url ? (
                  <Image
                    source={{ uri: receita.imagem_url }}
                    style={styles.imagemReceita}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.imagemPlaceholder}>
                    <Text style={styles.iniciais}>
                      {receita.titulo
                        .split(' ')
                        .slice(0, 2)
                        .map((palavra) => palavra[0])
                        .join('')
                        .toUpperCase()}
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.dadosReceita}>
                <Text style={styles.nomeReceita}>
                  {receita.titulo || receita.nome || 'Receita sem título'}
                </Text>

                {!!receita.descricao && (
                  <Text style={styles.descricaoReceita}>
                    {receita.descricao.length > 90
                      ? `${receita.descricao.substring(0, 90)}...`
                      : receita.descricao}
                  </Text>
                )}

                <Text style={styles.linkDetalhes}>
                  Ver receita  ›
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.semResultados}>
            <Text style={styles.tituloSemResultados}>
              Nenhuma receita encontrada
            </Text>

            <Text style={styles.textoSemResultados}>
              Não encontramos receitas para "{pesquisa}".
              Tente outro termo de pesquisa.
            </Text>

            <TouchableOpacity
              style={styles.botaoLimpar}
              onPress={limparPesquisa}
            >
              <Text style={styles.textoBotaoLimpar}>
                Limpar pesquisa
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },

  cabecalho: {
    height: 60,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },

  botaoVoltar: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textoVoltar: {
    fontSize: 34,
    color: '#333333',
    lineHeight: 38,
  },

  tituloCabecalho: {
    fontSize: 17,
    fontWeight: '700',
    color: '#222222',
  },

  espacador: {
    width: 38,
  },

  conteudo: {
    padding: 18,
    paddingBottom: 36,
  },

  introducao: {
    marginTop: 8,
    marginBottom: 22,
  },

  titulo: {
    fontSize: 25,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 9,
  },

  subtitulo: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 21,
  },

  pesquisaContainer: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E1E4E8',
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 20,
  },

  simboloPesquisa: {
    fontSize: 25,
    color: '#9CA3AF',
    marginRight: 10,
  },

  inputPesquisa: {
    flex: 1,
    minHeight: 50,
    fontSize: 14,
    color: '#1A1A1A',
  },

  limpar: {
    fontSize: 12,
    color: '#B77912',
    fontWeight: '700',
    paddingLeft: 8,
  },

  avisoDemo: {
    backgroundColor: '#FFF7E8',
    borderWidth: 1,
    borderColor: '#F3D8A7',
    borderRadius: 12,
    padding: 14,
    marginBottom: 22,
  },

  tituloAviso: {
    color: '#8A5A0A',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6,
  },

  textoAviso: {
    color: '#795D32',
    fontSize: 12,
    lineHeight: 18,
  },

  tituloListaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  tituloLista: {
    fontSize: 17,
    fontWeight: '700',
    color: '#262626',
  },

  contagem: {
    color: '#6B7280',
    fontSize: 13,
  },

  cardReceita: {
    flexDirection: 'row',
    minHeight: 132,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ECECEC',
    padding: 12,
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },

  imagemContainer: {
    width: 100,
    minHeight: 106,
    marginRight: 13,
  },

  imagemReceita: {
    width: '100%',
    height: '100%',
    borderRadius: 11,
  },

  imagemPlaceholder: {
    flex: 1,
    minHeight: 106,
    borderRadius: 11,
    backgroundColor: '#FFF0D4',
    alignItems: 'center',
    justifyContent: 'center',
  },

  iniciais: {
    color: '#B77912',
    fontSize: 24,
    fontWeight: '800',
  },

  dadosReceita: {
    flex: 1,
    justifyContent: 'center',
  },

  nomeReceita: {
    fontSize: 15,
    fontWeight: '700',
    color: '#252525',
    marginBottom: 7,
  },

  descricaoReceita: {
    fontSize: 12,
    color: '#777777',
    lineHeight: 18,
  },

  linkDetalhes: {
    color: '#B77912',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 12,
  },

  estado: {
    padding: 30,
    alignItems: 'center',
  },

  textoEstado: {
    color: '#6B7280',
    fontSize: 13,
    marginTop: 12,
  },

  semResultados: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },

  tituloSemResultados: {
    fontSize: 16,
    fontWeight: '700',
    color: '#262626',
    textAlign: 'center',
    marginBottom: 8,
  },

  textoSemResultados: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 20,
    textAlign: 'center',
  },

  botaoLimpar: {
    marginTop: 18,
    backgroundColor: '#F5A623',
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 10,
  },

  textoBotaoLimpar: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
