import React, { useEffect, useState } from 'react';
import { 
  Plus, Edit, Trash2, Eye, EyeOff, Search, BookOpen, 
  Calendar, User, Tag, Sparkles, X, CheckCircle2, Clock
} from 'lucide-react';
import { blogApi } from '../../services/api';
import SeoHelmet from '../../components/common/SeoHelmet';

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImageUrl: '',
    authorName: 'LilacTechSys Editorial',
    authorRole: 'Solutions Architect',
    categoryId: '',
    tags: 'Cloud, AI, Architecture',
    estimatedReadMinutes: 5,
    isPublished: true,
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [blogRes, catRes] = await Promise.all([
        blogApi.getAll({ page: 1, pageSize: 50, searchTerm }),
        blogApi.getCategories(),
      ]);
      if (blogRes.success) setBlogs(blogRes.data.items || []);
      if (catRes.success) setCategories(catRes.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  const handleOpenModal = (blog = null) => {
    setErrorMessage('');
    if (blog) {
      setEditingBlog(blog);
      setFormData({
        title: blog.title || '',
        slug: blog.slug || '',
        excerpt: blog.excerpt || '',
        content: blog.content || '',
        coverImageUrl: blog.coverImageUrl || '',
        authorName: blog.authorName || '',
        authorRole: blog.authorRole || '',
        categoryId: blog.categoryId || (categories[0]?.id || ''),
        tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : (blog.tags || ''),
        estimatedReadMinutes: blog.estimatedReadMinutes || 5,
        isPublished: blog.isPublished ?? true,
      });
    } else {
      setEditingBlog(null);
      setFormData({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        coverImageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop',
        authorName: 'LilacTechSys Editorial',
        authorRole: 'Senior Solutions Architect',
        categoryId: categories[0]?.id || '',
        tags: 'Cloud, AI, DevOps',
        estimatedReadMinutes: 5,
        isPublished: true,
      });
    }
    setModalOpen(true);
  };

  const handleTitleChange = (e) => {
    const val = e.target.value;
    const generatedSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    setFormData(prev => ({
      ...prev,
      title: val,
      slug: editingBlog ? prev.slug : generatedSlug
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrorMessage('');

    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        estimatedReadMinutes: parseInt(formData.estimatedReadMinutes, 10) || 5,
        categoryId: formData.categoryId || (categories[0]?.id || null)
      };

      if (editingBlog) {
        await blogApi.update(editingBlog.id, payload);
      } else {
        await blogApi.create(payload);
      }
      setModalOpen(false);
      fetchData();
    } catch (err) {
      setErrorMessage(err.message || 'Failed to save blog post');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this blog post?')) {
      try {
        await blogApi.delete(id);
        fetchData();
      } catch (err) {
        alert(err.message || 'Failed to delete post');
      }
    }
  };

  return (
    <>
      <SeoHelmet title="Admin – Blog Articles & Insights" />

      <div className="space-y-6">
        {/* Header bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-['Outfit'] text-slate-900 dark:text-white">
              Blog & Thought Leadership
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Draft, edit, publish, and manage company articles, whitepapers, and engineering updates.
            </p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-lilac-600 hover:bg-lilac-700 text-white font-medium text-xs shadow-lg shadow-lilac-600/20 transition-all self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Write New Article</span>
          </button>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <Search className="w-4 h-4 text-slate-400 ml-2" />
          <input
            type="text"
            placeholder="Search articles by title, author, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none text-xs w-full focus:outline-none text-slate-900 dark:text-white"
          />
        </div>

        {/* Blog Table */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-medium border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3 px-4">Article</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Author</th>
                  <th className="py-3 px-4">Read Time</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-10 text-slate-400">
                      Loading articles...
                    </td>
                  </tr>
                ) : blogs.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-10 text-slate-400">
                      No blog articles found. Click "Write New Article" to publish your first post.
                    </td>
                  </tr>
                ) : (
                  blogs.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          {b.coverImageUrl ? (
                            <img
                              src={b.coverImageUrl}
                              alt={b.title}
                              className="w-12 h-10 object-cover rounded-lg border border-slate-200 dark:border-slate-800 flex-shrink-0"
                            />
                          ) : (
                            <div className="w-12 h-10 rounded-lg bg-lilac-100 dark:bg-lilac-950/40 flex items-center justify-center text-lilac-600 flex-shrink-0">
                              <BookOpen className="w-5 h-5" />
                            </div>
                          )}
                          <div className="min-w-0 max-w-xs sm:max-w-md">
                            <p className="font-semibold text-slate-900 dark:text-white truncate">
                              {b.title}
                            </p>
                            <p className="text-[11px] text-slate-400 truncate">
                              /{b.slug}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-lilac-50 dark:bg-lilac-950/40 text-lilac-700 dark:text-lilac-300 border border-lilac-200 dark:border-lilac-800">
                          {b.category?.name || 'Technology'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-700 dark:text-slate-300">
                        {b.authorName}
                      </td>
                      <td className="py-3 px-4 text-slate-500">
                        {b.estimatedReadMinutes} min read
                      </td>
                      <td className="py-3 px-4">
                        {b.isPublished ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                            <EyeOff className="w-3.5 h-3.5" /> Draft
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenModal(b)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-lilac-600 hover:bg-lilac-50 dark:hover:bg-lilac-950/40 transition-colors"
                            title="Edit Article"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(b.id)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                            title="Delete Article"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Article Editor Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-3xl my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-lilac-600" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {editingBlog ? 'Edit Blog Article' : 'Write New Article'}
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {errorMessage && (
                <div className="p-3 text-xs rounded-xl bg-rose-50 dark:bg-rose-950/30 text-rose-600 border border-rose-200 dark:border-rose-800">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={handleTitleChange}
                    placeholder="e.g., Architecting Cloud-Native Microservices with Resilience"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-lilac-500/20 focus:border-lilac-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Slug (URL friendly) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-lilac-500/20 focus:border-lilac-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-lilac-500/20 focus:border-lilac-500"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Author Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.authorName}
                    onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-lilac-500/20 focus:border-lilac-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Author Role
                  </label>
                  <input
                    type="text"
                    value={formData.authorRole}
                    onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-lilac-500/20 focus:border-lilac-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Cover Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.coverImageUrl}
                    onChange={(e) => setFormData({ ...formData, coverImageUrl: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-lilac-500/20 focus:border-lilac-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Brief Excerpt *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Short 2-line summary displayed on cards..."
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-lilac-500/20 focus:border-lilac-500 resize-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Article Full Content (Markdown / HTML supported) *
                  </label>
                  <textarea
                    rows={8}
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Detailed body text, insights, code snippets, and takeaways..."
                    className="w-full text-xs font-mono px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-lilac-500/20 focus:border-lilac-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="Cloud, Microservices, Kubernetes"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-lilac-500/20 focus:border-lilac-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Read Time (Minutes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={formData.estimatedReadMinutes}
                    onChange={(e) => setFormData({ ...formData, estimatedReadMinutes: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-lilac-500/20 focus:border-lilac-500"
                  />
                </div>

                <div className="md:col-span-2 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={formData.isPublished}
                      onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                      className="rounded border-slate-300 text-lilac-600 focus:ring-lilac-500 w-4 h-4 cursor-pointer"
                    />
                    <span>Publish article immediately (visible on public site)</span>
                  </label>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-lilac-600 hover:bg-lilac-700 text-white font-medium text-xs shadow-lg shadow-lilac-600/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingBlog ? 'Update Article' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminBlogs;
