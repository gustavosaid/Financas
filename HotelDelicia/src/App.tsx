

// Importe os seus componentes de formulário
// (Estes ficheiros devem estar na mesma pasta src)
import CadastroReceita from './components/Receita/CadastroReceita'; 
import CadastroDespesas from './components/Despesa/CadastroDespesas'; 

// Importe os estilos do menu
import './App.css'; 

// Importe os estilos dos seus formulários (para que funcionem quando renderizados)
import './components/Despesa/CadastroDespesas.css';
import './components/Receita/CadastroReceita.css';
import { useState } from 'react';

// Define os possíveis "estados de página"
type Pagina = 'menu' | 'receita' | 'despesa';

/**
 * Este é o seu componente principal.
 * Ele decide qual "página" mostrar.
 */
function App() {
  // O estado 'paginaAtual' começa em 'menu'
  const [paginaAtual, setPaginaAtual] = useState<Pagina>('menu');

  // Função para renderizar a página correta
  const renderPagina = () => {
    switch (paginaAtual) {
      // Caso 1: Mostrar o formulário de Receita
      case 'receita':
        return <CadastroReceita onVoltar={() => setPaginaAtual('menu')} />;
      
      // Caso 2: Mostrar o formulário de Despesa
      case 'despesa':
        return <CadastroDespesas onVoltar={() => setPaginaAtual('menu')} />;

      // Caso Padrão (e inicial): Mostrar o Menu
      case 'menu':
      default:
        return (
          <div className="menu-container">
            <h1>Gestão Financeira</h1>
            <h2>Hotel Delícia</h2>
            <p>Selecione uma ação:</p>
            <div className="menu-botoes">
              <button 
                className="menu-botao" 
                onClick={() => setPaginaAtual('receita')}
              >
                Cadastrar Receita
              </button>
              <button 
                className="menu-botao" 
                onClick={() => setPaginaAtual('despesa')}
              >
                Cadastrar Despesa
              </button>
            </div>
          </div>
        );
    }
  };

  // O App renderiza o resultado da função
  return (
    <div className="app-container">
      {renderPagina()}
    </div>
  );
}

export default App;
