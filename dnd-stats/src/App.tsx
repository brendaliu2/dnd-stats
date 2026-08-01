import React, { useState } from 'react';
import AnimalCard from './components/AnimalCard';
import { ConjuredAnimal } from './types';

export default function ConjuredAnimalsTracker() {
  const [animals, setAnimals] = useState<ConjuredAnimal[]>([]);
  const [animalName, setAnimalName] = useState('');
  const [totalHp, setTotalHp] = useState('');
  const [damageInputs, setDamageInputs] = useState<Record<string, string>>({});
  const [selectedImage, setSelectedImage] = useState<string>('');

  const addAnimal = () => {
    if (!animalName.trim() || !totalHp.trim()) return;

    const hp = parseInt(totalHp, 10);
    if (isNaN(hp) || hp <= 0) return;

    const newAnimal: ConjuredAnimal = {
      id: Date.now().toString(),
      name: animalName,
      maxHp: hp,
      currentHp: hp,
      imageData: selectedImage || undefined,
    };

    setAnimals([...animals, newAnimal]);
    setAnimalName('');
    setTotalHp('');
    setSelectedImage('');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setSelectedImage(result);
    };
    reader.readAsDataURL(file);
  };

  const applyDamage = (id: string) => {
    const damage = parseInt(damageInputs[id] || '0', 10);
    if (isNaN(damage) || damage <= 0) return;

    setAnimals(
      animals.map(animal =>
        animal.id === id
          ? { ...animal, currentHp: Math.max(0, animal.currentHp - damage) }
          : animal
      )
    );

    setDamageInputs({ ...damageInputs, [id]: '' });
  };

  const deleteAnimal = (id: string) => {
    setAnimals(animals.filter(animal => animal.id !== id));
    const newDamageInputs = { ...damageInputs };
    delete newDamageInputs[id];
    setDamageInputs(newDamageInputs);
  };

  const handleKeyPress = (e: React.KeyboardEvent, callback: () => void) => {
    if (e.key === 'Enter') {
      callback();
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <style>{`
        * { box-sizing: border-box; }
        body { font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif); color: var(--text-primary); }
        h1 { font-size: 28px; font-weight: 500; margin-bottom: 2rem; }
        .input-section { display: flex; gap: 0.75rem; margin-bottom: 2rem; flex-wrap: wrap; align-items: flex-end; }
        .input-group { display: flex; flex-direction: column; gap: 0.5rem; }
        label { font-size: 14px; font-weight: 500; color: var(--text-secondary); }
        input { padding: 0.75rem; border: 1px solid var(--border); border-radius: 6px; font-size: 16px; background: var(--surface-2); color: var(--text-primary); }
        input:focus { outline: none; border-color: var(--border-strong); box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
        input[type="file"] { padding: 0.5rem; border: 1px dashed var(--border); cursor: pointer; }
        button { border-radius: 6px; font-weight: 500; cursor: pointer; transition: all 0.2s; }
        .btn-primary { background: #3b82f6; color: white; padding: 0.75rem 1.5rem; font-size: 16px; border: none; }
        .btn-primary:hover { background: #2563eb; }
        .preview-section { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem; }
        .preview-image { width: 80px; height: 80px; object-fit: cover; border-radius: 6px; border: 1px solid var(--border); }
        .preview-label { font-size: 14px; color: var(--text-secondary); }
        .animals-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; }
        .empty-state { text-align: center; padding: 3rem 2rem; color: var(--text-secondary); }
        .empty-state p { font-size: 16px; }
      `}</style>

      <h1>astrid's summonings</h1>

      <div className="input-section">
        <div className="input-group" style={{ minWidth: '180px' }}>
          <label htmlFor="animal-name">creature name</label>
          <input
            id="animal-name"
            type="text"
            placeholder="e.g., Wolf, Dire Bear"
            value={animalName}
            onChange={(e) => setAnimalName(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, addAnimal)}
          />
        </div>

        <div className="input-group" style={{ minWidth: '140px' }}>
          <label htmlFor="total-hp">total HP</label>
          <input
            id="total-hp"
            type="number"
            placeholder="e.g., 60"
            value={totalHp}
            onChange={(e) => setTotalHp(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, addAnimal)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="stat-block">stat block (optional)</label>
          <input
            id="stat-block"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

        <button className="btn-primary" onClick={addAnimal}>
          add creature
        </button>
      </div>

      {selectedImage && (
        <div className="preview-section">
          <img src={selectedImage} alt="Preview" className="preview-image" />
          <div className="preview-label">Screenshot preview</div>
        </div>
      )}

      {animals.length === 0 ? (
        <div className="empty-state">
          <p>No conjured animals yet. Add one to get started.</p>
        </div>
      ) : (
        <div className="animals-grid">
          {animals.map((animal) => (
            <AnimalCard
              key={animal.id}
              animal={animal}
              damageInput={damageInputs[animal.id] || ''}
              onDamageInputChange={(value) =>
                setDamageInputs({ ...damageInputs, [animal.id]: value })
              }
              onApplyDamage={applyDamage}
              onDelete={deleteAnimal}
            />
          ))}
        </div>
      )}
    </div>
  );
}
