import React from 'react';

const GaleriaList = ({ filteredData, setReadItem, SafeImage, formatSafeDate, handleDelete }) => {
  if (filteredData.length === 0) return <div className="glass-card animate-fade" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>La galería está vacía. 🖼️</div>;

  return (
    <div className="animate-fade" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
      {filteredData.map(item => (
        <div key={item._id} className="glass-card zoom-hover" style={{ padding: 0, overflow: 'hidden', position: 'relative', cursor: 'pointer' }} onClick={() => setReadItem(item)}>
          {item.tipoArchivo === 'video' ? (
            <div style={{ position: 'relative', height: '200px', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <video src={item.archivoUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', background: 'rgba(0,0,0,0.5)', padding: '0.5rem', borderRadius: '50%', color: 'white', fontSize: '1.5rem' }}>▶️</div>
            </div>
          ) : (
            <SafeImage src={item.archivoUrl} style={{ width: '100%', height: '200px' }} />
          )}
          <div style={{ padding: '1rem' }}>
            <h3 style={{ fontSize: '1rem', margin: 0, color: 'var(--primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.titulo}</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>{formatSafeDate(item.fecha)}</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.8rem' }}>
              <button 
                onClick={(e) => { e.stopPropagation(); handleDelete(item._id, 'galeria'); }} 
                style={{ background: 'rgba(244, 67, 54, 0.1)', color: '#F44336', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GaleriaList;
