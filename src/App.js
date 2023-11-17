import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import Header from './Components/HeaderComponents/Header';
import ResultTable from './Components/ResultTable/ResultTable';
import UserInput from './Components/UserInput/UserInput';

export default function App() {
  const [userInput, setUserInput] = useState('');

  const calculateHandler = (userInput) => {
    setUserInput(userInput);
  };

  const yearlyData = [];//per year data

  if (userInput) {
    let currentSavings = +userInput['current-savings'];
    const yearlyContribution = +userInput['yearly-contribution'];
    const expectedReturn = +userInput['expected-return'] / 100;
    const duration = +userInput.duration;

    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
  }

  return (
    <div>
      <Header />

      <UserInput onCalculate={calculateHandler} />
      {!userInput && <p style={{textAlign: 'center'}}>No investment calculated yet.</p>}
      {userInput && <ResultTable data={yearlyData} initialInvestment={userInput['current-savings']} />}
    </div>
  );
}
