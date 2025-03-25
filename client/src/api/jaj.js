import React, { useState } from 'react';

const App = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections(prevState => ({
      ...prevState,
      [section]: !prevState[section]
    }));
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px' }}>
      <h1>Справочная информация по работе с конфигурацией 1C: Управление торговлей</h1>

      <div>
        <h2>Главная</h2>
        <p>Справочники</p>
        <p>Документооборот</p>
        <p>Отчеты</p>
      </div>

      <div>
        <h2 onClick={() => toggleSection('chapter1')} style={{ cursor: 'pointer' }}>
          Глава 1 «Работа со справочниками» {openSections['chapter1'] ? '▼' : '►'}
        </h2>
        {openSections['chapter1'] && (
          <div style={{ marginLeft: '20px' }}>
            <p>Раздел 1. Заполнение справочников в подсистеме НСИ →</p>
            <p>Раздел 2. Работа с подсистемой «Финансы» →</p>
            <p>Раздел 3. Работа с подсистемой «Маркетинг» →</p>
            <p>Раздел 4. Работа с подсистемой «Закупки» →</p>
            <p>Раздел 5. Работа с подсистемой «Продажи» →</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;