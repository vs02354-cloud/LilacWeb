import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Star, CheckCircle2 } from 'lucide-react';
import { projectsApi, blogApi } from '../../services/api';
import SeoHelmet from '../../components/common/SeoHelmet';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    clientName: '',
    summary: '',
    challenge: '',
    solution: '',
    thumbnailUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    categoryId: '',
    isFeatured: true,
  });

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const [projRes, catRes] = await Promise.all([
        projectsApi.getAll({ pageSize: 50 }),
        blogApi.getCategories(),
      ]);
      if (projRes.success) setProjects(projRes.data.items);
      if (catRes.success) {
        setCategories(catRes.data);
        if (catRes.data.length > 0 && !formData.categoryId) {
          setFormData((f) => ({ ...f, categoryId: catRes.data[0].id }));
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleEdit = (p) => {
    setEditingProject(p);
    setFormData({
      title: p.title,
      slug: p.slug,
      clientName: p.clientName,
      summary: p.summary,
      challenge: p.challenge || '',
      solution: p.solution || '',
      thumbnailUrl: p.thumbnailUrl,
      categoryId: p.categoryId,
      isFeatured: p.isFeatured,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await projectsApi.update(editingProject.id, formData);
      } else {
        await projectsApi.create(formData);
      }
      setEditingProject(null);
      setFormData({
        title: '',
        slug: '',
        clientName: '',
        summary: '',
        challenge: '',
        solution: '',
        thumbnailUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
        categoryId: categories[0]?.id || '',
        isFeatured: true,
      });
      fetchProjects();
    } catch (err) {
      alert(err.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this case study?')) {
      try {
        await projectsApi.delete(id);
        fetchProjects();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  return (
    <>
      <SeoHelmet title="Admin – Case Studies Management" />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold font-['Outfit'] text-slate-900 dark:text-white">
              Case Studies & Portfolio
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Publish client success stories, architecture metrics, and solution writeups.
            </p>
          </div>
          <button
            onClick={() => {
              setEditingProject(null);
              setFormData({
                title: '',
                slug: '',
                clientName: '',
                summary: '',
                challenge: '',
                solution: '',
                thumbnailUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
                categoryId: categories[0]?.id || '',
                isFeatured: true,
              });
            }}
            className="px-4 py-2 bg-[#9B7EDE] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>New Case Study</span>
          </button>
        </div>

        {/* Form Modal/Drawer if open */}
        {(editingProject !== null || formData.title) && (
          <div className="glass-card rounded-2xl p-6 border border-[#9B7EDE]/40 space-y-4">
            <h3 className="text-base font-bold font-['Outfit'] text-slate-900 dark:text-white">
              {editingProject ? `Edit Case Study: ${editingProject.title}` : 'Publish New Case Study'}
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
                  <label className="block text-xs font-semibold mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Practice Category *</label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Thumbnail Image URL *</label>
                  <input
                    type="url"
                    required
                    value={formData.thumbnailUrl}
                    onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Executive Summary *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">The Enterprise Challenge *</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.challenge}
                    onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Engineering Solution & Architecture *</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.solution}
                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 text-[#9B7EDE] rounded"
                  />
                  <span>Feature on Homepage</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => { setEditingProject(null); setFormData({ title: '', slug: '', clientName: '', summary: '', challenge: '', solution: '', thumbnailUrl: '', categoryId: '', isFeatured: true }); }}
                  className="px-4 py-2 border rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#9B7EDE] text-white rounded-xl text-xs font-semibold"
                >
                  Save Case Study
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Projects Table */}
        <div className="glass-card rounded-2xl overflow-hidden border border-slate-200 dark:border-purple-900/30">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-purple-950/40 text-slate-600 dark:text-slate-400 uppercase font-semibold">
              <tr>
                <th className="p-3">Case Study Title</th>
                <th className="p-3">Client</th>
                <th className="p-3">Category</th>
                <th className="p-3">Featured</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-purple-900/20">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-purple-950/20">
                  <td className="p-3 font-bold text-slate-900 dark:text-white">{p.title}</td>
                  <td className="p-3 text-slate-600 dark:text-slate-300">{p.clientName}</td>
                  <td className="p-3 text-purple-600 dark:text-purple-300">{p.categoryName}</td>
                  <td className="p-3">
                    {p.isFeatured && (
                      <span className="text-amber-500 font-bold flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400" /> Featured
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-purple-900/40 text-slate-600 hover:text-purple-600"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
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

export default AdminProjects;
