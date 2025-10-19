#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🌍 Generating Tier 2 Translation Files (Fixed)');
console.log('Languages: Portuguese (Brazil), Portuguese (Portugal), Italian\n');

const enPath = path.join(__dirname, '../client/src/translations/en.ts');
const enContent = fs.readFileSync(enPath, 'utf-8');

const commonPtBR = {
  'Loading...': 'Carregando...',
  'Error': 'Erro',
  'Success': 'Sucesso',
  'Cancel': 'Cancelar',
  'Save': 'Salvar',
  'Delete': 'Excluir',
  'Edit': 'Editar',
  'Close': 'Fechar',
  'Confirm': 'Confirmar',
  'Back': 'Voltar',
  'Next': 'Próximo',
  'Submit': 'Enviar',
  'Search': 'Pesquisar',
  'Filter': 'Filtrar',
  'All': 'Todos',
  'None': 'Nenhum',
  'Yes': 'Sim',
  'No': 'Não',
  'Optional': 'Opcional',
  'Required': 'Obrigatório',
  'Learn More': 'Saiba Mais',
  'Home': 'Início',
  'About': 'Sobre',
  'Trading': 'Negociação',
  'Dashboard': 'Painel',
  'Deposits': 'Depósitos',
  'Withdrawals': 'Saques',
  'Profile': 'Perfil',
  'Settings': 'Configurações',
  'Logout': 'Sair',
  'Login': 'Entrar',
  'Register': 'Registrar',
  'Tools': 'Ferramentas',
  'Education': 'Educação',
  'Contact': 'Contato',
  'Partners': 'Parceiros',
  'FAQ': 'Perguntas Frequentes'
};

const commonPtPT = {
  'Loading...': 'A carregar...',
  'Error': 'Erro',
  'Success': 'Sucesso',
  'Cancel': 'Cancelar',
  'Save': 'Guardar',
  'Delete': 'Eliminar',
  'Edit': 'Editar',
  'Close': 'Fechar',
  'Confirm': 'Confirmar',
  'Back': 'Voltar',
  'Next': 'Próximo',
  'Submit': 'Submeter',
  'Search': 'Pesquisar',
  'Filter': 'Filtrar',
  'All': 'Todos',
  'None': 'Nenhum',
  'Yes': 'Sim',
  'No': 'Não',
  'Optional': 'Opcional',
  'Required': 'Obrigatório',
  'Learn More': 'Saiba Mais',
  'Home': 'Início',
  'About': 'Sobre',
  'Trading': 'Negociação',
  'Dashboard': 'Painel',
  'Deposits': 'Depósitos',
  'Withdrawals': 'Levantamentos',
  'Profile': 'Perfil',
  'Settings': 'Definições',
  'Logout': 'Sair',
  'Login': 'Entrar',
  'Register': 'Registar',
  'Tools': 'Ferramentas',
  'Education': 'Educação',
  'Contact': 'Contacto',
  'Partners': 'Parceiros',
  'FAQ': 'Perguntas Frequentes'
};

const commonIT = {
  'Loading...': 'Caricamento...',
  'Error': 'Errore',
  'Success': 'Successo',
  'Cancel': 'Annulla',
  'Save': 'Salva',
  'Delete': 'Elimina',
  'Edit': 'Modifica',
  'Close': 'Chiudi',
  'Confirm': 'Conferma',
  'Back': 'Indietro',
  'Next': 'Avanti',
  'Submit': 'Invia',
  'Search': 'Cerca',
  'Filter': 'Filtra',
  'All': 'Tutti',
  'None': 'Nessuno',
  'Yes': 'Sì',
  'No': 'No',
  'Optional': 'Opzionale',
  'Required': 'Obbligatorio',
  'Learn More': 'Scopri di Più',
  'Home': 'Home',
  'About': 'Chi Siamo',
  'Trading': 'Trading',
  'Dashboard': 'Pannello',
  'Deposits': 'Depositi',
  'Withdrawals': 'Prelievi',
  'Profile': 'Profilo',
  'Settings': 'Impostazioni',
  'Logout': 'Esci',
  'Login': 'Accedi',
  'Register': 'Registrati',
  'Tools': 'Strumenti',
  'Education': 'Formazione',
  'Contact': 'Contatto',
  'Partners': 'Partner',
  'FAQ': 'Domande Frequenti'
};

function generateFile(lang, exportName, translations) {
  const outputLines = [`export const ${exportName} = {`];
  
  const lines = enContent.split('\n');
  lines.forEach((line) => {
    // Copy comments and empty lines as-is
    if (line.trim().startsWith('//') || line.trim() === '') {
      outputLines.push(line);
      return;
    }
    
    // Handle closing brace
    if (line.trim() === '}' || line.trim() === '};') {
      outputLines.push(line);
      return;
    }
    
    // Match key-value pairs - capture the entire value including escaped quotes
    const match = line.match(/^(\s*)'([^']+)':\s*'(.*)'\s*,?\s*$/);
    if (match) {
      const [, indent, key, originalValue] = match;
      
      // Check if we have a translation, otherwise keep English
      let value = originalValue;
      
      // Try to translate if we have it in our common translations
      for (const [enText, translatedText] of Object.entries(translations)) {
        if (originalValue === enText) {
          value = translatedText;
          break;
        }
      }
      
      // Write the line preserving all escaping from original
      outputLines.push(`${indent}'${key}': '${value}',`);
    }
  });
  
  const outputPath = path.join(__dirname, `../client/src/translations/${lang}.ts`);
  fs.writeFileSync(outputPath, outputLines.join('\n'), 'utf-8');
  
  const keyCount = Object.keys(translations).length;
  console.log(`✅ ${lang}.ts created - ${keyCount} keys translated`);
}

generateFile('pt-BR', 'ptBR', commonPtBR);
generateFile('pt-PT', 'ptPT', commonPtPT);
generateFile('it', 'it', commonIT);

console.log('\n🎉 All Tier 2 translation files generated successfully!');
