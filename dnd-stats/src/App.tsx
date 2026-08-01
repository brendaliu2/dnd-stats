import React, { useState } from 'react';
import AnimalCard from './components/AnimalCard';
import { ConjuredAnimal } from './types';
import './styles/App.css';
import creatureKey from './creatures/creaturesKey'

export default function ConjuredAnimalsTracker() {
  const [animals, setAnimals] = useState<ConjuredAnimal[]>([]);
  const [animalName, setAnimalName] = useState('');
  const [totalHp, setTotalHp] = useState('');
  const [damageInputs, setDamageInputs] = useState<Record<string, string>>({});
  const [healingInputs, setHealingInputs] = useState<Record<string, string>>({});
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [showShortcuts, setShowShortcuts] = useState<boolean>(false)

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

  const addSetAnimal = (name: string) => {
    const animalHp = creatureKey[name]['hp']
    const animalImage = creatureKey[name]['image']
    const newAnimal: ConjuredAnimal = {
      id: Date.now().toString(),
      name: name,
      maxHp: animalHp,
      currentHp: animalHp,
      imageData: animalImage,
    };

    setAnimals([...animals, newAnimal]);
  };  

  const toggleShortcut = () => {
    setShowShortcuts(prevIsOn => !prevIsOn);
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

  const applyHealing = (id: string) => {
    const healing = parseInt(healingInputs[id] || '0', 10);
    if (isNaN(healing) || healing <= 0) return;

    setAnimals(
      animals.map(animal =>
        animal.id === id
          ? { ...animal, currentHp: Math.min(animal.maxHp, animal.currentHp + healing) }
          : animal
      )
    );

    setHealingInputs({ ...healingInputs, [id]: '' });
  };

  const deleteAnimal = (id: string) => {
    setAnimals(animals.filter(animal => animal.id !== id));
    const newDamageInputs = { ...damageInputs };
    delete newDamageInputs[id];
    setDamageInputs(newDamageInputs);
    const newHealingInputs = { ...healingInputs };
    delete newHealingInputs[id];
    setHealingInputs(newHealingInputs);
  };

  const handleKeyPress = (e: React.KeyboardEvent, callback: () => void) => {
    if (e.key === 'Enter') {
      callback();
    }
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <h1 className="app-title">conjured creatures</h1>
      </div>

      <div className="input-section">
        <div className="input-group" style={{ minWidth: '180px' }}>
          <label htmlFor="animal-name">creature name</label>
          <input
            id="animal-name"
            type="text"
            placeholder="ex. adult red dragon"
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
            placeholder="ex. 60 million"
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

        <button className="btn-primary" onClick={toggleShortcut}>
          quick add
        </button>
      </div>

      {selectedImage && (
        <div className="preview-section">
          <img src={selectedImage} alt="Preview" className="preview-image" />
          <div className="preview-label">Screenshot preview</div>
        </div>
      )}

      {showShortcuts && (
        <div className="input-section">
          <button className="btn-primary" onClick={() => addSetAnimal('dragon')}>
            add dragon
          </button>
        </div>
      )}      

      {animals.length === 0 ? (
        <div className="empty-state">
          <p>let the conjuring begin!</p>
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
              healingInput={healingInputs[animal.id] || ''}
              onHealingInputChange={(value) =>
                setHealingInputs({ ...healingInputs, [animal.id]: value })
              }
              onApplyHealing={applyHealing}
              onDelete={deleteAnimal}
            />
          ))}
        </div>
      )}
    </div>
  );
}
