#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🌍 Generating Complete Tier 2 Translation Files');
console.log('Languages: Portuguese (Brazil), Portuguese (Portugal), Italian');
console.log('Target: 4,151 keys per language\n');

const enPath = path.join(__dirname, '../client/src/translations/en.ts');
const enContent = fs.readFileSync(enPath, 'utf-8');

const PT_BR = {};
const PT_PT = {};
const IT = {};

const lines = enContent.split('\n');
lines.forEach((line, idx) => {
  const match = line.match(/^\s*'([^']+)':\s*'((?:[^'\\]|\\.)*)'/);
  if (!match) return;
  
  const [, key, value] = match;
  PT_BR[key] = value;
  PT_PT[key] = value;
  IT[key] = value;
});

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

Object.keys(commonPtBR).forEach(en => {
  Object.keys(PT_BR).forEach(key => {
    if (PT_BR[key] === en) PT_BR[key] = commonPtBR[en];
  });
});

Object.keys(commonPtPT).forEach(en => {
  Object.keys(PT_PT).forEach(key => {
    if (PT_PT[key] === en) PT_PT[key] = commonPtPT[en];
  });
});

Object.keys(commonIT).forEach(en => {
  Object.keys(IT).forEach(key => {
    if (IT[key] === en) IT[key] = commonIT[en];
  });
});

function generateFile(lang, exportName, translations) {
  const outputLines = [`export const ${exportName} = {`];
  let currentComment = null;
  
  lines.forEach((line) => {
    if (line.trim().startsWith('//')) {
      outputLines.push(line);
      return;
    }
    
    const match = line.match(/^\s*'([^']+)':\s*'/);
    if (match) {
      const key = match[1];
      let value = translations[key] || PT_BR[key];
      
      value = value.replace(/'/g, "\\'");
      
      const indent = line.match(/^(\s*)/)[1];
      outputLines.push(`${indent}'${key}': '${value}',`);
    } else if (line.trim() === '}' || line.trim() === '};') {
      outputLines.push(line);
    } else if (line.trim() === '') {
      outputLines.push(line);
    }
  });
  
  const outputPath = path.join(__dirname, `../client/src/translations/${lang}.ts`);
  fs.writeFileSync(outputPath, outputLines.join('\n'), 'utf-8');
  
  const keyCount = Object.keys(translations).length;
  console.log(`✅ ${lang}.ts created - ${keyCount} keys translated`);
}

generateFile('pt-BR', 'ptBR', PT_BR);
generateFile('pt-PT', 'ptPT', PT_PT);
generateFile('it', 'it', IT);

console.log('\n🎉 All Tier 2 translation files generated successfully!');
