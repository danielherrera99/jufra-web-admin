import React from 'react';

const GaleriaNewModal = ({ newItem, setNewItem }) => {
  return (
    <>
      <div className="input-group">
        <label>Título de la Foto/Video</label>
        <input 
          type="text" 
          value={newItem.titulo || ''} 
          onChange={e => setNewItem({...newItem, titulo: e.target.value})} 
          required 
          placeholder="Ej: Procesión JUEVES SANTO" 
        />
      </div>
      <div className="input-group" style={{ marginTop: '1rem' }}>
        <label>Fecha del Recuerdo</label>
        <input 
          type="date" 
          value={newItem.fecha || ''} 
          onChange={e => setNewItem({...newItem, fecha: e.target.value})} 
        />
      </div>
      <div className="input-group" style={{ marginTop: '1rem' }}>
        <label>Descripción (Opcional)</label>
        <input 
          type="text" 
          value={newItem.descripcion || ''} 
          onChange={e => setNewItem({...newItem, descripcion: e.target.value})} 
          placeholder="Breve historia..." 
        />
      </div>
      <div className="input-group" style={{ marginTop: '1rem' }}>
        <label>Archivo (Imagen o Video)</label>
        <input 
          type="file" 
          accept="image/*,video/*" 
          onChange={e => setNewItem({...newItem, archivoFile: e.target.files[0]})} 
          required 
          style={{ padding: '0.7rem', background: 'var(--surface)' }} 
        />
      </div>
    </>
  );
};

export default GaleriaNewModal;
