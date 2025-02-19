'use client';

import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import { CSVLink } from 'react-csv';

const PayoutCalculator = () => {
  const [payoutRate, setPayoutRate] = useState('');
  const [articlesCount, setArticlesCount] = useState('');
  const [blogsCount, setBlogsCount] = useState('');
  const [totalPayout, setTotalPayout] = useState('');

  useEffect(() => {
    const savedRate = localStorage.getItem('payoutRate');
    if (savedRate) setPayoutRate(parseFloat(savedRate));
  }, []);


  useEffect(() => {
    localStorage.setItem('payoutRate', payoutRate);
  }, [payoutRate]);


  useEffect(() => {
    setTotalPayout((articlesCount + blogsCount) * payoutRate);
  }, [payoutRate, articlesCount, blogsCount]);


  const exportToPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(16);
    doc.text('The Guardian', 10, 10); 
    doc.setFontSize(12);
    doc.text('Payout Report', 10, 25); 
    doc.text(`Payout Rate: $${payoutRate}`, 10, 35);
    doc.text(`Articles: ${articlesCount}`, 10, 45);
    doc.text(`Blogs: ${blogsCount}`, 10, 55);
    doc.text(`Total Payout: $${totalPayout}`, 10, 65);
    doc.save('payout_report.pdf');
  };
  

  const csvData = [
    ['Payout Rate', 'Articles', 'Blogs', 'Total Payout'],
    [payoutRate, articlesCount, blogsCount, totalPayout],
  ];

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-md w-96">
      <h2 className="text-xl font-bold mb-4">Payout Calculator</h2>
      <label className="block mb-2">Set Payout Per Article/Blog:</label>
      <input
  type="number"
  value={payoutRate}
  onChange={(e) => setPayoutRate(e.target.value === '' ? '' : parseFloat(e.target.value))}
  className="w-full p-2 rounded bg-gray-700"
/>

      
      <label className="block mt-4">Number of Articles:</label>
      <input
        type="number"
        value={articlesCount}
        onChange={(e) => setArticlesCount(parseInt(e.target.value) || 0)}
        className="w-full p-2 rounded bg-gray-700"
      />

      <label className="block mt-4">Number of Blogs:</label>
      <input
        type="number"
        value={blogsCount}
        onChange={(e) => setBlogsCount(parseInt(e.target.value) || 0)}
        className="w-full p-2 rounded bg-gray-700"
      />
      
      <p className="mt-4 text-lg font-semibold">Total Payout: ${totalPayout}</p>

      <div className="mt-6 flex gap-4">
        <button onClick={exportToPDF} className="bg-blue-500 px-4 py-2 rounded">Export PDF</button>
        <CSVLink data={csvData} filename="payout_report.csv" className="bg-green-500 px-4 py-2 rounded">Export CSV</CSVLink>
      </div>
    </div>
  );
};

export default PayoutCalculator;
