// ตัวแปรสำหรับเก็บสถานะของเครื่องคิดเลข
let currentValue = '0';      // ค่าที่แสดงบนหน้าจอ
let previousValue = null;    // ค่าที่เก็บไว้ก่อนหน้า
let currentOperator = null;  // เครื่องหมายคำนวณที่เลือก
let calculationHistory = []; // เก็บประวัติการคำนวณ
let isHistoryVisible = true; // สถานะการแสดงประวัติ
let equationDisplay = '';    // สมการที่แสดงด้านบน

/**
 * อัพเดทค่าที่แสดงบนหน้าจอ
 */
function updateDisplay() {
  document.getElementById('valueDisplay').textContent = currentValue;
  document.getElementById('equationDisplay').textContent = equationDisplay;
}

/**
 * เพิ่มตัวเลขลงในหน้าจอ
 * @param {string} num - ตัวเลขที่ต้องการเพิ่ม
 */
function inputNumber(num) {
  if (currentValue === '0' || currentValue === 'Error') {
    currentValue = num;
  } else {
    currentValue += num;
  }
  
  // อัพเดทสมการ
  updateEquationDisplay();
  updateDisplay();
}

/**
 * เพิ่มจุดทศนิยม
 */
function inputDecimal() {
  if (currentValue === 'Error') {
    currentValue = '0.';
    updateDisplay();
    return;
  }
  
  if (!currentValue.includes('.')) {
    currentValue += '.';
    updateEquationDisplay();
    updateDisplay();
  }
}

/**
 * อัพเดทการแสดงสมการ
 */
function updateEquationDisplay() {
  if (previousValue !== null && currentOperator) {
    equationDisplay = `${previousValue} ${getOperatorSymbol(currentOperator)} ${currentValue}`;
  } else if (previousValue !== null && !currentOperator) {
    // หลังจากกด = แล้ว
    equationDisplay = '';
  } else {
    equationDisplay = '';
  }
}

/**
 * เปลี่ยนเครื่องหมาย +/-
 */
function toggleSign() {
  if (currentValue === 'Error' || currentValue === '0') {
    return;
  }
  
  if (currentValue.startsWith('-')) {
    currentValue = currentValue.substring(1);
  } else {
    currentValue = '-' + currentValue;
  }
  
  updateEquationDisplay();
  updateDisplay();
}

/**
 * คำนวณเปอร์เซ็นต์
 */
function calculatePercent() {
  if (currentValue === 'Error') {
    return;
  }
  
  const current = parseFloat(currentValue);
  
  if (previousValue !== null && currentOperator) {
    if (currentOperator === '+' || currentOperator === '-') {
      currentValue = String((previousValue * current) / 100);
    } else {
      currentValue = String(current / 100);
    }
  } else {
    currentValue = String(current / 100);
  }
  
  updateEquationDisplay();
  updateDisplay();
}

/**
 * ลบตัวเลขทีละตัวจากท้าย (Backspace)
 */
function backspace() {
  if (currentValue === 'Error') {
    currentValue = '0';
    updateDisplay();
    return;
  }
  
  if (currentValue.length > 1) {
    currentValue = currentValue.slice(0, -1);
    
    if (currentValue === '-' || currentValue === '.') {
      currentValue = '0';
    }
  } else {
    currentValue = '0';
  }
  
  updateEquationDisplay();
  updateDisplay();
}

/**
 * เลือกเครื่องหมายคำนวณ (+, -, *, /)
 * @param {string} operator - เครื่องหมายที่เลือก
 */
function inputOperator(operator) {
  if (currentOperator && previousValue !== null) {
    calculate();
  }
  
  previousValue = parseFloat(currentValue);
  currentOperator = operator;
  
  // อัพเดทสมการ
  equationDisplay = `${previousValue} ${getOperatorSymbol(operator)}`;
  
  currentValue = '0';
  updateDisplay();
}

/**
 * แปลงเครื่องหมายเป็นสัญลักษณ์ที่แสดงผล
 * @param {string} operator - เครื่องหมาย
 * @returns {string} - สัญลักษณ์
 */
function getOperatorSymbol(operator) {
  const symbols = {
    '+': '+',
    '-': '−',
    '*': '×',
    '/': '÷'
  };
  return symbols[operator] || operator;
}

/**
 * คำนวณผลลัพธ์
 */
function calculate() {
  if (currentOperator === null || previousValue === null) {
    return;
  }
  
  const current = parseFloat(currentValue);
  let result;
  
  // สร้าง expression สำหรับบันทึกประวัติและแสดงผล
  const expression = `${previousValue} ${getOperatorSymbol(currentOperator)} ${current}`;
  
  // แสดงสมการพร้อม = ก่อนคำนวณ
  equationDisplay = `${expression} =`;
  updateDisplay();
  
  // คำนวณตามเครื่องหมายที่เลือก
  switch(currentOperator) {
    case '+':
      result = previousValue + current;
      break;
    case '-':
      result = previousValue - current;
      break;
    case '*':
      result = previousValue * current;
      break;
    case '/':
      if (current === 0) {
        currentValue = 'Error';
        currentOperator = null;
        previousValue = null;
        addToHistory(expression, 'Error');
        updateDisplay();
        return;
      }
      result = previousValue / current;
      break;
  }
  
  // ปัดเศษทศนิยมให้เหลือ 8 ตำแหน่ง
  result = Math.round(result * 100000000) / 100000000;
  
  currentValue = String(result);
  
  if (currentValue.length > 12 && currentValue.includes('.')) {
    currentValue = result.toExponential(6);
  }
  
  // บันทึกประวัติการคำนวณ
  addToHistory(expression, currentValue);
  
  currentOperator = null;
  previousValue = null;
  updateDisplay();
}

/**
 * เพิ่มรายการลงในประวัติ
 * @param {string} expression - สมการ
 * @param {string} result - ผลลัพธ์
 */
function addToHistory(expression, result) {
  const historyItem = {
    expression: expression,
    result: result,
    timestamp: new Date().toLocaleString('th-TH', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  };
  
  // เพิ่มรายการใหม่ที่ด้านบน
  calculationHistory.unshift(historyItem);
  
  // จำกัดประวัติไว้ที่ 10 รายการ
  if (calculationHistory.length > 10) {
    calculationHistory.pop();
  }
  
  // บันทึกลง localStorage
  saveHistoryToStorage();
  
  // อัพเดท UI
  renderHistory();
}

/**
 * แสดงประวัติการคำนวณ
 */
function renderHistory() {
  const historyList = document.getElementById('historyList');
  
  if (calculationHistory.length === 0) {
    historyList.innerHTML = '<div class="history-empty">ยังไม่มีประวัติการคำนวณ</div>';
    return;
  }
  
  historyList.innerHTML = calculationHistory.map((item, index) => `
    <div class="history-item" onclick="loadFromHistory(${index})">
      <div class="history-expression">${item.expression}</div>
      <div class="history-result">= ${item.result}</div>
      <div class="history-time">${item.timestamp}</div>
    </div>
  `).join('');
}

/**
 * โหลดค่าจากประวัติ
 * @param {number} index - ตำแหน่งในประวัติ
 */
function loadFromHistory(index) {
  const item = calculationHistory[index];
  
  // ถ้าไม่ใช่ Error ให้โหลดผลลัพธ์
  if (item.result !== 'Error') {
    currentValue = item.result;
    currentOperator = null;
    previousValue = null;
    equationDisplay = ''; // ล้างสมการ
    updateDisplay();
  }
}

/**
 * ล้างประวัติทั้งหมด
 */
function clearHistory() {
  if (calculationHistory.length === 0) return;
  
  if (confirm('ต้องการล้างประวัติการคำนวณทั้งหมดหรือไม่?')) {
    calculationHistory = [];
    saveHistoryToStorage();
    renderHistory();
  }
}

/**
 * แสดง/ซ่อนแผงประวัติ
 */
function toggleHistory() {
  const historyPanel = document.getElementById('historyPanel');
  isHistoryVisible = !isHistoryVisible;
  
  if (isHistoryVisible) {
    historyPanel.classList.remove('hidden');
  } else {
    historyPanel.classList.add('hidden');
  }
  
  // บันทึกสถานะ
  localStorage.setItem('calculator-history-visible', isHistoryVisible);
}

/**
 * บันทึกประวัติลง localStorage
 */
function saveHistoryToStorage() {
  localStorage.setItem('calculator-history', JSON.stringify(calculationHistory));
}

/**
 * โหลดประวัติจาก localStorage
 */
function loadHistoryFromStorage() {
  const saved = localStorage.getItem('calculator-history');
  if (saved) {
    calculationHistory = JSON.parse(saved);
    renderHistory();
  }
  
  // โหลดสถานะการแสดงประวัติ
  const historyVisible = localStorage.getItem('calculator-history-visible');
  if (historyVisible !== null) {
    isHistoryVisible = historyVisible === 'true';
    const historyPanel = document.getElementById('historyPanel');
    if (!isHistoryVisible) {
      historyPanel.classList.add('hidden');
    }
  }
}

/**
 * ล้างค่าทั้งหมด
 */
function clearAll() {
  currentValue = '0';
  previousValue = null;
  currentOperator = null;
  equationDisplay = '';
  updateDisplay();
}

/**
 * เปลี่ยนธีม
 * @param {string} theme - ชื่อธีม (dark, light, neon)
 */
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  
  document.querySelectorAll('.theme-button').forEach(btn => {
    btn.classList.remove('active');
  });
  
  document.querySelector(`.theme-button.${theme}`).classList.add('active');
  
  localStorage.setItem('calculator-theme', theme);
}

/**
 * โหลดธีมที่บันทึกไว้เมื่อเปิดหน้าเว็บ
 */
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('calculator-theme') || 'dark';
  setTheme(savedTheme);
  
  // โหลดประวัติ
  loadHistoryFromStorage();
});

/**
 * รองรับการกดแป้นพิมพ์
 */
document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') {
    inputNumber(e.key);
  } 
  else if (e.key === '.' || e.key === ',') {
    inputDecimal();
  }
  else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
    inputOperator(e.key);
  } 
  else if (e.key === 'Enter' || e.key === '=') {
    calculate();
  } 
  else if (e.key === 'Backspace' || e.key === 'Delete') {
    e.preventDefault();
    backspace();
  }
  else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
    clearAll();
  }
  // กด H เพื่อแสดง/ซ่อนประวัติ
  else if (e.key === 'h' || e.key === 'H') {
    toggleHistory();
  }
  // กด % เพื่อคำนวณเปอร์เซ็นต์
  else if (e.key === '%') {
    calculatePercent();
  }
});