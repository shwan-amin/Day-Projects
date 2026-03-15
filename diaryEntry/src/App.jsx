import { useState } from 'react'
import Header from '../components/Header.jsx'
import Sidebar from '../components/Sidebar.jsx'
import MainPanel from '../components/MainPanel.jsx'
import { getData, setData } from '../data.js'


export default function App() {
  const [entries, setEntries] = useState(getData());
  const [selectedEntry, setSelectedEntry] = useState(null);

  function handleCreateEntry() {
    setEntries((prevEntries) => {
      const time = new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      });

      const newEntry = {
        id: prevEntries.length + 1,
        title: 'My new entry',
        date: time,
        text: ''
      };

      const updatedEntries = [...prevEntries, newEntry];
      setData(updatedEntries);
      return updatedEntries;
    });
  }

  function handleSelectEntry(id) {
    // Search our entries state to find the one we clicked on
    const entry = entries.find((e) => e.id === id);
    setSelectedEntry(entry);
  }

  function handleSaveEntry(updatedEntry) {
    setEntries((prevEntries) => {
      const updatedEntries = prevEntries.map((entry) =>
        entry.id === updatedEntry.id ? updatedEntry : entry
      );
      setData(updatedEntries);
      return updatedEntries;
    });

    setSelectedEntry(updatedEntry);
  }

  return (
    <>
      <Header onCreateEntry={handleCreateEntry} />
      <Sidebar entries={entries} entryClick={handleSelectEntry} />
      <MainPanel entry={selectedEntry} onSaveEntry={handleSaveEntry} />
    </>
  );
}

