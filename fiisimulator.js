import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const FIISimulator = () => {
  const [investment, setInvestment] = useState(1000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(0.8);
  const [results, setResults] = useState([]);
  const [chartData, setChartData] = useState([]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const calculateInvestment = () => {
    const monthlyRate = rate / 100;
    const scenarios = [1, 2, 3, 5, 10, 15, 20, 25, 30];
    const newResults = [];
    const newChartData = [];

    scenarios.forEach((year) => {
      if (year <= years) {
        const months = year * 12;
        // Valor futuro de uma anuidade
        const futureValue = investment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) || 0;
        const monthlyDividends = futureValue * 0.01;
        const totalInvested = investment * months;
        const totalReturn = futureValue - totalInvested;
        const returnPercentage = totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0;

        const result = {
          year,
          futureValue,
          monthlyDividends,
          totalInvested,
          totalReturn,
          returnPercentage
        };

        newResults.push(result);
        newChartData.push({
          ano: year,
          Patrimonio: futureValue,
          'Total Investido': totalInvested,
          'Dividendos Mensais': monthlyDividends
        });
      }
    });

    setResults(newResults);
    setChartData(newChartData);
  };

  useEffect(() => {
    calculateInvestment();
  }, [investment, years, rate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Simulador de Investimentos FII
          </h1>
          <p className="text-gray-600">
            Simule seus investimentos em Fundos de Investimento Imobiliário
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Parâmetros do Investimento</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Investimento Mensal
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">R$</span>
                <input
                  type="number"
                  value={investment}
                  onChange={(e) => setInvestment(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  step="100"
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tempo de Investimento (anos)
              </label>
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                step="1"
                min="1"
                max="30"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Taxa Mensal de Rendimento (%)
              </label>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                step="0.1"
                min="0"
                max="100"
              />
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        {results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {results.slice(-1).map((res) => (
              <div key={res.year} className="bg-white rounded-lg shadow-md p-6 text-center">
                <h3 className="text-sm font-medium text-gray-500 mb-2">{res.year} anos</h3>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(res.futureValue)}
                </p>
                <span className="text-gray-400 block">Patrimônio</span>
              </div>
            ))}
          </div>
        )}

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Evolução do Patrimônio</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ano" />
                <YAxis tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(val) => formatCurrency(val)} />
                <Line
                  type="monotone"
                  dataKey="Patrimonio"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 6, strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Dividendos Mensais</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ano" />
                <YAxis tickFormatter={(value) => `R$ ${(value / 1000).toFixed(1)}k`} />
                <Tooltip formatter={(val) => formatCurrency(val)} />
                <Bar dataKey="Dividendos Mensais" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ano</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Investido</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patrimônio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dividendos</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% Retorno</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.map((res) => (
                <tr key={res.year} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{res.year}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(res.totalInvested)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">{formatCurrency(res.futureValue)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600">{formatCurrency(res.monthlyDividends)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{res.returnPercentage.toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Aviso:</strong> Esta simulação é apenas para fins educacionais e não constitui recomendação de investimento.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FIISimulator;
