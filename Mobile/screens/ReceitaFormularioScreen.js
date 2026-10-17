
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ReceitaFormularioScreen({ navigation }) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [modoPreparo, setModoPreparo] = useState('');
  const [tempoPreparo, setTempoPreparo] = useState('');
  const [rendimento, setRendimento] = useState('');
  const [imagens, setImagens] = useState([]);

  async function selecionarImagens() {
    if (imagens.length >= 5) {
      Alert.alert(
        'Limite atingido',
        'Você pode selecionar até 5 imagens.'
      );
      return;
    }

    const permissao =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissao.granted) {
      Alert.alert(
        'Permissão necessária',
        'Permita o acesso à galeria para selecionar imagens.'
      );
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      selectionLimit: 5 - imagens.length,
      quality: 0.8,
    });

    if (!resultado.canceled) {
      const novasImagens = resultado.assets.map((item) => item.uri);

      setImagens((anteriores) =>
        [...anteriores, ...novasImagens].slice(0, 5)
      );
    }
  }

  function removerImagem(uri) {
    setImagens((anteriores) =>
      anteriores.filter((imagem) => imagem !== uri)
    );
  }

  function validarFormulario() {
    if (titulo.trim().length < 3) {
      Alert.alert(
        'Título inválido',
        'Informe um nome com pelo menos 3 caracteres.'
      );
      return;
    }

    if (!ingredientes.trim()) {
      Alert.alert(
        'Ingredientes obrigatórios',
        'Informe os ingredientes da receita.'
      );
      return;
    }

    if (modoPreparo.trim().length < 10) {
      Alert.alert(
        'Modo de preparo',
        'Descreva o preparo com pelo menos 10 caracteres.'
      );
      return;
    }

    Alert.alert(
      'Formulário validado',
      'Os dados foram preenchidos corretamente. O envio ao servidor será implementado na integração com o backend.',
      [
        {
          text: 'Voltar',
          onPress: () => navigation.goBack(),
        },
        {
          text: 'Continuar editando',
          style: 'cancel',
        },
      ]
    );
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
          Registrar receita
        </Text>

        <View style={styles.espacador} />
      </View>

      <ScrollView
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.tituloPagina}>
          Compartilhe seu prato
        </Text>

        <Text style={styles.subtitulo}>
          Preencha as informações para apresentar sua receita
          à comunidade Safe Bite.
        </Text>

        <View style={styles.aviso}>
          <Text style={styles.avisoTitulo}>
            Segurança alimentar
          </Text>

          <Text style={styles.avisoTexto}>
            Informe os ingredientes corretamente. As restrições
            e possíveis incompatibilidades serão verificadas
            quando a integração com o servidor estiver pronta.
          </Text>
        </View>

        <View style={styles.cartao}>
          <Text style={styles.tituloSecao}>
            Informações básicas
          </Text>

          <Text style={styles.label}>Nome da receita *</Text>

          <TextInput
            style={styles.input}
            value={titulo}
            onChangeText={setTitulo}
            placeholder="Ex.: Panqueca de banana"
            placeholderTextColor="#9CA3AF"
            maxLength={100}
          />

          <Text style={styles.label}>Descrição</Text>

          <TextInput
            style={[styles.input, styles.textAreaCurta]}
            value={descricao}
            onChangeText={setDescricao}
            placeholder="Conte um pouco sobre o prato"
            placeholderTextColor="#9CA3AF"
            multiline
            maxLength={500}
            textAlignVertical="top"
          />

          <Text style={styles.label}>Tempo de preparo</Text>

          <TextInput
            style={styles.input}
            value={tempoPreparo}
            onChangeText={setTempoPreparo}
            placeholder="Ex.: 30 minutos"
            placeholderTextColor="#9CA3AF"
            maxLength={50}
          />

          <Text style={styles.label}>Rendimento</Text>

          <TextInput
            style={styles.input}
            value={rendimento}
            onChangeText={setRendimento}
            placeholder="Ex.: 4 porções"
            placeholderTextColor="#9CA3AF"
            maxLength={50}
          />
        </View>

        <View style={styles.cartao}>
          <Text style={styles.tituloSecao}>
            Ingredientes
          </Text>

          <Text style={styles.instrucao}>
            Escreva um ingrediente por linha, incluindo as quantidades.
          </Text>

          <TextInput
            style={[styles.input, styles.textAreaGrande]}
            value={ingredientes}
            onChangeText={setIngredientes}
            placeholder={'2 bananas\n1 ovo\n4 colheres de aveia'}
            placeholderTextColor="#9CA3AF"
            multiline
            textAlignVertical="top"
          />
        </View>

        <View style={styles.cartao}>
          <Text style={styles.tituloSecao}>
            Modo de preparo
          </Text>

          <Text style={styles.instrucao}>
            Descreva as etapas na ordem em que devem ser realizadas.
          </Text>

          <TextInput
            style={[styles.input, styles.textAreaPreparo]}
            value={modoPreparo}
            onChangeText={setModoPreparo}
            placeholder={
              '1. Amasse as bananas.\n2. Misture os ingredientes.\n3. Prepare em uma frigideira.'
            }
            placeholderTextColor="#9CA3AF"
            multiline
            textAlignVertical="top"
          />
        </View>

        <View style={styles.cartao}>
          <Text style={styles.tituloSecao}>
            Imagens da receita
          </Text>

          <Text style={styles.instrucao}>
            Selecione até 5 imagens da galeria do celular.
          </Text>

          <TouchableOpacity
            style={styles.botaoImagem}
            onPress={selecionarImagens}
            activeOpacity={0.8}
          >
            <Text style={styles.textoBotaoImagem}>
              Selecionar imagens ({imagens.length}/5)
            </Text>
          </TouchableOpacity>

          {imagens.length > 0 && (
            <View style={styles.gradeImagens}>
              {imagens.map((uri, index) => (
                <View key={uri} style={styles.itemImagem}>
                  <Image
                    source={{ uri }}
                    style={styles.previewImagem}
                  />

                  <TouchableOpacity
                    style={styles.botaoRemoverImagem}
                    onPress={() => removerImagem(uri)}
                    accessibilityRole="button"
                    accessibilityLabel={`Remover imagem ${index + 1}`}
                  >
                    <Text style={styles.textoRemoverImagem}>×</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        <TouchableOpacity
          style={styles.botaoSalvar}
          onPress={validarFormulario}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotaoSalvar}>
            Validar receita
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoCancelar}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotaoCancelar}>
            Cancelar
          </Text>
        </TouchableOpacity>

        <Text style={styles.rodape}>
          * Campos obrigatórios
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
    paddingBottom: 40,
  },

  tituloPagina: {
    fontSize: 25,
    fontWeight: '800',
    color: '#1A1A1A',
    marginTop: 8,
  },

  subtitulo: {
    color: '#6B7280',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
    marginBottom: 20,
  },

  aviso: {
    backgroundColor: '#FFF7E8',
    borderColor: '#F3D8A7',
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
    marginBottom: 18,
  },

  avisoTitulo: {
    color: '#8A5A0A',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 6,
  },

  avisoTexto: {
    color: '#795D32',
    fontSize: 12,
    lineHeight: 19,
  },

  cartao: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ECECEC',
    padding: 17,
    marginBottom: 17,
  },

  tituloSecao: {
    color: '#222222',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 17,
  },

  label: {
    color: '#374151',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
  },

  input: {
    minHeight: 48,
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingVertical: 12,
    color: '#262626',
    fontSize: 14,
    marginBottom: 17,
  },

  textAreaCurta: {
    minHeight: 90,
  },

  textAreaGrande: {
    minHeight: 150,
  },

  textAreaPreparo: {
    minHeight: 190,
  },

  instrucao: {
    color: '#6B7280',
    fontSize: 12,
    lineHeight: 19,
    marginTop: -7,
    marginBottom: 14,
  },

  botaoImagem: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: '#F5A623',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },

  textoBotaoImagem: {
    color: '#A66B0A',
    fontSize: 13,
    fontWeight: '700',
  },

  gradeImagens: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 15,
  },

  itemImagem: {
    width: '30%',
    aspectRatio: 1,
    position: 'relative',
  },

  previewImagem: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#EEEEEE',
  },

  botaoRemoverImagem: {
    position: 'absolute',
    right: 4,
    top: 4,
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textoRemoverImagem: {
    color: '#DC2626',
    fontSize: 22,
    lineHeight: 24,
  },

  botaoSalvar: {
    minHeight: 51,
    borderRadius: 11,
    backgroundColor: '#F5A623',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },

  textoBotaoSalvar: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },

  botaoCancelar: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },

  textoBotaoCancelar: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '700',
  },

  rodape: {
    color: '#9CA3AF',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 10,
  },
});
