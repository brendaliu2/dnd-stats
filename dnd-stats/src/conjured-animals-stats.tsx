import React, { useState } from 'react';

interface ConjuredAnimal {
  id: string;
  name: string;
  maxHp: number;
  currentHp: number;
  imageData?: string;
}

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
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <style>{`
        * { box-sizing: border-box; }
        body { font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif); color: var(--text-primary); }
        h1 { font-size: 28px; font-weight: 500; margin-bottom: 2rem; }
        .input-section { display: flex; gap: 0.75rem; margin-bottom: 2rem; flex-wrap: wrap; align-items: flex-end; }
        .input-group { display: flex; flex-direction: column; gap: 0.5rem; }
        label { font-size: 14px; font-weight: 500; color: var(--text-secondary); }
        input { padding: 0.75rem; border: 1px solid var(--border); border-radius: var(--radius); font-size: 16px; background: var(--surface-2); color: var(--text-primary); }
        input:focus { outline: none; border-color: var(--border-strong); box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
        input[type="file"] { padding: 0.5rem; border: 1px dashed var(--border); cursor: pointer; }
        .preview-section { display: flex; align-items: center; gap: 0.75rem; }
        .preview-image { width: 80px; height: 80px; object-fit: cover; border-radius: var(--radius); border: 1px solid var(--border); }
        .preview-label { font-size: 14px; color: var(--text-secondary); }
        button { padding: 0.75rem 1.5rem; border: none; border-radius: var(--radius); font-size: 16px; font-weight: 500; cursor: pointer; transition: all 0.2s; }
        .btn-primary { background: #3b82f6; color: white; }
        .btn-primary:hover { background: #2563eb; }
        .btn-danger { background: #ef4444; color: white; padding: 0.5rem 1rem; font-size: 14px; }
        .btn-danger:hover { background: #dc2626; }
        .btn-apply { background: #10b981; color: white; padding: 0.5rem 1rem; font-size: 14px; }
        .btn-apply:hover { background: #059669; }
        .animals-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
        .animal-card { background: var(--surface-1); border: 1px solid var(--border); border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; }
        .animal-image { width: 100%; max-height: 300px; object-fit: contain; border-radius: 8px; margin-bottom: 1rem; border: 1px solid var(--border); }
        .animal-name { font-size: 18px; font-weight: 500; margin-bottom: 0.5rem; }
        .hp-display { font-size: 24px; font-weight: 500; color: #3b82f6; margin-bottom: 1rem; font-family: var(--font-mono, monospace); }
        .hp-bar { height: 8px; background: var(--surface-2); border-radius: 4px; overflow: hidden; margin-bottom: 1.5rem; }
        .hp-fill { height: 100%; background: #10b981; border-radius: 4px; transition: width 0.3s ease; }
        .damage-section { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
        .damage-section input { flex: 1; }
        .card-footer { display: flex; justify-content: flex-end; }
        .empty-state { text-align: center; padding: 3rem 2rem; color: var(--text-secondary); }
        .empty-state p { font-size: 16px; }
      `}
      </style>

      <h1>Conjured animals</h1>

      <div className="input-section">
        <div className="input-group" style={{ minWidth: '180px' }}>
          <label htmlFor="animal-name">Animal name</label>
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
          <label htmlFor="total-hp">Total HP</label>
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
          <label htmlFor="stat-block">Stat block (optional)</label>
          <input
            id="stat-block"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

        <button className="btn-primary" onClick={addAnimal}>
          Add animal
        </button>
      </div>

      {selectedImage && (
        <div className="preview-section" style={{ marginBottom: '1.5rem' }}>
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
          {animals.map((animal) => {
            const hpPercent = (animal.currentHp / animal.maxHp) * 100;
            const isDead = animal.currentHp <= 0;

            return (
              <div key={animal.id} className="animal-card">
                {animal.imageData && (
                  <img src={animal.imageData} alt={animal.name} className="animal-image" />
                )}
                <div className="animal-name">{animal.name}</div>
                <div
                  className="hp-display"
                  style={{ color: isDead ? '#ef4444' : '#3b82f6' }}
                >
                  {animal.currentHp} / {animal.maxHp}
                </div>

                <div className="hp-bar">
                  <div
                    className="hp-fill"
                    style={{
                      width: `${Math.max(0, hpPercent)}%`,
                      background: isDead ? '#ef4444' : '#10b981',
                    }}
                  />
                </div>

                <div className="damage-section">
                  <input
                    type="number"
                    placeholder="Damage"
                    value={damageInputs[animal.id] || ''}
                    onChange={(e) =>
                      setDamageInputs({ ...damageInputs, [animal.id]: e.target.value })
                    }
                    onKeyPress={(e) => handleKeyPress(e, () => applyDamage(animal.id))}
                    disabled={isDead}
                  />
                  <button
                    className="btn-apply"
                    onClick={() => applyDamage(animal.id)}
                    disabled={isDead}
                  >
                    Damage
                  </button>
                </div>

                <div className="card-footer">
                  <button
                    className="btn-danger"
                    onClick={() => deleteAnimal(animal.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}