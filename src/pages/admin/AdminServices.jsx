import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import { servicesApi } from '../../services/api';
import SeoHelmet from '../../components/common/SeoHelmet';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    shortDescription: '',
    detailedDescription: '',
    icon: 'Globe',
    displayOrder: 0,
    isActive: true,
  });

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await servicesApi.getAll(true);
      if (res.success) setServices(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleEdit = (s) => {
    setEditingService(s);
    setFormData({
      title: s.title,
      slug: s.slug,
      shortDescription: s.shortDescription,
      detailedDescription: s.detailedDescription,
      icon: s.icon,
      displayOrder: s.displayOrder,
      isActive: s.isActive,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingService) {
        await servicesApi.update(editingService.id, formData);
      } else {
        await servicesApi.create(formData);
      }
      setEditingService(null);
      setFormData({
        title: '',
        slug: '',
        shortDescription: '',
        detailedDescription: '',
        icon: 'Globe',
        displayOrder: 0,
        isActive: true,
      });
      fetchServices();
    } catch (err) {
      alert(err.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await servicesApi.delete(id);
        fetchServices();
      } catch (err) {
        alert(err.message || 'Failed to delete');
      }
    }
  };

  return (
    <>
      <SeoHelmet title="Admin – Services Management" />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold font-['Outfit'] text-slate-900 dark:text-white">
              Services Portfolio Management
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Configure core practice areas, descriptions, and feature lists.
            </p>
          </div>
          <button
            onClick={() => {
              setEditingService(null);
              setFormData({
                title: '',
                slug: '',
                shortDescription: '',
                detailedDescription: '',
                icon: 'Globe',
                displayOrder: services.length + 1,
                isActive: true,
              });
            }}
            className="px-4 py-2 bg-[#9B7EDE] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>New Practice Area</span>
          </button>
        </div>

        {/* Modal / Form if editing or adding */}
        {(editingService !== null || formData.title) && (
          <div className="glass-card rounded-2xl p-6 border border-[#9B7EDE]/40 space-y-4">
            <h3 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white">
              {editingService ? `Edit Service: ${editingService.title}` : 'Add New Practice Area'}
            </h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Slug *</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Short Summary *</label>
                <input
                  type="text"
                  required
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Detailed Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.detailedDescription}
                  onChange={(e) => setFormData({ ...formData, detailedDescription: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 text-[#9B7EDE] rounded"
                  />
                  <span>Active & Visible on Public Site</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => { setEditingService(null); setFormData({ title: '', slug: '', shortDescription: '', detailedDescription: '', icon: 'Globe', displayOrder: 0, isActive: true }); }}
                  className="px-4 py-2 border rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#9B7EDE] text-white rounded-xl text-xs font-semibold"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Services List Table */}
        <div className="glass-card rounded-2xl overflow-hidden border border-slate-200 dark:border-purple-900/30">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-purple-950/40 text-slate-600 dark:text-slate-400 uppercase font-semibold">
              <tr>
                <th className="p-3">Order</th>
                <th className="p-3">Practice Area</th>
                <th className="p-3">URL Slug</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-purple-900/20">
              {services.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/50 dark:hover:bg-purple-950/20">
                  <td className="p-3 font-mono text-slate-400">{s.displayOrder}</td>
                  <td className="p-3 font-bold text-slate-900 dark:text-white">{s.title}</td>
                  <td className="p-3 font-mono text-purple-600 dark:text-purple-300">{s.slug}</td>
                  <td className="p-3">
                    {s.isActive ? (
                      <span className="text-emerald-500 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Active
                      </span>
                    ) : (
                      <span className="text-slate-400 flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5" /> Hidden
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(s)}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-purple-900/40 text-slate-600 hover:text-purple-600"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-purple-900/40 text-rose-500 hover:bg-rose-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminServices;
