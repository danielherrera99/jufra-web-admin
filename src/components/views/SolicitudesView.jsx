import React, { useState } from 'react';
import api from '../../config/api';

const SolicitudesView = ({ data, loading, fetchData }) => {
  const [updating, setUpdating] = useState(false);

  // We assume data is passed directly from App.jsx or we can fetch it here.
  // Actually, App.jsx fetches everything, but since this is a new module, App.jsx needs to fetch it.
  // For simplicity, let's use the provided filteredData or data.solicitudes.
  
  const solicitudes = data.solicitudes || [];

  const handleEstadoChange = async (id, nuevoEstado) => {
    setUpdating(true);
    try {
      await api.put(`/solicitudes/${id}`, { estado: nuevoEstado });
      fetchData();
    } catch (error) {
      alert('Error al actualizar estado');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta solicitud?')) return;
    
    setUpdating(true);
    try {
      await api.delete(`/solicitudes/${id}`);
      fetchData();
    } catch (error) {
      alert('Error al eliminar');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p>Cargando solicitudes...</p>;

  if (solicitudes.length === 0) {
    return (
      <div className="glass-card animate-fade" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1.5rem', opacity: 0.2 }}>📝</div>
        <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>No hay solicitudes</h3>
        <p style={{ color: 'var(--text-muted)' }}>Aún nadie se ha registrado desde la web.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade">
      <div className="responsive-grid" style={{ '--grid-min': '300px' }}>
        {solicitudes.map(solicitud => (
          <div key={solicitud._id} className="glass-card" style={{ position: 'relative', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ margin: 0, color: 'var(--primary)' }}>{solicitud.nombre}</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {new Date(solicitud.createdAt).toLocaleDateString('es-ES', { 
                    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' 
                  })}
                </span>
              </div>
              <span style={{ 
                padding: '4px 8px', 
                borderRadius: '12px', 
                fontSize: '0.75rem', 
                fontWeight: 'bold',
                backgroundColor: solicitud.estado === 'contactado' ? '#E8F5E9' : '#FFF3E0',
                color: solicitud.estado === 'contactado' ? '#2E7D32' : '#E65100'
              }}>
                {solicitud.estado === 'contactado' ? 'Contactado ✓' : 'Pendiente'}
              </span>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ margin: '0 0 0.5rem 0' }}><strong>Edad:</strong> {solicitud.edad} años</p>
              <p style={{ margin: 0 }}>
                <strong>Teléfono:</strong> <br/>
                <a href={`https://wa.me/51${solicitud.telefono.replace(/\s+/g, '')}`} target="_blank" rel="noreferrer" style={{ color: '#25D366', textDecoration: 'none', fontWeight: 'bold' }}>
                  📱 {solicitud.telefono}
                </a>
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {solicitud.estado === 'pendiente' ? (
                <button 
                  className="btn zoom-hover" 
                  onClick={() => handleEstadoChange(solicitud._id, 'contactado')}
                  disabled={updating}
                  style={{ flex: 1, backgroundColor: '#4CAF50', color: 'white', padding: '0.5rem', fontSize: '0.85rem' }}
                >
                  Marcar Contactado
                </button>
              ) : (
                <button 
                  className="btn zoom-hover" 
                  onClick={() => handleEstadoChange(solicitud._id, 'pendiente')}
                  disabled={updating}
                  style={{ flex: 1, backgroundColor: '#FF9800', color: 'white', padding: '0.5rem', fontSize: '0.85rem' }}
                >
                  Marcar Pendiente
                </button>
              )}
              <button 
                className="btn zoom-hover" 
                onClick={() => handleDelete(solicitud._id)}
                disabled={updating}
                style={{ backgroundColor: '#F44336', color: 'white', padding: '0.5rem 1rem' }}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolicitudesView;
