
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';

const publicacoesDemo = [
  {
    id: '1',
    autor: 'Mariana Costa',
    iniciais: 'MC',
    titulo: 'Panqueca de banana e aveia',
    descricao:
      'Uma opção prática para o café da manhã, feita com poucos ingredientes.',
    categoria: 'Café da manhã',
    ingredientes: ['Banana', 'Aveia', 'Ovo'],
  },
  {
    id: '2',
    autor: 'Lucas Ferreira',
    iniciais: 'LF',
    titulo: 'Bolo caseiro de cenoura',
    descricao:
      'Receita caseira para compartilhar com a família no lanche da tarde.',
    categoria: 'Lanche',
    ingredientes: ['Cenoura', 'Farinha de trigo', 'Ovo'],
  },
  {
    id: '3',
    autor: 'Ana Oliveira',
    iniciais: 'AO',
    titulo: 'Salada colorida',
    descricao:
      'Uma combinação simples de vegetais para acompanhar suas refeições.',
    categoria: 'Almoço',
    ingredientes: ['Alface', 'Tomate', 'Cenoura'],
  },
];

export default function PublicacoesScreen({ navigation }) {
  const [busca, setBusca] = useState('');

  const publicacoesFiltradas = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    if (!termo) {
      return publicacoesDemo;
    }

    return publicacoesDemo.filter((publicacao) => {
      return (
        publicacao.titulo.toLowerCase().includes(termo) ||
        publicacao.autor.toLowerCase().includes(termo) ||
        publicacao.categoria.toLowerCase().includes(termo)
      );
    });
  }, [busca]);

  function abrirFormulario() {
    navigation.navigate('ReceitaFormulario');
  }

  function abrirReceita(publicacao) {
    navigation.navigate('ReceitaDetalhe', {
      receita: {
        titulo: publicacao.titulo,
        descricao: publicacao.descricao,
        ingredientes: publicacao.ingredientes,
        modoPreparo: [],
      },
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />

      <View style={styles.cabecalho}>
        <View>
          <Text style={styles.tituloPagina}>Publicações</Text>
          <Text style={styles.subtitulo}>
            Receitas compartilhadas pela comunidade
          </Text>
        </View>

        <TouchableOpacity
          style={styles.botaoAdicionar}
          onPress={abrirFormulario}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Registrar nova receita"
        >
          <Text style={styles.simboloAdicionar}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.conteudo}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.banner}>
          <Text style={styles.bannerTitulo}>
            Compartilhe suas receitas
          </Text>

          <Text style={styles.bannerDescricao}>
            Publique seus pratos e ajude outras pessoas a descobrir
            novas opções para o dia a dia.
          </Text>

          <TouchableOpacity
            style={styles.botaoPublicar}
            onPress={abrirFormulario}
            activeOpacity={0.8}
          >
            <Text style={styles.textoBotaoPublicar}>
              Registrar receita
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.tituloSecao}>
          Explorar publicações
        </Text>

        <View style={styles.buscaContainer}>
          <TextInput
            style={styles.inputBusca}
            placeholder="Buscar por receita, autor ou categoria"
            placeholderTextColor="#9CA3AF"
            value={busca}
            onChangeText={setBusca}
            returnKeyType="search"
          />

          {busca.length > 0 && (
            <TouchableOpacity onPress={() => setBusca('')}>
              <Text style={styles.limparBusca}>Limpar</Text>
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.quantidade}>
          {publicacoesFiltradas.length}{' '}
          {publicacoesFiltradas.length === 1
            ? 'publicação encontrada'
            : 'publicações encontradas'}
        </Text>

        {publicacoesFiltradas.length > 0 ? (
          publicacoesFiltradas.map((publicacao) => (
            <TouchableOpacity
              key={publicacao.id}
              style={styles.cartao}
              onPress={() => abrirReceita(publicacao)}
              activeOpacity={0.85}
            >
              <View style={styles.autorLinha}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarTexto}>
                    {publicacao.iniciais}
                  </Text>
                </View>

                <View style={styles.autorInfo}>
                  <Text style={styles.nomeAutor}>
                    {publicacao.autor}
                  </Text>

                  <Text style={styles.categoria}>
                    {publicacao.categoria}
                  </Text>
                </View>
              </View>

              <View style={styles.imagemPlaceholder}>
                <Text style={styles.iniciaisReceita}>
                  {publicacao.titulo
                    .split(' ')
                    .slice(0, 2)
                    .map((palavra) => palavra[0])
                    .join('')
                    .toUpperCase()}
                </Text>
              </View>

              <View style={styles.cartaoConteudo}>
                <Text style={styles.tituloReceita}>
                  {publicacao.titulo}
                </Text>

                <Text style={styles.descricaoReceita}>
                  {publicacao.descricao}
                </Text>

                <View style={styles.rodapeCartao}>
                  <Text style={styles.textoIngredientes}>
                    {publicacao.ingredientes.length} ingredientes
                  </Text>

                  <Text style={styles.linkDetalhes}>
                    Ver detalhes
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.vazio}>
            <Text style={styles.vazioTitulo}>
              Nenhuma publicação encontrada
            </Text>

            <Text style={styles.vazioDescricao}>
              Tente pesquisar por outro nome ou categoria.
            </Text>

            <TouchableOpacity onPress={() => setBusca('')}>
              <Text style={styles.linkLimpar}>
                Limpar pesquisa
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.rodape}>
          Safe Bite — Compartilhe com responsabilidade.
        </Text>
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
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  tituloPagina: {
    fontSize: 25,
    fontWeight: '800',
    color: '#1A1A1A',
  },

  subtitulo: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 5,
  },

  botaoAdicionar: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#F5A623',
    alignItems: 'center',
    justifyContent: 'center',
  },

  simboloAdicionar: {
    fontSize: 30,
    color: '#FFFFFF',
    lineHeight: 34,
  },

  conteudo: {
    padding: 18,
    paddingBottom: 35,
  },

  banner: {
    backgroundColor: '#FFF0D4',
    borderRadius: 18,
    padding: 20,
    marginBottom: 26,
  },

  bannerTitulo: {
    fontSize: 21,
    fontWeight: '800',
    color: '#262626',
    marginBottom: 9,
  },

  bannerDescricao: {
    fontSize: 13,
    color: '#6B5A3E',
    lineHeight: 20,
    marginBottom: 18,
  },

  botaoPublicar: {
    alignSelf: 'flex-start',
    backgroundColor: '#F5A623',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
  },

  textoBotaoPublicar: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  tituloSecao: {
    fontSize: 19,
    fontWeight: '800',
    color: '#222222',
    marginBottom: 15,
  },

  buscaContainer: {
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 13,
    marginBottom: 13,
  },

  inputBusca: {
    flex: 1,
    fontSize: 13,
    color: '#262626',
    paddingVertical: 13,
  },

  limparBusca: {
    color: '#B77912',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 8,
  },

  quantidade: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 14,
  },

  cartao: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 16,
    marginBottom: 18,
    overflow: 'hidden',
  },

  autorLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#E7F6EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  avatarTexto: {
    color: '#16803D',
    fontWeight: '800',
    fontSize: 12,
  },

  autorInfo: {
    flex: 1,
  },

  nomeAutor: {
    color: '#262626',
    fontSize: 13,
    fontWeight: '700',
  },

  categoria: {
    color: '#6B7280',
    fontSize: 11,
    marginTop: 4,
  },

  imagemPlaceholder: {
    height: 145,
    backgroundColor: '#FFF0D4',
    alignItems: 'center',
    justifyContent: 'center',
  },

  iniciaisReceita: {
    color: '#B77912',
    fontSize: 35,
    fontWeight: '800',
  },

  cartaoConteudo: {
    padding: 16,
  },

  tituloReceita: {
    color: '#222222',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 8,
  },

  descricaoReceita: {
    color: '#6B7280',
    fontSize: 13,
    lineHeight: 20,
  },

  rodapeCartao: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    marginTop: 15,
    paddingTop: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  textoIngredientes: {
    color: '#6B7280',
    fontSize: 11,
  },

  linkDetalhes: {
    color: '#16803D',
    fontSize: 12,
    fontWeight: '700',
  },

  vazio: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 24,
    alignItems: 'center',
  },

  vazioTitulo: {
    color: '#262626',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },

  vazioDescricao: {
    color: '#6B7280',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 19,
  },

  linkLimpar: {
    color: '#16803D',
    fontWeight: '700',
    fontSize: 13,
    marginTop: 15,
  },

  rodape: {
    color: '#9CA3AF',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 12,
  },
});
