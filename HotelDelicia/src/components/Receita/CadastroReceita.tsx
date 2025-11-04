import React, { useState } from 'react';
// Importa o CSS específico da Receita
import './CadastroReceita.css'; 

// Definindo os tipos para os dados da receita
interface Receita {
    data: string;
    valor: string;
    metodoPagamento: string;
    apartamento: string;
}

interface Props {
  onVoltar: () => void;
}

const CadastroReceita: React.FC<Props> = ({ onVoltar })=> {
    // Estados para controlar os campos do formulário
    const [data, setData] = useState<string>('');
    const [valor, setValor] = useState<string>('');
    const [metodoPagamento, setMetodoPagamento] = useState<string>('');
    const [apartamento, setApartamento] = useState<string>(''); 
    
    // Estado para controlar a mensagem de sucesso
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    // Lista de opções para o Apartamento
    const apartamentoOpcoes: string[] = [
        'Apartamento 1',
        'Apartamento 2',
        'Apartamento 3',
        'Apartamento 4',
        'Apartamento 5',        
        'Apartamento 6',        
        'Apartamento 7',        
        'Apartamento 8',        
        'Apartamento 9',
        'Apartamento 10',        
        'Apartamento 11',
        'Apartamento 12',
        'Apartamento 13',
        'Apartamento 14',
        'Apartamento 15',
        'Apartamento 16',
        'Apartamento 17',
        'Apartamento 18',
        'Apartamento 19',
        'Apartamento 20',

    ];

    // Função para lidar com o envio do formulário
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Impede o recarregamento da página
        
        const novaReceita: Receita = { 
            data, 
            valor, 
            metodoPagamento, 
            apartamento 
        };
        
        console.log('Receita cadastrada:', novaReceita);
        
        // --- LÓGICA DE API (EXEMPLO) ---
        // Descomente isto para enviar para a sua API de receitas
        /*
        try {
            const resposta = await fetch('http://localhost:4000/api/receitas', { // <-- URL da sua API
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novaReceita),
            });

            if (!resposta.ok) {
                throw new Error('Falha ao registar receita no servidor');
            }
        
            console.log('Resposta do servidor:', await resposta.json());

        } catch (error) {
            console.error("Erro ao enviar para a API:", error);
            // Aqui pode-se mostrar uma mensagem de erro
            return; // Para não limpar os campos se a API falhar
        }
        */

        // --- LÓGICA DE SUCESSO ---
        setIsSuccess(true);
        setData('');
        setValor('');
        setMetodoPagamento('');
        setApartamento('');

        // Esconder a mensagem de sucesso após 3 segundos
        setTimeout(() => {
            setIsSuccess(false);
        }, 3000);
    };

    return (
        <div className="receita-container">
            
            {/* Mensagem de Sucesso */}
            {isSuccess && (
                <div className="success-message">
                    Receita cadastrada com sucesso!
                </div>
            )}

            <header className="receita-header">
                <h2>Cadastro de Receita</h2>
            </header>
            
            <form className="receita-form" onSubmit={handleSubmit}>

                {/* Linha 1: Data e Apartamento */}
                <div className="form-row">
                    <div className="form-column">
                        <div className="form-group">
                            <label htmlFor="data">📅 Data</label>
                            <input 
                                type="date" 
                                id="data"
                                value={data}
                                onChange={(e) => setData(e.target.value)}
                                required 
                            />
                        </div>
                    </div>
                    <div className="form-column">
                        <div className="form-group">
                            <label htmlFor="apartamento">🏢 Apartamento</label>
                            <select 
                                id="apartamento"
                                value={apartamento}
                                onChange={(e) => setApartamento(e.target.value)}
                                required 
                            >
                                <option value="" disabled>Selecione um apartamento...</option>
                                {apartamentoOpcoes.map((opcao) => (
                                    <option key={opcao} value={opcao}>
                                        {opcao}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Linha 2: Valor */}
                <div className="form-row">
                     <div className="form-column">
                        <div className="form-group">
                            <label htmlFor="valor">💲 Valor</label>
                            <input 
                                type="number" 
                                id="valor"
                                value={valor}
                                onChange={(e) => setValor(e.target.value)}
                                placeholder="0,00" 
                                step="0.01"
                                min="0"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-column">
                        {/* Coluna direita vazia para alinhar com a de despesas */}
                    </div>
                </div>

                {/* Linha 3: Método de Pagamento (largura total) */}
                <div className="form-group full-width">
                    <label htmlFor="metodoPagamento">Método Pagamento</label>
                    <input 
                        type="text"
                        id="metodoPagamento" 
                        value={metodoPagamento}
                        onChange={(e) => setMetodoPagamento(e.target.value)}
                        placeholder="Ex: PIX, Dinheiro, Cartão"
                    />
                </div>

                {/* Ações do Formulário */}
                <div className="form-actions">
                    <button type="submit" className="btn-confirmar">Confirmar</button>
                    <button type="button" className="btn-cancelar" onClick={onVoltar} >Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default CadastroReceita;
