
import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';

function transformarLista(valor) {
  if (Array.isArray(valor)) {
    return valor;
  }

  if (typeof valor !== 'string' || !valor.trim()) {
    return [];
  }

  try {
    const resultado = JSON.parse(valor);

    if (Array.isArray(resultado)) {
      return resultado;
    }
  } catch (error) {
    // O conteúdo também pode ser texto separado por linhas.
  }

  return valor
    .split(/\r?\n|;/)
    .map((item) => item.replace(/^[-•*]\s*/, '').trim())
    .filter(Boolean);
}

export default function ReceitaDetalheScreen({ navigation, route }) {
  const receita = route?.params?.receita || {};

  const titulo =
    receita.titulo || receita.nome || 'Detalhes da receita';

  const descricao = receita.descricao || '';

  const ingredientes = transformarLista(receita.ingredientes);

  const modoPreparo = transformarLista(
    receita.modoPreparo || receita.modo_preparo
  );

  const tempo = receita.tempo;

  const tempoPreparo =
    typeof tempo === 'object' && tempo !== null
      ? tempo.preparo
      : tempo || receita.tempo_preparo;

  const rendimento =
    typeof tempo === 'object' && tempo !== null
      ? tempo.rendimento
      : receita.rendimento;

  const imagemUrl = receita.imagem_url || receita.imagem;

  function voltar() {
    navigation.goBack();
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
          onPress={voltar}
          accessibilityRole="button"
          accessibilityLabel="Voltar para receitas"
        >
          <Text style={styles.textoVoltar}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.tituloCabecalho}>
          Detalhes da receita
        </Text>

        <View style={styles.espacador} />
      </View>

      <ScrollView
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >
        {imagemUrl ? (
          <Image
            source={{ uri: imagemUrl }}
            style={styles.imagem}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imagemPlaceholder}>
            <Text style={styles.iniciais}>
              {titulo
                .split(' ')
                .slice(0, 2)
                .map((palavra) => palavra[0])
                .join('')
                .toUpperCase()}
            </Text>
          </View>
        )}

        <View style={styles.introducao}>
          <Text style={styles.tituloReceita}>
            {titulo}
          </Text>

          {!!descricao && (
            <Text style={styles.descricao}>
              {descricao}
            </Text>
          )}
        </View>

        <View style={styles.aviso}>
          <Text style={styles.tituloAviso}>
            Atenção às restrições alimentares
          </Text>

          <Text style={styles.textoAviso}>
            Confira os ingredientes e os rótulos dos produtos antes
            de preparar ou consumir esta receita. A compatibilidade
            com suas restrições ainda não foi confirmada pelo sistema.
          </Text>
        </View>

        {(tempoPreparo || rendimento) && (
          <View style={styles.informacoesTempo}>
            {tempoPreparo && (
              <View style={styles.itemTempo}>
                <Text style={styles.labelTempo}>
                  Tempo de preparo
                </Text>

                <Text style={styles.valorTempo}>
                  {String(tempoPreparo)}
                </Text>
              </View>
            )}

            {rendimento && (
              <View style={styles.itemTempo}>
                <Text style={styles.labelTempo}>
                  Rendimento
                </Text>

                <Text style={styles.valorTempo}>
                  {String(rendimento)}
                </Text>
              </View>
            )}
          </View>
        )}

        <View style={styles.cartao}>
          <Text style={styles.tituloSecao}>
            Ingredientes
          </Text>

          {ingredientes.length > 0 ? (
            ingredientes.map((ingrediente, index) => (
              <View key={`${index}-${ingrediente}`} style={styles.itemLista}>
                <View style={styles.marcador} />

                <Text style={styles.textoLista}>
                  {String(ingrediente)}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.textoVazio}>
              Os ingredientes não estão disponíveis nesta demonstração.
            </Text>
          )}
        </View>

        <View style={styles.cartao}>
          <Text style={styles.tituloSecao}>
            Modo de preparo
          </Text>

          {modoPreparo.length > 0 ? (
            modoPreparo.map((passo, index) => (
              <View key={index} style={styles.passo}>
                <View style={styles.numeroPasso}>
                  <Text style={styles.textoNumeroPasso}>
                    {index + 1}
                  </Text>
                </View>

                <Text style={styles.textoPasso}>
                  {String(passo).replace(/^\d+[.)]\s*/, '')}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.textoVazio}>
              O modo de preparo ainda não está disponível nesta demonstração.
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.botaoVoltarReceitas}
          onPress={voltar}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotao}>
            Voltar para receitas
          </Text>
        </TouchableOpacity>

        <Text style={styles.rodape}>
          Safe Bite — Alimentação com mais segurança.
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
    fontSize: 16,
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

  imagem: {
    width: '100%',
    height: 220,
    borderRadius: 16,
    backgroundColor: '#EEEEEE',
  },

  imagemPlaceholder: {
    width: '100%',
    height: 190,
    borderRadius: 16,
    backgroundColor: '#FFF0D4',
    alignItems: 'center',
    justifyContent: 'center',
  },

  iniciais: {
    fontSize: 42,
    fontWeight: '800',
    color: '#B77912',
  },

  introducao: {
    marginTop: 22,
    marginBottom: 20,
  },

  tituloReceita: {
    fontSize: 27,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 10,
  },

  descricao: {
    fontSize: 14,
    lineHeight: 21,
    color: '#6B7280',
  },

  aviso: {
    backgroundColor: '#FFF7E8',
    borderColor: '#F3D8A7',
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
    marginBottom: 18,
  },

  tituloAviso: {
    fontSize: 13,
    fontWeight: '700',
    color: '#8A5A0A',
    marginBottom: 7,
  },

  textoAviso: {
    fontSize: 12,
    lineHeight: 19,
    color: '#795D32',
  },

  informacoesTempo: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18,
  },

  itemTempo: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    padding: 14,
  },

  labelTempo: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 7,
  },

  valorTempo: {
    fontSize: 14,
    fontWeight: '700',
    color: '#262626',
  },

  cartao: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ECECEC',
    padding: 18,
    marginBottom: 16,
  },

  tituloSecao: {
    fontSize: 19,
    fontWeight: '800',
    color: '#262626',
    marginBottom: 18,
  },

  itemLista: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },

  marcador: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#F5A623',
    marginTop: 7,
    marginRight: 11,
  },

  textoLista: {
    flex: 1,
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 21,
  },

  passo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 18,
  },

  numeroPasso: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFF0D4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  textoNumeroPasso: {
    fontSize: 13,
    fontWeight: '800',
    color: '#B77912',
  },

  textoPasso: {
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
    color: '#4B5563',
    paddingTop: 4,
  },

  textoVazio: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 20,
  },

  botaoVoltarReceitas: {
    backgroundColor: '#F5A623',
    minHeight: 50,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },

  textoBotao: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  rodape: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 11,
    marginTop: 22,
  },
});
