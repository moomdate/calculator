// ตัวแปรสำหรับเก็บสถานะของเครื่องคิดเลข
let currentValue = '0';      // ค่าที่แสดงบนหน้าจอ
let previousValue = null;    // ค่าที่เก็บไว้ก่อนหน้า
let currentOperator = null;  // เครื่องหมายคำนวณที่เลือก

/**
 * อัพเดทค่าที่แสดงบนหน้าจอ
 */
function updateDisplay() {
  document.getElementById('valueDisplay').textContent = currentValue;
  document.getElementById('operatorDisplay').textContent = currentOperator || '';
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
  updateDisplay();
}

/**
 * เพิ่มจุดทศนิยม
 */
function inputDecimal() {
  // ถ้าเป็น Error ให้รีเซ็ตก่อน
  if (currentValue === 'Error') {
    currentValue = '0.';
    updateDisplay();
    return;
  }
  
  // ตรวจสอบว่ามีจุดทศนิยมอยู่แล้วหรือไม่
  if (!currentValue.includes('.')) {
    currentValue += '.';
    updateDisplay();
  }
}

/**
 * เลือกเครื่องหมายคำนวณ (+, -, *, /)
 * @param {string} operator - เครื่องหมายที่เลือก
 */
function inputOperator(operator) {
  // ถ้ามีการคำนวณค้างอยู่ ให้คำนวณก่อน
  if (currentOperator && previousValue !== null) {
    calculate();
  }
  
  previousValue = parseFloat(currentValue);
  currentOperator = operator;
  currentValue = '0';
  updateDisplay();
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
      // ตรวจสอบการหารด้วย 0
      if (current === 0) {
        currentValue = 'Error';
        currentOperator = null;
        previousValue = null;
        updateDisplay();
        return;
      }
      result = previousValue / current;
      break;
  }
  
  // ปัดเศษทศนิยมให้เหลือ 8 ตำแหน่ง และตัดเลข 0 ท้ายทิ้ง
  result = Math.round(result * 100000000) / 100000000;
  
  // แปลงเป็น string และตัดศูนย์ท้ายออก
  currentValue = String(result);
  
  // ถ้าเป็นทศนิยมที่ยาวมาก ให้แสดงแบบ exponential
  if (currentValue.length > 12 && currentValue.includes('.')) {
    currentValue = result.toExponential(6);
  }
  
  currentOperator = null;
  previousValue = null;
  updateDisplay();
}

/**
 * ล้างค่าทั้งหมด
 */
function clearAll() {
  currentValue = '0';
  previousValue = null;
  currentOperator = null;
  updateDisplay();
}

/**
 * เปลี่ยนธีม
 * @param {string} theme - ชื่อธีม (dark, light, neon)
 */
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  
  // เอา active class ออกจากปุ่มทั้งหมด
  document.querySelectorAll('.theme-button').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // เพิ่ม active class ให้ปุ่มที่เลือก
  document.querySelector(`.theme-button.${theme}`).classList.add('active');
  
  // บันทึกธีมที่เลือกไว้
  localStorage.setItem('calculator-theme', theme);
}

/**
 * โหลดธีมที่บันทึกไว้เมื่อเปิดหน้าเว็บ
 */
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('calculator-theme') || 'dark';
  setTheme(savedTheme);
});

/**
 * รองรับการกดแป้นพิมพ์
 */
document.addEventListener('keydown', (e) => {
  // ตัวเลข 0-9
  if (e.key >= '0' && e.key <= '9') {
    inputNumber(e.key);
  } 
  // จุดทศนิยม
  else if (e.key === '.' || e.key === ',') {
    inputDecimal();
  }
  // เครื่องหมายคำนวณ
  else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
    inputOperator(e.key);
  } 
  // กด Enter หรือ = เพื่อคำนวณ
  else if (e.key === 'Enter' || e.key === '=') {
    calculate();
  } 
  // กด Escape หรือ C เพื่อล้างค่า
  else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
    clearAll();
  }
});