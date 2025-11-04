import React, { useState } from 'react';
import './CadastroDespesas.css'; // O arquivo CSS é o mesmo

// Definindo os tipos para os dados da despesa
interface Despesa {
    data: string;
    valor: string; // Usamos string para o input, mas podemos converter depois
    observacao: string;
    historico: string;
}

interface Props {
  onVoltar: () => void;
}

// 2. Recebemos a prop ({ onVoltar })

const CadastroDespesas: React.FC<Props> = ({ onVoltar })=> {
    // Estados para controlar os campos do formulário
    const [data, setData] = useState<string>('');
    const [valor, setValor] = useState<string>('');
    const [observacao, setObservacao] = useState<string>('');
    // MODIFICADO: Valor inicial para string vazia para o placeholder funcionar
    const [historico, setHistorico] = useState<string>(''); 

    // Lista de opções para o histórico
    const historicoOpcoes: string[] = [
        'Material de limpeza',
        'Faxina',
        'Porta quebrada',
        'Limpeza extra',
    ];
    

    // Função para lidar com o envio do formulário
    // Tipamos o evento como React.FormEvent
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Impede o recarregamento da página
        
        // Criamos o objeto de despesa com tipos
        const novaDespesa: Despesa = { 
            data, 
            valor, // Você pode converter para número aqui: parseFloat(valor)
            observacao, 
            historico 
        };
        
        console.log('Despesa cadastrada:', novaDespesa);
        // Aqui você adicionaria a lógica para enviar os dados
        // para sua API ou estado global.
    };

    return (
        <div className="despesa-container">
            <header className="despesa-header">
                <h2>Cadastro de Despesas</h2>
            </header>
            
            <form className="despesa-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    {/* Coluna da Esquerda */}
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
                        <div className="form-group">
                            <label htmlFor="valor">💲 Valor</label>
                            <input 
                                type="number" 
                                id="valor"
                                value={valor}
                                onChange={(e) => setValor(e.target.value)}
                                placeholder="Valor"
                                step="0.01"
                                min="0"
                                required
                            />
                        </div>
                    </div>

                    {/* Coluna da Direita */}
                    <div className="form-column">
                        <div className="form-group">
                            <label htmlFor="historico">🧾 Histórico</label>
                            {/* MODIFICADO: 
                                1. Removido o 'size={...}' 
                                2. Adicionado 'required'
                                3. Corrigido 'e.camera.value' para 'e.target.value'
                            */}
                            <select 
                                id="historico"
                                value={historico}
                                onChange={(e) => setHistorico(e.target.value)}
                                required 
                            >
                                {/* ADICIONADO: Opção de placeholder */}
                                <option value="" disabled>Selecione um histórico...</option>

                                {historicoOpcoes.map((opcao) => (
                                    <option key={opcao} value={opcao}>
                                        {opcao}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Linha de Observação (largura total) */}
                <div className="form-group full-width">
                    <label htmlFor="observacao">Observação</label>
                    <textarea 
                        id="observacao" 
                        rows={3} // 'rows' é um número
                        value={observacao}
                        onChange={(e) => setObservacao(e.target.value)}
                    ></textarea>
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

export default CadastroDespesas;
