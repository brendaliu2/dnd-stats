import React, { useState, useEffect } from 'react';
import AnimalCard from './components/AnimalCard';
import CreatureButton from './components/CreatureButton'
import { ConjuredAnimal } from './types';
import './styles/App.css';
import {animalKey, feyKey} from './creatures/creaturesKey'
import { v4 as uuidv4 } from 'uuid';
import { get, set } from 'idb-keyval';


export default function ConjuredAnimalsTracker() {
  const [animals, setAnimals] = useState<ConjuredAnimal[]>([])
  const [isLoaded, setIsLoaded] = useState(false);
  const [animalName, setAnimalName] = useState('');
  const [totalHp, setTotalHp] = useState('');
  const [hitDie, setHitDie] = useState('');
  const [quantity, setQuantity] = useState('');
  const [damageInputs, setDamageInputs] = useState<Record<string, string>>({});
  const [healingInputs, setHealingInputs] = useState<Record<string, string>>({});
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [showAnimalShortcut, setshowAnimalShortcut] = useState<boolean>(false)
  const [showFeyShortcut, setshowFeyShortcut] = useState<boolean>(false)
  const [isDruid, setisDruid] = useState(false);

  //load animals on refresh
  useEffect(() => {
    get('animals').then(val => {
      if (val) setAnimals(val);
    });
    setIsLoaded(true); 
  }, []);

  //update animals when changed
  useEffect(() => {
      if (isLoaded) {
        set('animals', animals).catch((err) => console.error("IndexedDB Save Error:", err));
      }
    }, [animals, isLoaded]);


  const addAnimal = () => {
    if (!animalName.trim() || !totalHp.trim()) return;

    let hp = parseInt(totalHp, 10);
    if (isNaN(hp) || hp <= 0) return;

    if (isDruid) {
      hp = hp + (2*hitDie)
    }

    let newAnimals = [...animals]
    let i: number = 0;
    while (i < quantity) {
      const newAnimal: ConjuredAnimal = {
        id: uuidv4(),
        name: animalName,
        maxHp: hp,
        currentHp: hp,
        imageData: selectedImage || undefined,
      };
      
      newAnimals.push(newAnimal)
      i++
    }

    setAnimals(newAnimals)
    setAnimalName('');
    setTotalHp('');
    setHitDie('')
    setQuantity('');
    setSelectedImage('');
  };


  const addSetAnimal = (animal) => {
    const animalName = animal['name']
    const animalHp = animal['hp']
    const animalHitDie = animal['hitDie']
    const animalImage = animal['image']
    const newAnimal: ConjuredAnimal = {
      id: uuidv4(),
      name: animalName,
      maxHp: isDruid ? animalHp + (2*animalHitDie) : animalHp,
      currentHp: isDruid ? animalHp + (2*animalHitDie) : animalHp,
      imageData: animalImage,
    };

    setAnimals([...animals, newAnimal]);
  };  

  const toggleAnimalShortcut = () => {
    setshowAnimalShortcut(prevIsOn => !prevIsOn);
  };

  const toggleFeyShortcut = () => {
    setshowFeyShortcut(prevIsOn => !prevIsOn);
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

  const handleCheckboxChange = (event) => {
    setisDruid(event.target.checked);
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <h1 className="app-title">conjured creatures</h1>
      </div>

    <div className="checkbox-group">
      <label htmlFor="animal-name">
        are u a circle of the shepherd druid that talks to herself?
      </label>
      <div className="custom-checkbox">
        <input
          id="animal-name"
          type="checkbox"
          checked={isDruid}
          onChange={handleCheckboxChange}
        />
        <span className="checkmark"></span>
      </div>
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

        <div className="input-group" style={{ minWidth: '140px'}}>
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
        
        {isDruid && (
        <div className="input-group" style={{ minWidth: '140px'}}>
          <label htmlFor="hit-die">hit die</label>
          <input
            id="hitDie"
            type="number"
            placeholder="ex. 2"
            value={hitDie}
            onChange={(e) => setHitDie(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, addAnimal)}
          />
        </div>
        )}

        <div className="input-group" style={{ minWidth: '140px'}}>
          <label htmlFor="quantity">quantity</label>
          <input
            id="quantity"
            type="number"
            placeholder="ex. 427"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
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

        <button className="btn-primary" onClick={toggleAnimalShortcut}>
          creatures
        </button>
        {/* <button className="btn-primary" onClick={toggleFeyShortcut}>
          fey
        </button> */}
      </div>

      {selectedImage && (
        <div className="preview-section">
          <img src={selectedImage} alt="Preview" className="preview-image" />
          <div className="preview-label">Screenshot preview</div>
        </div>
      )}

      {showAnimalShortcut && (
        <div className="input-section">
          {animalKey.map((animal) => (
            <CreatureButton
              key={animal[name]} 
              animal={animal}
              onaddSetAnimal={() => addSetAnimal(animal)}
            />
          ))}
        </div>
      )}   
      {showFeyShortcut && (
        <div className="input-section">
          {feyKey.map((animal) => (
            <CreatureButton
              key={animal[name]} 
              animal={animal}
              onaddSetAnimal={() => addSetAnimal(animal)}
            />
          ))}
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
