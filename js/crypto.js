// Crypto JavaScript for MNZ Digital State

document.addEventListener('DOMContentLoaded', function() {
  // Initialize crypto portfolio data
  initializePortfolio();
});

// Initialize portfolio data
function initializePortfolio() {
  // Simulated portfolio data
  const portfolioData = {
    totalBalance: 1245.67,
    balanceChange: 2.34,
    btcBalance: 0.023456,
    btcValue: 1210.23,
    ethBalance: 1.5678,
    ethValue: 4680.45,
    usdtBalance: 125.50
  };
  
  // Update portfolio values
  document.getElementById('total-balance').textContent = '$' + portfolioData.totalBalance.toFixed(2);
  document.getElementById('balance-change').textContent = portfolioData.balanceChange.toFixed(2) + '%';
  document.getElementById('btc-balance').textContent = portfolioData.btcBalance.toFixed(6);
  document.getElementById('btc-value').textContent = portfolioData.btcValue.toFixed(2);
  document.getElementById('eth-balance').textContent = portfolioData.ethBalance.toFixed(6);
  document.getElementById('eth-value').textContent = portfolioData.ethValue.toFixed(2);
  document.getElementById('usdt-balance').textContent = portfolioData.usdtBalance.toFixed(2);
}